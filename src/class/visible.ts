import { xzObject } from '@/utils'

/**
 * 弹窗/抽屉控制类，用于管理可见性、操作类型与绑定实体数据
 *
 * 支持泛型，确保 entity 类型安全。
 *
 * @example
 * ```ts
 * interface User { id: number; name: string }
 * const drawer = new VisibleEntity<User>()
 *
 * drawer.openAdd({ id: 0, name: 'New' })
 * if (drawer.visible && drawer.type === 'edit') {
 *   console.log(drawer.entity.name)
 * }
 * ```
 */
export class VisibleEntity<T = unknown> {
    /**
     * 当前是否可见
     */
    public visible: boolean = false

    /**
     * 操作类型，例如 'add' | 'edit' | 'detail'
     */
    public type: string = 'add'

    /**
     * 绑定的实体数据（深拷贝后存储）
     */
    public entity: T | null = null

    /**
     * 构造函数
     * @param options - 初始化选项（可选）
     */
    constructor(options?: {
        visible?: boolean
        type?: string
        entity?: T
    }) {
        if (options) {
            this.visible = options.visible ?? false
            this.type = options.type ?? 'add'
            this.entity = options.entity ? xzObject.deepClone(options.entity) : null
        }
    }

    /**
     * 打开“新增”模式
     * @param entity - 要绑定的实体（将被深拷贝）
     */
    public openAdd(entity: T): void {
        this.open(entity, 'add')
    }

    /**
     * 打开“编辑”模式
     * @param entity - 要绑定的实体（将被深拷贝）
     */
    public openEdit(entity: T): void {
        this.open(entity, 'edit')
    }

    /**
     * 打开“详情”模式
     * @param entity - 要绑定的实体（将被深拷贝）
     */
    public openDetail(entity: T): void {
        this.open(entity, 'detail')
    }

    /**
     * 通用打开方法
     * @param entity - 要绑定的实体（将被深拷贝）
     * @param type - 操作类型（默认为当前 type）
     */
    public open(entity: T, type?: string): void {
        this.type = type ?? this.type
        this.visible = true
        this.entity = xzObject.deepClone(entity)
    }

    /**
     * 关闭弹窗/抽屉
     */
    public close(): void {
        this.visible = false
        // 可选：清空 entity（根据业务需求）
        // this.entity = null
    }
}