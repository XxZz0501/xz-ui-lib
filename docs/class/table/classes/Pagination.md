[**xz-ui-lib**](../../README.md)

***

# Class: Pagination

分页配置类

## Constructors

### Constructor

> **new Pagination**(`pageNum`, `pageSize`, `total`, `size`): `Pagination`

#### Parameters

##### pageNum

`number` = `1`

##### pageSize

`number` = `10`

##### total

`number` = `0`

##### size

`string` = `''`

#### Returns

`Pagination`

## Properties

### pageNum

> **pageNum**: `number`

当前页码（从 1 开始）

***

### pageSize

> **pageSize**: `number`

每页大小

***

### size

> **size**: `string`

分页组件尺寸（如 'small' | 'default' | 'large'，用于 UI）

***

### total

> **total**: `number`

总记录数

## Methods

### setTotal()

> **setTotal**(`total`): `void`

设置总记录数，并智能调整当前页码（防止删除最后一页最后一项后出现空白页）

#### Parameters

##### total

`number`

新的总记录数

#### Returns

`void`
