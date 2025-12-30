// useCrudTable.ts

import {
  ref,
  toRefs,
  getCurrentInstance,
  onMounted,
  provide,
  reactive,
  isReactive
} from 'vue'
import { Table, type QueryInter } from '@/class/table'
import { VisibleEntity } from '@/class/visible'
import { modal } from '@/utils'

/**
 * API 方法集合接口（由 apiFn 返回）
 */
interface ApiMethods<T> {
  /**
   * 获取列表数据
   * @param params - 查询参数
   * @returns 包含分页数据的 Promise
   */
  list: (params: any) => Promise<any>

  /**
   * 新增数据
   * @param data - 待新增的实体
   */
  add?: (data: T) => Promise<void>

  /**
   * 编辑数据
   * @param data - 待更新的实体（需包含 id）
   */
  edit?: (data: T) => Promise<void>

  /**
   * 删除数据
   * @param id - 实体 ID
   */
  del?: (id: string | number) => Promise<void>

  /**
   * 启用/停用切换（如状态切换）
   * @param id - 实体 ID
   */
  startStop?: (id: string | number) => Promise<void>
}

/**
 * 状态字段的合法值类型（支持数字或布尔值）
 */
type StatusValueType = number | boolean

/**
 * useCrudTable 配置选项
 */
interface UseCrudTableOptions<T, Q extends QueryInter> {
  /**
   * 返回 API 方法的对象：{ list, add, edit, del, startStop }
   *
   * 必须提供 `list`，其余方法可选。
   */
  apiFn: () => ApiMethods<T>

  /**
   * 查询参数类构造器（必须实现 {@link QueryInter} 接口）
   *
   * 用于初始化表格查询条件。
   */
  QueryClass: new () => Q

  /**
   * 字典 key 列表（用于调用 `proxy.useDict(...)`）
   *
   * 例如：['user_status', 'role_type']
   */
  dictKey?: string[]

  /**
   * 抽屉组件通过 `provide/inject` 使用的 key 名
   *
   * 默认为 `'editor_D'`，用于在子组件中注入编辑抽屉实例。
   */
  editorDrawerName?: string

  /**
   * 额外的固定查询参数
   *
   * 在每次调用 `list` 时自动与 query 合并。
   */
  extraParams?: Record<string, any>

  /**
   * 查询前钩子函数
   *
   * 可在此修改 `query` 对象（如动态设置时间范围）。
   *
   * @param query - 当前查询条件实例
   */
  queryHook?: (query: Q) => void

  /**
   * 是否在组件挂载后自动执行首次查询
   *
   * 默认为 `true`。
   */
  isInitQuery?: boolean

  /**
   * 启停（启用/停用）功能配置（可选）
   *
   * 若未提供，则不会生成 `handleSwitch` 方法。
   */
  switchConfig?: {
    /**
     * 状态字段名（必须存在于 T 中）
     *
     * 例如：`'status'`、`'enable'`、`'isActive'`
     */
    field: keyof T

    /**
     * 表示“启用”状态的值
     *
     * 默认为 `1`
     */
    activeValue?: StatusValueType

    /**
     * 表示“停用”状态的值
     *
     * 默认为 `0`
     */
    inactiveValue?: StatusValueType
  }
}

/**
 * 通用【表格 + 查询 + 增删改查】逻辑 Hook
 *
 * 封装了标准 CRUD 表格的完整交互逻辑，包括：
 * - 分页查询
 * - 新增/编辑/详情抽屉
 * - 删除确认
 * - 启用/停用切换
 * - 字典映射
 * - 批量导入入口
 *
 * @template T - 表格数据项类型，必须包含 `id: string | number`
 * @template Q - 查询条件类型，必须实现 {@link QueryInter}
 *
 * @param options - 配置选项对象
 *
 * @returns 返回包含以下属性的对象：
 * - `table`: 表格核心实例（含 query/data/total 等）
 * - `getList`: 手动触发重新查询的方法
 * - `handleAdd` / `handleEdit` / `handleDetail`: 打开对应抽屉
 * - `handleDelete`: 删除确认 + 调用 API
 * - `handleSwitch`: 启用/停用切换（若配置了 switchConfig）
 * - `import_D`: 批量导入抽屉引用
 * - `handleImport`: 打开导入抽屉
 * - 所有字典字段（通过 `dictKey` 指定）
 * - `proxy`: 当前组件实例代理（谨慎使用）
 *
 * @example
 * ```ts
 * interface User {
 *   id: number
 *   name: string
 *   status: 0 | 1
 * }
 *
 * const { table, handleEdit, handleSwitch } = useCrudTable<User, UserQuery>({
 *   apiFn: useUserApi,
 *   QueryClass: UserQuery,
 *   dictKey: ['user_status'],
 *   switchConfig: { field: 'status', activeValue: 1 }
 * })
 * ```
 *
 * @throws 如果在非 setup() 上下文中调用，将抛出错误
 */
export function useCrudTable<T extends { id: string | number }, Q extends QueryInter>(
  options: UseCrudTableOptions<T, Q>
) {
  const {
    apiFn,
    QueryClass,
    dictKey = [],
    editorDrawerName = 'editor_D',
    extraParams = {},
    queryHook = () => {},
    isInitQuery = true,
    switchConfig
  } = options

  // 获取当前 Vue 组件实例
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('useCrudTable must be called inside setup()')
  }
  const proxy = instance.proxy

  // === 1. 字典处理 ===
  // 调用全局注册的 useDict 方法获取字典响应式对象
  const dictRaw = dictKey.length ? (proxy as any).useDict(...dictKey) : {}
  // 确保字典是响应式的，并解构为 refs 供模板直接使用
  const dict = toRefs(isReactive(dictRaw) ? dictRaw : reactive(dictRaw))

  // === 2. 表格实例 ===
  // 初始化表格核心逻辑（含 query 和分页数据）
  const table = ref(new Table<T, Q>(new QueryClass()))

  // === 3. 编辑抽屉实例 ===
  // 用于控制新增/编辑/详情抽屉的显隐和传递数据
  const editor = ref(new VisibleEntity<T>())
  provide(editorDrawerName, editor)

  // === 4. 批量导入抽屉 ===
  const import_D = ref(new VisibleEntity())
  provide('import_D', import_D)

  // === 5. 核心方法 ===

  /**
   * 重新加载表格数据
   *
   * - 触发 queryHook 修改查询条件
   * - 调用 API 并更新 table.value.data / total
   */
  const getList = async () => {
    if (typeof queryHook === 'function') {
      // 类型断言确保兼容 UnwrapRef<Q>
      queryHook(table.value.query! as Q)
    }
    return await table.value.getList(apiFn().list, extraParams)
  }

  /**
   * 打开新增抽屉
   */
  const handleAdd = () => {
    // 注意：此处传入空对象，业务层需确保 T 可安全构造
    editor.value.openAdd({} as T)
  }

  /**
   * 打开编辑抽屉
   * @param row - 当前行数据
   */
  const handleEdit = (row: T) => {
    editor.value.openEdit(row)
  }

  /**
   * 打开详情抽屉
   * @param row - 当前行数据
   */
  const handleDetail = (row: T) => {
    editor.value.openDetail(row)
  }

  /**
   * 删除单条数据（带确认）
   * @param row - 当前行数据
   */
  const handleDelete = async (row: T) => {
    await modal.confirm('删除该条数据，是否继续？')
    await apiFn().del?.(row.id)
    await getList()
    modal.msgSuccess('删除成功')
  }

  /**
   * 打开批量导入抽屉
   */
  const handleImport = () => {
    import_D.value.open({})
  }

  /**
   * 切换启用/停用状态（需配置 switchConfig）
   *
   * 根据当前状态值判断操作意图（启用 or 停用），
   * 弹出确认框后调用 startStop API。
   *
   * @param row - 当前行数据
   */
  const handleSwitch = async (row: T) => {
    if (!switchConfig) return

    const { field, activeValue = 1 } = switchConfig

    // 获取当前状态值
    const currentValue = row[field]
    const isCurrentlyActive = currentValue === activeValue
    const text = isCurrentlyActive ? '停用' : '启用'

    try {
      await modal.confirm(`确定要${text}该条数据吗？`)
      await apiFn().startStop?.(row.id)
      await getList()
      modal.msgSuccess('操作成功')
    } catch {
      // 用户取消或请求失败，静默处理
    }
  }

  // === 6. 自动初始化查询 ===
  onMounted(() => {
    if (isInitQuery) {
      getList()
    }
  })

  // === 7. 返回给模板和业务逻辑使用 ===
  return {
    proxy,
    ...dict, // 将字典字段展开，便于模板直接使用（如 statusDict）
    table,
    getList,
    [editorDrawerName]: editor, // 动态 key，保持与 provide 一致
    handleAdd,
    handleEdit,
    handleDetail,
    handleDelete,
    handleSwitch,
    import_D,
    handleImport
  }
}