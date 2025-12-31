[**xz-ui-lib**](../../README.md)

***

# Function: useRequest()

> **useRequest**\<`T`\>(`api`): `object`

## Type Parameters

### T

`T`

## Parameters

### api

() => `Promise`\<`T`\>

## Returns

`object`

### data

> **data**: \[`T` \| `null`\] *extends* \[`Ref`\<`any`, `any`\>\] ? `IfAny`\<`Ref`\<`any`, `any`\> & `T`, `Ref`\<`Ref`\<`any`, `any`\> & `T`, `Ref`\<`any`, `any`\> & `T`\>, `Ref`\<`any`, `any`\> & `T`\> : `Ref`\<`UnwrapRef`\<`T`\> \| `null`, `T` \| `UnwrapRef`\<`T`\> \| `null`\>

### loading

> **loading**: `Ref`\<`boolean`, `boolean`\>

### run()

> **run**: () => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>
