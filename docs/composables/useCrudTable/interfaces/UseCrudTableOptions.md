[**xz-ui-lib**](../../README.md)

***

# Interface: UseCrudTableOptions\<T, Q\>

useCrudTable 配置选项

## Type Parameters

### T

`T`

### Q

`Q` *extends* `QueryInter`

## Properties

### apiFn()

> **apiFn**: () => [`ApiMethods`](ApiMethods.md)\<`T`\>

返回 API 方法的对象：`{ list, add, edit, del, startStop }`

必须提供 `list`，其余方法可选。

#### Returns

[`ApiMethods`](ApiMethods.md)\<`T`\>

***

### dictKey?

> `optional` **dictKey**: `string`[]

字典 key 列表（用于调用 `proxy.useDict(...)`）

例如：['user_status', 'role_type']

***

### editorDrawerName?

> `optional` **editorDrawerName**: `string`

抽屉组件通过 `provide/inject` 使用的 key 名

默认为 `'editor_D'`，用于在子组件中注入编辑抽屉实例。

***

### extraParams?

> `optional` **extraParams**: `Record`\<`string`, `any`\>

额外的固定查询参数

在每次调用 `list` 时自动与 query 合并。

***

### isInitQuery?

> `optional` **isInitQuery**: `boolean`

是否在组件挂载后自动执行首次查询

默认为 `true`。

***

### QueryClass()

> **QueryClass**: () => `Q`

查询参数类构造器（必须实现 QueryInter 接口）

用于初始化表格查询条件。

#### Returns

`Q`

***

### queryHook()?

> `optional` **queryHook**: (`query`) => `void`

查询前钩子函数

可在此动态修改 `query` 对象（如设置默认时间范围、权限过滤等）。

#### Parameters

##### query

`Q`

当前查询条件实例（类型为 Q）

#### Returns

`void`

***

### switchConfig?

> `optional` **switchConfig**: `object`

启停（启用/停用）功能配置（可选）

若未提供，则不会生成 `handleSwitch` 方法。

#### activeValue?

> `optional` **activeValue**: [`StatusValueType`](../type-aliases/StatusValueType.md)

表示“启用”状态的值

默认为 `1`

#### field

> **field**: keyof `T`

状态字段名（必须存在于 T 中）

例如：`'status'`、`'enable'`、`'isActive'`

#### inactiveValue?

> `optional` **inactiveValue**: [`StatusValueType`](../type-aliases/StatusValueType.md)

表示“停用”状态的值

默认为 `0`
