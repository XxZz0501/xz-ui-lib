[**xz-ui-lib**](../../README.md)

***

# Class: Table\<D, Q\>

表格管理类，封装分页、加载、查询、重置等通用逻辑

## Example

```ts
interface User { id: number; name: string }
interface UserQuery extends QueryInter { name?: string; clearAll(): void }

const userTable = new Table&lt;User, UserQuery&gt;`(new UserQueryImpl())
await userTable.getList(fetchUsers)
```

## Type Parameters

### D

`D`

### Q

`Q` *extends* [`QueryInter`](../interfaces/QueryInter.md)

## Constructors

### Constructor

> **new Table**\<`D`, `Q`\>(`query?`, `data?`, `loading?`, `pagination?`): `Table`\<`D`, `Q`\>

构造函数

#### Parameters

##### query?

`Q`

查询条件对象（可选）

##### data?

`D`[] = `[]`

初始数据（默认空数组）

##### loading?

`boolean` = `false`

初始加载状态（默认 false）

##### pagination?

[`Pagination`](Pagination.md) = `...`

分页配置（默认新建 Pagination 实例）

#### Returns

`Table`\<`D`, `Q`\>

## Properties

### data

> **data**: `D`[] = `[]`

表格数据列表

***

### loading

> **loading**: `boolean` = `false`

是否正在加载

***

### pagination

> **pagination**: [`Pagination`](Pagination.md)

分页配置

***

### query

> **query**: `Q` \| `null` = `null`

查询条件对象

## Methods

### getList()

> **getList**(`method`, `searchObj`, `successCode`, `dataParam?`): `Promise`\<`number`\>

获取表格数据（调用 API 并更新状态）

#### Parameters

##### method

(`params`) => `Promise`\<[`ApiResponse`](../interfaces/ApiResponse.md)\<`any`\>\>

API 请求方法，接收查询参数并返回 Promise&lt;ApiResponse&gt;`

##### searchObj

`Record`\<`string`, `any`\> = `{}`

额外的查询参数（会与分页参数合并）

##### successCode

`number` = `200`

成功状态码（默认 200）

##### dataParam?

`string`

如果 data 是对象，指定从哪个字段取列表（如 'list'）

#### Returns

`Promise`\<`number`\>

Promise&lt;number&gt;` - 成功时返回 total，失败时抛出 Error

***

### minusTotal()

> **minusTotal**(`count`): `void`

删除操作后手动减少总记录数（用于乐观更新）

#### Parameters

##### count

`number`

删除的记录数量（通常为 1）

#### Returns

`void`

***

### reset()

> **reset**(`getList`): `void`

重置查询条件并重新加载（回到第一页）

#### Parameters

##### getList

() => `void`

获取数据的回调函数

#### Returns

`void`

***

### search()

> **search**(`getList`): `void`

执行搜索（重置到第一页后调用 getList）

#### Parameters

##### getList

() => `void`

获取数据的回调函数（通常为 () => table.getList(...)）

#### Returns

`void`
