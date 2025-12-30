/**
 * 对象工具函数集合
 *
 * 提供深拷贝、安全取值、属性筛选、空值判断等常用对象操作方法。
 * 所有方法均注重类型安全与边界情况处理。
 *
 * @example
 * ```ts
 * import { xzObject } from 'xz-ui-lib';
 *
 * const copy = xzObject.deepClone(originalObj);
 * const name = xzObject.get(apiData, 'user.profile.name', '匿名');
 * const safeUser = xzObject.omit(user, ['password']);
 * ```
 */
export const xzObject = {
  /**
   * 判断是否为普通对象（即字面量对象 `{}` 或 `new Object()`）
   * - 排除 `null`、数组、Date、RegExp、函数等
   * @param value - 待检测的值
   * @returns 如果是普通对象则返回 `true`，否则 `false`
   *
   * @example
   * ```ts
   * xzObject.isObject({})           // true
   * xzObject.isObject([])           // false
   * xzObject.isObject(null)         // false
   * xzObject.isObject(new Date())   // false
   * ```
   */
  isObject(value: any): value is Record<string, any> {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
  },

  /**
   * 判断一个值是否“为空”
   * - `null` / `undefined` → 空
   * - 字符串（trim 后为空）→ 空
   * - 数组（length 为 0）→ 空
   * - 普通对象（无自有可枚举属性）→ 空
   * @param value - 待检测的值
   * @returns 如果为空则返回 `true`，否则 `false`
   *
   * @example
   * ```ts
   * xzObject.isEmpty('')            // true
   * xzObject.isEmpty('  ')          // true
   * xzObject.isEmpty([])            // true
   * xzObject.isEmpty({})            // true
   * xzObject.isEmpty({ a: 1 })      // false
   * xzObject.isEmpty(0)             // false（数字 0 不视为空）
   * ```
   */
  isEmpty(value: any): boolean {
    if (value == null) return true
    if (Array.isArray(value)) return value.length === 0
    if (typeof value === 'string') return value.trim() === ''
    if (this.isObject(value)) return Object.keys(value).length === 0
    return false
  },

  /**
   * 对对象进行深拷贝（deep clone）
   * 支持：
   * - 普通对象、数组
   * - `Date`（创建新实例）
   * - `RegExp`（保留 source 和 flags）
   *
   * ⚠️ 不支持：
   * - 函数（会丢失）
   * - Symbol 键（会被忽略）
   * - Map / Set / WeakMap / WeakSet
   * - 循环引用（会导致栈溢出）
   * @param obj - 要拷贝的对象
   * @returns 深拷贝后的新对象
   *
   * @example
   * ```ts
   * const original = { a: 1, b: { c: [2, new Date()] } }
   * const copy = xzObject.deepClone(original)
   * copy.b.c[0] = 999
   * console.log(original.b.c[0]) // 2（未被修改）
   * ```
   */
  deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    if (obj instanceof Date) {
      return new Date(obj.getTime()) as any
    }
    if (obj instanceof RegExp) {
      return new RegExp(obj.source, obj.flags) as any
    }
    if (Array.isArray(obj)) {
      return obj.map(item => this.deepClone(item)) as any
    }
    const cloned = {} as T
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = this.deepClone(obj[key])
      }
    }
    return cloned
  },

  /**
   * 从对象中剔除指定的属性，返回新对象
   * 类型安全：使用 TypeScript 的 `Omit` 类型
   * @param obj - 源对象
   * @param keys - 要剔除的键数组
   * @returns 剔除指定属性后的新对象
   *
   * @example
   * ```ts
   * const user = { id: 1, name: 'Alice', password: 'secret' }
   * const safe = xzObject.omit(user, ['password'])
   * // safe => { id: 1, name: 'Alice' }
   * ```
   */
  omit<T extends Record<string, any>, K extends keyof T>(
    obj: T,
    keys: K[]
  ): Omit<T, K> {
    const result = { ...obj }
    for (const key of keys) {
      delete result[key]
    }
    return result as Omit<T, K>
  },

  /**
   * 从对象中提取指定的属性，返回新对象
   * 类型安全：使用 TypeScript 的 `Pick` 类型
   * @param obj - 源对象
   * @param keys - 要提取的键数组
   * @returns 仅包含指定属性的新对象
   *
   * @example
   * ```ts
   * const user = { id: 1, name: 'Bob', email: 'bob@example.com', role: 'admin' }
   * const summary = xzObject.pick(user, ['name', 'email'])
   * // summary => { name: 'Bob', email: 'bob@example.com' }
   * ```
   */
  pick<T extends Record<string, any>, K extends keyof T>(
    obj: T,
    keys: K[]
  ): Pick<T, K> {
    const result = {} as Pick<T, K>
    for (const key of keys) {
      if (key in obj) {
        result[key] = obj[key]
      }
    }
    return result
  },

  /**
   * 深度合并多个对象到目标对象（**会修改第一个参数 target**）
   * 类似 Lodash 的 `merge`，但为简化实现
   *
   * ⚠️ 注意：
   * - 只处理普通对象和数组
   * - 不处理函数、Symbol、Map 等复杂类型
   * - 数组合并策略：**不合并，直接覆盖**
   * @param target - 目标对象（会被修改）
   * @param sources - 源对象列表（从左到右合并）
   * @returns 合并后的 target 对象
   *
   * @example
   * ```ts
   * const base = { a: 1, b: { c: 2 } }
   * const config = { b: { d: 3 }, e: 4 }
   * xzObject.merge(base, config)
   * // base => { a: 1, b: { c: 2, d: 3 }, e: 4 }
   * ```
   */
  merge(target: any, ...sources: any[]): any {
    if (!sources.length) return target
    const source = sources.shift()
    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) target[key] = {}
          this.merge(target[key], source[key])
        } else {
          target[key] = source[key]
        }
      }
    }
    return this.merge(target, ...sources)
  },

  /**
   * 安全地获取对象的嵌套属性值，避免访问 undefined 报错
   * 支持路径字符串如 `'a.b.c'` 或 `'a[0].name'`
   * @param obj - 源对象
   * @param path - 属性路径（支持点号或方括号语法）
   * @param defaultValue - 默认值（当路径不存在时返回）
   * @returns 路径对应的值，或默认值
   *
   * @example
   * ```ts
   * const data = { user: { profile: { age: 25 } } }
   * xzObject.get(data, 'user.profile.age')        // 25
   * xzObject.get(data, 'user.profile.name', 'N/A') // 'N/A'
   * xzObject.get(data, 'user.list[0].id', 0)       // 0
   * ```
   */
  get(obj: any, path: string, defaultValue?: any): any {
    if (obj == null) return defaultValue
    const keys = path
      .replace(/\[(\w+)\]/g, '.$1') // 将 [key] 转为 .key
      .replace(/^\./, '')           // 去掉开头可能的 .
      .split('.')
    let current = obj
    for (const key of keys) {
      if (current == null) return defaultValue
      current = current[key]
    }
    return current !== undefined ? current : defaultValue
  },

  /**
   * 判断对象是否存在指定的嵌套路径
   * @param obj - 源对象
   * @param path - 属性路径（如 `'a.b.c'`）
   * @returns 如果路径存在且值不为 null/undefined 则返回 `true`
   *
   * @example
   * ```ts
   * const obj = { a: { b: { c: 1 } } }
   * xzObject.has(obj, 'a.b.c')  // true
   * xzObject.has(obj, 'a.x')    // false
   * ```
   */
  has(obj: any, path: string): boolean {
    if (obj == null) return false
    const keys = path
      .replace(/\[(\w+)\]/g, '.$1')
      .replace(/^\./, '')
      .split('.')
    let current = obj
    for (const key of keys) {
      if (current == null || !(key in current)) return false
      current = current[key]
    }
    return true
  },
}