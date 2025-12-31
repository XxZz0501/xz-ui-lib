[**xz-ui-lib**](../../README.md)

***

# xzObject

> `const` **xzObject**: `object`

对象工具函数集合

提供深拷贝、安全取值、属性筛选、空值判断等常用对象操作方法。
所有方法均注重类型安全与边界情况处理。

## Type Declaration

---

## deepClone

```ts
deepClone(...)
```

对对象进行深拷贝（deep clone）
支持：
- 普通对象、数组
- `Date`（创建新实例）
- `RegExp`（保留 source 和 flags）
⚠️ 不支持：
- 函数（会丢失）
- Symbol 键（会被忽略）
- Map / Set / WeakMap / WeakSet
- 循环引用（会导致栈溢出）
`T`


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `obj` | `T` | 要拷贝的对象 |


#### 返回值

`T`

### 示例

```ts
const original = { a: 1, b: { c: [2, new Date()] } }
const copy = xzObject.deepClone(original)
copy.b.c[0] = 999
console.log(original.b.c[0]) // 2（未被修改）
```

---

## get

```ts
get(...)
```

安全地获取对象的嵌套属性值，避免访问 undefined 报错
支持路径字符串如 `'a.b.c'` 或 `'a[0].name'`


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `obj` | `any` | 源对象 |
| `path` | `string` | 属性路径（支持点号或方括号语法） |
| `defaultValue?` | `any` | 默认值（当路径不存在时返回） |


#### 返回值

`any`

### 示例

```ts
const data = { user: { profile: { age: 25 } } }
xzObject.get(data, 'user.profile.age')        // 25
xzObject.get(data, 'user.profile.name', 'N/A') // 'N/A'
xzObject.get(data, 'user.list[0].id', 0)       // 0
```

---

## has

```ts
has(...)
```

判断对象是否存在指定的嵌套路径


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `obj` | `any` | 源对象 |
| `path` | `string` | 属性路径（如 `'a.b.c'`） |


#### 返回值

`boolean`

### 示例

```ts
const obj = { a: { b: { c: 1 } } }
xzObject.has(obj, 'a.b.c')  // true
xzObject.has(obj, 'a.x')    // false
```

---

## isEmpty

```ts
isEmpty(...)
```

判断一个值是否“为空”
- `null` / `undefined` → 空
- 字符串（trim 后为空）→ 空
- 数组（length 为 0）→ 空
- 普通对象（无自有可枚举属性）→ 空


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `value` | `any` | 待检测的值 |


#### 返回值

`boolean`

### 示例

```ts
xzObject.isEmpty('')            // true
xzObject.isEmpty('  ')          // true
xzObject.isEmpty([])            // true
xzObject.isEmpty({})            // true
xzObject.isEmpty({ a: 1 })      // false
xzObject.isEmpty(0)             // false（数字 0 不视为空）
```

---

## isObject

```ts
isObject(...)
```

判断是否为普通对象（即字面量对象 `{}` 或 `new Object()`）
- 排除 `null`、数组、Date、RegExp、函数等


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `value` | `any` | 待检测的值 |


#### 返回值

`value is Record<string, any>`

### 示例

```ts
xzObject.isObject({})           // true
xzObject.isObject([])           // false
xzObject.isObject(null)         // false
xzObject.isObject(new Date())   // false
```

---

## merge

```ts
merge(...)
```

深度合并多个对象到目标对象（**会修改第一个参数 target**）
类似 Lodash 的 `merge`，但为简化实现
⚠️ 注意：
- 只处理普通对象和数组
- 不处理函数、Symbol、Map 等复杂类型
- 数组合并策略：**不合并，直接覆盖**


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `target` | `any` | 目标对象（会被修改） |
| `sources` | `unknown` | ...`any`[] 源对象列表（从左到右合并） |


#### 返回值

`any`

### 示例

```ts
const base = { a: 1, b: { c: 2 } }
const config = { b: { d: 3 }, e: 4 }
xzObject.merge(base, config)
// base => { a: 1, b: { c: 2, d: 3 }, e: 4 }
```

---

## omit

```ts
omit(...)
```

从对象中剔除指定的属性，返回新对象
类型安全：使用 TypeScript 的 `Omit` 类型
`T` *extends* `Record`\<`string`, `any`\>
`K` *extends* `string` \| `number` \| `symbol`


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `obj` | `T` | 源对象 |
| `keys` | `unknown` | `K`[] 要剔除的键数组 |



### 示例

```ts
const user = { id: 1, name: 'Alice', password: 'secret' }
const safe = xzObject.omit(user, ['password'])
// safe => { id: 1, name: 'Alice' }
```

---

## pick

```ts
pick(...)
```

从对象中提取指定的属性，返回新对象
类型安全：使用 TypeScript 的 `Pick` 类型
`T` *extends* `Record`\<`string`, `any`\>
`K` *extends* `string` \| `number` \| `symbol`


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `obj` | `T` | 源对象 |
| `keys` | `unknown` | `K`[] 要提取的键数组 |



### 示例

```ts
const user = { id: 1, name: 'Bob', email: 'bob@example.com', role: 'admin' }
const summary = xzObject.pick(user, ['name', 'email'])
// summary => { name: 'Bob', email: 'bob@example.com' }
```

## Example

```ts
import { xzObject } from 'xz-ui-lib';

const copy = xzObject.deepClone(originalObj);
const name = xzObject.get(apiData, 'user.profile.name', '匿名');
const safeUser = xzObject.omit(user, ['password']);
```