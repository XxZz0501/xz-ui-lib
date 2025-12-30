[**xz-ui-lib**](../../README.md)

***

# xzFormRules

> `const` **xzFormRules**: `object`

Element Plus 表单常用校验规则集合

专为 `<el-form>` 的 `rules` 字段设计，提供开箱即用的 validator 规则对象。
所有规则均使用 `trigger: 'blur'`，符合常规表单交互习惯。

## Type Declaration

### \_messages

> **\_messages**: `object`

#### \_messages.bankCard

> **bankCard**: `string` = `'请输入正确的银行卡号'`

#### \_messages.email

> **email**: `string` = `'请输入正确的邮箱地址'`

#### \_messages.idCard

> **idCard**: `string` = `'请输入正确的身份证号码'`

#### \_messages.integer

> **integer**: `string` = `'请输入整数'`

#### \_messages.ip

> **ip**: `string` = `'请输入有效的 IPv4 地址'`

#### \_messages.name

> **name**: `string` = `'姓名只能包含中文、字母、·，长度2-20位'`

#### \_messages.number

> **number**: `string` = `'请输入有效数字'`

#### \_messages.password

> **password**: `string` = `'密码需包含大小写字母、数字和特殊字符，长度8-20位'`

#### \_messages.phone

> **phone**: `string` = `'请输入正确的手机号码'`

#### \_messages.plateNumber

> **plateNumber**: `string` = `'请输入正确的车牌号'`

#### \_messages.positiveInteger

> **positiveInteger**: `string` = `'请输入正整数'`

#### \_messages.required

> **required**: `string` = `'请输入{field}'`

#### \_messages.url

> **url**: `string` = `'请输入有效的网址'`

---

### bankCardRule

#### Get Signature

> **get** **bankCardRule**(): `object`

银行卡号校验（支持16/19位，使用 Luhn 算法）

##### Example

```ts
const rules = {
  bankCard: [xzFormRules.requiredRule('银行卡号'), xzFormRules.bankCardRule]
};
```

##### Returns

`object`

###### trigger

> **trigger**: `string` = `'blur'`

###### validator()

> **validator**: (`_`, `value`, `callback`) => `void`

###### Parameters

###### \_

`any`

###### value

`string`

###### callback

(`error?`) => `void`

###### Returns

`void`


---

### emailRule

#### Get Signature

> **get** **emailRule**(): `object`

邮箱格式校验

##### Example

```ts
const rules = {
  email: [xzFormRules.requiredRule('邮箱'), xzFormRules.emailRule]
};
```

##### Returns

`object`

###### trigger

> **trigger**: `string` = `'blur'`

###### validator()

> **validator**: (`_`, `value`, `callback`) => `void`

###### Parameters

###### \_

`any`

###### value

`string`

###### callback

(`error?`) => `void`

###### Returns

`void`


---

### idCardRule

#### Get Signature

> **get** **idCardRule**(): `object`

身份证校验（支持15位或18位，18位含校验码验证）

##### Example

```ts
const rules = {
  idCard: [xzFormRules.requiredRule('身份证'), xzFormRules.idCardRule]
};
```

##### Returns

`object`

###### trigger

> **trigger**: `string` = `'blur'`

###### validator()

> **validator**: (`_`, `value`, `callback`) => `void`

###### Parameters

###### \_

`any`

###### value

`string`

###### callback

(`error?`) => `void`

###### Returns

`void`


---

### integerRule

#### Get Signature

> **get** **integerRule**(): `object`

整数校验（可负）

##### Example

```ts
const rules = {
  count: [xzFormRules.requiredRule('数量'), xzFormRules.integerRule]
};
```

##### Returns

`object`

###### trigger

> **trigger**: `string` = `'blur'`

###### validator()

> **validator**: (`_`, `value`, `callback`) => `void`

###### Parameters

###### \_

`any`

###### value

`string`

###### callback

(`error?`) => `void`

###### Returns

`void`


---

### ipRule

#### Get Signature

> **get** **ipRule**(): `object`

IPv4 地址校验

##### Example

```ts
const rules = {
  ip: [xzFormRules.requiredRule('IP地址'), xzFormRules.ipRule]
};
```

##### Returns

`object`

###### trigger

> **trigger**: `string` = `'blur'`

###### validator()

> **validator**: (`_`, `value`, `callback`) => `void`

###### Parameters

###### \_

`any`

###### value

`string`

###### callback

(`error?`) => `void`

###### Returns

`void`


---

### nameRule

#### Get Signature

> **get** **nameRule**(): `object`

中文姓名校验（允许中文、字母、空格、中间点 ·，如“玛丽·苏”）
长度限制：2-20 位

##### Example

```ts
const rules = {
  name: [xzFormRules.requiredRule('姓名'), xzFormRules.nameRule]
};
```

##### Returns

`object`

###### trigger

> **trigger**: `string` = `'blur'`

###### validator()

> **validator**: (`_`, `value`, `callback`) => `void`

###### Parameters

###### \_

`any`

###### value

`string`

###### callback

(`error?`) => `void`

###### Returns

`void`


---

### numberRule

#### Get Signature

> **get** **numberRule**(): `object`

数字校验（支持整数和小数，可负）

##### Example

```ts
const rules = {
  price: [xzFormRules.requiredRule('价格'), xzFormRules.numberRule]
};
```

##### Returns

`object`

###### trigger

> **trigger**: `string` = `'blur'`

###### validator()

> **validator**: (`_`, `value`, `callback`) => `void`

###### Parameters

###### \_

`any`

###### value

`string`

###### callback

(`error?`) => `void`

###### Returns

`void`


---

### passwordRule

#### Get Signature

> **get** **passwordRule**(): `object`

密码强度校验
要求：8-20位，必须包含大写字母、小写字母、数字、特殊字符（!@#$%^&* 等）

##### Example

```ts
const rules = {
  password: [xzFormRules.requiredRule('密码'), xzFormRules.passwordRule]
};
```

##### Returns

`object`

###### trigger

> **trigger**: `string` = `'blur'`

###### validator()

> **validator**: (`_`, `value`, `callback`) => `void`

###### Parameters

###### \_

`any`

###### value

`string`

###### callback

(`error?`) => `void`

###### Returns

`void`


---

### phoneOrEmailRule

#### Get Signature

> **get** **phoneOrEmailRule**(): `object`

手机号或邮箱校验（常用于登录账号字段）

##### Example

```ts
const rules = {
  account: [xzFormRules.requiredRule('账号'), xzFormRules.phoneOrEmailRule]
};
```

##### Returns

`object`

###### trigger

> **trigger**: `string` = `'blur'`

###### validator()

> **validator**: (`_`, `value`, `callback`) => `void`

###### Parameters

###### \_

`any`

###### value

`string`

###### callback

(`error?`) => `void`

###### Returns

`void`


---

### phoneRule

#### Get Signature

> **get** **phoneRule**(): `object`

中国大陆手机号校验（支持 13~19 开头）

##### Example

```ts
const rules = {
  phone: [xzFormRules.requiredRule('手机号'), xzFormRules.phoneRule]
};
```

##### Returns

`object`

###### trigger

> **trigger**: `string` = `'blur'`

###### validator()

> **validator**: (`_`, `value`, `callback`) => `void`

###### Parameters

###### \_

`any`

###### value

`string`

###### callback

(`error?`) => `void`

###### Returns

`void`


---

### plateNumberRule

#### Get Signature

> **get** **plateNumberRule**(): `object`

中国大陆车牌号校验（支持新能源、普通车牌）

格式示例：
- 普通：京A12345、粤B123456
- 新能源：京AD12345、粤BD12345

##### Example

```ts
const rules = {
  plateNumber: [xzFormRules.requiredRule('车牌号'), xzFormRules.plateNumberRule]
};
```

##### Returns

`object`

###### trigger

> **trigger**: `string` = `'blur'`

###### validator()

> **validator**: (`_`, `value`, `callback`) => `void`

###### Parameters

###### \_

`any`

###### value

`string`

###### callback

(`error?`) => `void`

###### Returns

`void`


---

### positiveIntegerRule

#### Get Signature

> **get** **positiveIntegerRule**(): `object`

正整数校验（>0 的整数）

##### Example

```ts
const rules = {
  age: [xzFormRules.requiredRule('年龄'), xzFormRules.positiveIntegerRule]
};
```

##### Returns

`object`

###### trigger

> **trigger**: `string` = `'blur'`

###### validator()

> **validator**: (`_`, `value`, `callback`) => `void`

###### Parameters

###### \_

`any`

###### value

`string`

###### callback

(`error?`) => `void`

###### Returns

`void`


---

### urlRule

#### Get Signature

> **get** **urlRule**(): `object`

URL 校验（使用原生 URL 构造函数验证）

##### Example

```ts
const rules = {
  website: [xzFormRules.requiredRule('网站'), xzFormRules.urlRule]
};
```

##### Returns

`object`

###### trigger

> **trigger**: `string` = `'blur'`

###### validator()

> **validator**: (`_`, `value`, `callback`) => `void`

###### Parameters

###### \_

`any`

###### value

`string`

###### callback

(`error?`) => `void`

###### Returns

`void`


---

## requiredRule

```ts
requiredRule(...)
```

生成必填校验规则


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `field` | `string = ''` | 字段名称，用于错误提示（如 "用户名"），默认为空 |


#### 返回值

`object`

### 示例

```ts
const rules = {
  username: [xzFormRules.requiredRule('用户名')]
};
```

## Example

```ts
// 基础用法
import { xzFormRules } from 'xz-ui-lib';

const rules = {
  phone: [xzFormRules.requiredRule('手机号'), xzFormRules.phoneRule],
};

// 在模板中
// <el-form-item prop="phone" :rules="rules.phone">
```