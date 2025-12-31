[**xz-ui-lib**](../../README.md)

***

# Class: VisibleEntity\<T\>

弹窗/抽屉控制类，用于管理可见性、操作类型与绑定实体数据

支持泛型，确保 entity 类型安全。

## Example

```ts
interface User { id: number; name: string }
const drawer = new VisibleEntity&lt;User&gt;`()

drawer.openAdd({ id: 0, name: 'New' })
if (drawer.visible && drawer.type === 'edit') {
  console.log(drawer.entity.name)
}
```

## Type Parameters

### T

`T` = `unknown`

## Constructors

### Constructor

> **new VisibleEntity**\<`T`\>(`options?`): `VisibleEntity`\<`T`\>

构造函数

#### Parameters

##### options?

初始化选项（可选）

###### entity?

`T`

###### type?

`string`

###### visible?

`boolean`

#### Returns

`VisibleEntity`\<`T`\>

## Properties

### entity

> **entity**: `T` \| `null` = `null`

绑定的实体数据（深拷贝后存储）

***

### type

> **type**: `string` = `'add'`

操作类型，例如 'add' | 'edit' | 'detail'

***

### visible

> **visible**: `boolean` = `false`

当前是否可见

## Methods

### close()

> **close**(): `void`

关闭弹窗/抽屉

#### Returns

`void`

***

### open()

> **open**(`entity`, `type?`): `void`

通用打开方法

#### Parameters

##### entity

`T`

要绑定的实体（将被深拷贝）

##### type?

`string`

操作类型（默认为当前 type）

#### Returns

`void`

***

### openAdd()

> **openAdd**(`entity`): `void`

打开“新增”模式

#### Parameters

##### entity

`T`

要绑定的实体（将被深拷贝）

#### Returns

`void`

***

### openDetail()

> **openDetail**(`entity`): `void`

打开“详情”模式

#### Parameters

##### entity

`T`

要绑定的实体（将被深拷贝）

#### Returns

`void`

***

### openEdit()

> **openEdit**(`entity`): `void`

打开“编辑”模式

#### Parameters

##### entity

`T`

要绑定的实体（将被深拷贝）

#### Returns

`void`
