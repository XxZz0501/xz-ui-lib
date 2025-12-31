[**xz-ui-lib**](../../README.md)

***

# Function: useCrudTable()

> **useCrudTable**\<`T`, `Q`\>(`options`): `object`

通用【表格 + 查询 + 增删改查】逻辑 Hook

封装了标准 CRUD 表格的完整交互逻辑，包括：
- 分页查询（支持自定义查询条件类）
- 新增/编辑/详情抽屉管理（通过 [VisibleEntity](/class/visible/README)）
- 删除确认弹窗 + 成功提示
- 启用/停用状态切换（带语义化确认文案）
- 字典映射（自动解构为响应式 refs）
- 批量导入抽屉入口
- 支持查询前钩子（queryHook）动态调整参数

## Type Parameters

### T

`T` *extends* `object`

表格数据项类型，必须包含 `id: string | number`

### Q

`Q` *extends* `QueryInter`

查询条件类型，必须实现 QueryInter

## Parameters

### options

[`UseCrudTableOptions`](../interfaces/UseCrudTableOptions.md)\<`T`, `Q`\>

配置选项对象

## Returns

返回包含以下属性的对象：
- `proxy`: 当前组件实例代理（谨慎使用，仅用于调用全局方法如 `useDict`）
- `{...dict}`: 所有字典字段（如传入 `dictKey: ['status']`，则返回 `statusDict`）
- `table`: [Table](/class/table/README) 表格核心实例（含 `query`, `data`, `total`, `loading` 等）
- `getList`: 手动触发重新查询的方法（常用于搜索、重置后刷新）
- `handleAdd`: 打开新增抽屉（传入空对象 `{}`）
- `handleEdit`: 打开编辑抽屉（传入当前行数据）
- `handleDetail`: 打开详情抽屉（传入当前行数据）
- `handleDelete`: 删除单条数据（带确认弹窗，成功后刷新列表）
- `handleSwitch`: 启用/停用切换（需配置 `switchConfig`，根据当前状态智能提示）
- `import_D`: 批量导入抽屉引用（可用于控制显隐）
- `handleImport`: 打开批量导入抽屉
- `[editorDrawerName]`: 动态 key 的编辑抽屉实例（默认为 `editor_D`）

### getList()

> **getList**: () => `Promise`\<`number`\>

重新加载表格数据

执行流程：
1. 调用 `queryHook` 允许动态修改查询条件
2. 合并 `extraParams` 到最终请求参数
3. 调用 `apiFn().list` 获取数据
4. 更新 `table.value.data` 和 `total`

#### Returns

`Promise`\<`number`\>

Promise&lt;void&gt;`

### handleAdd()

> **handleAdd**: () => `void`

打开新增抽屉

传入空对象 `{}` 作为初始数据，业务层需确保 T 可安全构造。

#### Returns

`void`

### handleDelete()

> **handleDelete**: (`row`) => `Promise`\<`void`\>

删除单条数据（带确认弹窗）

流程：
1. 弹出确认框：“删除该条数据，是否继续？”
2. 调用 `apiFn().del(row.id)`
3. 成功后刷新列表并提示“删除成功”

#### Parameters

##### row

`T`

当前行数据

#### Returns

`Promise`\<`void`\>

### handleDetail()

> **handleDetail**: (`row`) => `void`

打开详情抽屉

#### Parameters

##### row

`T`

当前行数据（类型 T）

#### Returns

`void`

### handleEdit()

> **handleEdit**: (`row`) => `void`

打开编辑抽屉

#### Parameters

##### row

`T`

当前行数据（类型 T）

#### Returns

`void`

### handleImport()

> **handleImport**: () => `void`

打开批量导入抽屉

#### Returns

`void`

### handleSwitch()

> **handleSwitch**: (`row`) => `Promise`\<`void`\>

切换启用/停用状态（需配置 switchConfig）

根据当前状态值判断操作意图（启用 or 停用），
弹出语义化确认框（如“确定要停用该条数据吗？”），
成功后刷新列表。

#### Parameters

##### row

`T`

当前行数据

#### Returns

`Promise`\<`void`\>

### import\_D

> **import\_D**: `Ref`\<\{ `entity`: `unknown`; `type`: `string`; `visible`: `boolean`; `close`: `void`; `open`: `void`; `openAdd`: `void`; `openDetail`: `void`; `openEdit`: `void`; \}, [`VisibleEntity`](/class/visible/README)\<`unknown`\> \| \{ `entity`: `unknown`; `type`: `string`; `visible`: `boolean`; `close`: `void`; `open`: `void`; `openAdd`: `void`; `openDetail`: `void`; `openEdit`: `void`; \}\>

### proxy

> **proxy**: `ComponentPublicInstance`\<\{ \}, \{ \}, \{ \}, \{ \}, \{ \}, \{ \}, \{ \}, \{ \}, `false`, `ComponentOptionsBase`\<`any`, `any`, `any`, `any`, `any`, `any`, `any`, `any`, `any`, \{ \}, \{ \}, `string`, \{ \}, \{ \}, \{ \}, `string`, `ComponentProvideOptions`\>, \{ \}, \{ \}, `""`, \{ \}, `any`\> \| `null`

### table

> **table**: `Ref`\<\{ `data`: `UnwrapRefSimple`\<`T`\>[]; `loading`: `boolean`; `pagination`: \{ `pageNum`: `number`; `pageSize`: `number`; `size`: `string`; `total`: `number`; `setTotal`: `void`; \}; `query`: `UnwrapRef`\<`Q`\> \| `null`; `getList`: `Promise`\<`number`\>; `minusTotal`: `void`; `reset`: `void`; `search`: `void`; \}, [`Table`](/class/table/README)\<`T`, `Q`\> \| \{ `data`: `UnwrapRefSimple`\<`T`\>[]; `loading`: `boolean`; `pagination`: \{ `pageNum`: `number`; `pageSize`: `number`; `size`: `string`; `total`: `number`; `setTotal`: `void`; \}; `query`: `UnwrapRef`\<`Q`\> \| `null`; `getList`: `Promise`\<`number`\>; `minusTotal`: `void`; `reset`: `void`; `search`: `void`; \}\>

## Example

```ts
interface User {
  id: number
  name: string
  status: 0 | 1
}

class UserQuery implements QueryInter {
  pageNum = 1
  pageSize = 20
  name = ''
  status?: number
}

const { table, handleEdit, handleSwitch, statusDict } = useCrudTable&lt;User, UserQuery&gt;`({
  apiFn: useUserApi,
  QueryClass: UserQuery,
  dictKey: ['user_status'],
  switchConfig: { field: 'status', activeValue: 1 }
})
```

## Throws

如果在非 `setup()` 上下文中调用，将抛出错误（因依赖 `getCurrentInstance`）

## Remarks

- 删除和启停操作依赖全局 `modal.confirm` 和 `modal.msgSuccess`，请确保已引入
- 字典字段会自动解构为 `xxxDict` 形式（如 `user_status` → `userStatusDict`），具体取决于 `useDict` 实现
- `extraParams` 优先级低于 `query`，但高于默认值，适用于租户 ID、固定分类等场景
