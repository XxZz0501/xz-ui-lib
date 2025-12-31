[**xz-ui-lib**](../../README.md)

***

# Interface: ApiMethods\<T\>

API 方法集合接口（由 apiFn 返回）

## Type Parameters

### T

`T`

## Properties

### add()?

> `optional` **add**: (`data`) => `Promise`\<`void`\>

新增数据（可选）

#### Parameters

##### data

`T`

待新增的实体对象

#### Returns

`Promise`\<`void`\>

***

### del()?

> `optional` **del**: (`id`) => `Promise`\<`void`\>

删除数据（可选）

#### Parameters

##### id

实体唯一标识（string 或 number）

`string` | `number`

#### Returns

`Promise`\<`void`\>

***

### edit()?

> `optional` **edit**: (`data`) => `Promise`\<`void`\>

编辑数据（可选）

#### Parameters

##### data

`T`

待更新的实体对象（必须包含唯一标识 `id`）

#### Returns

`Promise`\<`void`\>

***

### list()

> **list**: (`params`) => `Promise`\<`any`\>

获取列表数据

#### Parameters

##### params

`any`

查询参数（包含分页、排序、过滤等）

#### Returns

`Promise`\<`any`\>

Promise&lt;{ list: T[], total: number }&gt;`

***

### startStop()?

> `optional` **startStop**: (`id`) => `Promise`\<`void`\>

启用/停用切换（可选，用于状态开关）

#### Parameters

##### id

实体唯一标识

`string` | `number`

#### Returns

`Promise`\<`void`\>
