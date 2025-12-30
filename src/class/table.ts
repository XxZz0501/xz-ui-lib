// table.ts

/**
 * 分页配置类
 */
export class Pagination {
    /**
     * 当前页码（从 1 开始）
     */
    public pageNum: number

    /**
     * 每页大小
     */
    public pageSize: number

    /**
     * 总记录数
     */
    public total: number

    /**
     * 分页组件尺寸（如 'small' | 'default' | 'large'，用于 UI）
     */
    public size: string

    constructor(pageNum = 1, pageSize = 10, total = 0, size = '') {
        this.pageNum = pageNum
        this.pageSize = pageSize
        this.total = total
        this.size = size
    }

    /**
     * 设置总记录数，并智能调整当前页码（防止删除最后一页最后一项后出现空白页）
     * @param total - 新的总记录数
     */
    public setTotal(total: number): void {
        // 仅当满足以下所有条件时，才将 pageNum 减 1：
        // 1. 刚好删除了 1 条数据
        // 2. 当前不在第一页
        // 3. 新的 total 能被 pageSize 整除（说明刚删的是最后一页的最后一项）
        // 4. 当前页是“多余”的那一页（例如：总数据 40 条，pageSize=10，共 4 页，但当前在第 5 页）
        if (
            this.total - total === 1 &&
            this.pageNum !== 1 &&
            total % this.pageSize === 0 &&
            this.pageNum - 1 === total / this.pageSize
        ) {
            this.pageNum -= 1
        }
        this.total = total
    }
}

/**
 * 查询条件接口（要求实现 clearAll 方法）
 */
export interface QueryInter {
    /**
     * 清空所有查询条件
     */
    clearAll(): void
}

/**
 * API 接口响应标准结构（可根据实际项目调整）
 */
export interface ApiResponse<T = any> {
    code: number
    msg?: string
    data?: T
    rows?: T[]
    total?: number
}

/**
 * 表格管理类，封装分页、加载、查询、重置等通用逻辑
 *
 * @example
 * ```ts
 * interface User { id: number; name: string }
 * interface UserQuery extends QueryInter { name?: string; clearAll(): void }
 *
 * const userTable = new Table<User, UserQuery>(new UserQueryImpl())
 * await userTable.getList(fetchUsers)
 * ```
 */
export class Table<D, Q extends QueryInter> {
    /**
     * 查询条件对象
     */
    public query: Q | null = null

    /**
     * 表格数据列表
     */
    public data: D[] = []

    /**
     * 是否正在加载
     */
    public loading = false

    /**
     * 分页配置
     */
    public pagination: Pagination

    /**
     * 构造函数
     * @param query - 查询条件对象（可选）
     * @param data - 初始数据（默认空数组）
     * @param loading - 初始加载状态（默认 false）
     * @param pagination - 分页配置（默认新建 Pagination 实例）
     */
    constructor(
        query?: Q,
        data: D[] = [],
        loading = false,
        pagination: Pagination = new Pagination()
    ) {
        this.query = query ?? null
        this.data = data
        this.loading = loading
        this.pagination = pagination
    }

    /**
     * 获取表格数据（调用 API 并更新状态）
     *
     * @param method - API 请求方法，接收查询参数并返回 Promise<ApiResponse>
     * @param searchObj - 额外的查询参数（会与分页参数合并）
     * @param successCode - 成功状态码（默认 200）
     * @param dataParam - 如果 data 是对象，指定从哪个字段取列表（如 'list'）
     * @returns Promise<number> - 成功时返回 total，失败时抛出 Error
     */
    async getList(
        method: (params: Record<string, any>) => Promise<ApiResponse>,
        searchObj: Record<string, any> = {},
        successCode = 200,
        dataParam?: string
    ): Promise<number> {
        this.loading = true

        // 合并分页参数（如果启用了分页）
        const params = this.pagination
            ? {
                ...searchObj,
                pageSize: this.pagination.pageSize,
                pageNum: this.pagination.pageNum
            }
            : searchObj

        try {
            const result = await method(params)
            this.loading = false

            const { code, msg, data, rows, total } = result

            if (code === successCode) {
                // 优先使用 rows，其次尝试从 data[dataParam] 取，最后 fallback 到 []
                this.data = rows ?? (dataParam && data ? data[dataParam] : data) ?? []

                if (this.pagination && typeof total === 'number') {
                    this.pagination.setTotal(total)
                }

                return total ?? this.data.length
            } else {
                // 请求失败：清空数据
                this.data = []
                if (this.pagination) this.pagination.setTotal(0)

                // 抛出错误（由调用方处理 UI 提示，如 ElMessage）
                throw new Error(msg ?? '表格数据请求失败')
            }
        } catch (error) {
            this.loading = false
            // 确保 loading 在异常时也能关闭
            throw error
        }
    }

    /**
     * 执行搜索（重置到第一页后调用 getList）
     * @param getList - 获取数据的回调函数（通常为 () => table.getList(...)）
     */
    public search(getList: () => void): void {
        if (this.pagination) {
            this.pagination.pageNum = 1
        }
        getList()
    }

    /**
     * 重置查询条件并重新加载（回到第一页）
     * @param getList - 获取数据的回调函数
     */
    public reset(getList: () => void): void {
        if (this.pagination) {
            this.pagination.pageNum = 1
        }
        if (this.query) {
            this.query.clearAll()
        }
        getList()
    }

    /**
     * 删除操作后手动减少总记录数（用于乐观更新）
     * @param count - 删除的记录数量（通常为 1）
     */
    public minusTotal(count: number): void {
        if (this.pagination) {
            this.pagination.setTotal(Math.max(0, this.pagination.total - count))
        }
    }
}