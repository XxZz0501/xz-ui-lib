[**xz-ui-lib**](../../README.md)

***

# modal

> `const` **modal**: `object`

通用 UI 操作工具（基于 Element Plus）

封装常用用户交互方法，包括消息提示、弹窗确认、通知、加载遮罩等，
用于解耦业务逻辑与 UI 框架，提升可维护性与可测试性。

## Type Declaration

---

## alert

```ts
alert(...)
```

打开普通提示弹窗（仅“确定”按钮）


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `content` | `string` | 弹窗提示文本 |

---

## alertError

```ts
alertError(...)
```

打开错误类型的提示弹窗（带 ❌ 图标）


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `content` | `string` | 错误提示文本 |

---

## alertSuccess

```ts
alertSuccess(...)
```

打开成功类型的提示弹窗（带 ✅ 图标）


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `content` | `string` | 成功提示文本 |

---

## alertWarning

```ts
alertWarning(...)
```

打开警告类型的提示弹窗（带 ⚠️ 图标）


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `content` | `string` | 警告提示文本 |

---

## closeLoading

```ts
closeLoading(...)
```

关闭当前正在显示的加载遮罩
安全调用：若无加载实例，不会报错。



#### 返回值

`void`

---

## confirm

```ts
confirm(...)
```

打开确认对话框（含“确定”和“取消”按钮）


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `content` | `string` | 确认提示文本 |



### 示例

```ts
try {
  await modal.confirm('确定要删除该数据吗？')
  // 执行删除
} catch {
  // 用户取消操作
}
```

---

## loading

```ts
loading(...)
```

显示全屏加载遮罩（带半透明背景和文字提示）
若已有加载实例，则先关闭再创建新实例，避免叠加。


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `content` | `string` | 加载提示文字，例如 "正在提交..." |


#### 返回值

`void`

### 示例

```ts
modal.loading('数据加载中...')
fetchData().finally(() => modal.closeLoading())
```

---

## msg

```ts
msg(...)
```

显示普通信息消息提示（顶部居中，自动消失）


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `content` | `string` | 提示内容，支持字符串或配置对象 |


#### 返回值

`void`

---

## msgError

```ts
msgError(...)
```

显示错误类型的消息提示（红色）


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `content` | `string` | 错误提示内容 |


#### 返回值

`void`

---

## msgSuccess

```ts
msgSuccess(...)
```

显示成功类型的消息提示（绿色）


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `content` | `string` | 成功提示内容 |


#### 返回值

`void`

---

## msgWarning

```ts
msgWarning(...)
```

显示警告类型的消息提示（黄色）


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `content` | `string` | 警告提示内容 |


#### 返回值

`void`

---

## notify

```ts
notify(...)
```

在右上角显示普通通知（不会自动覆盖 Message）


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `content` | `string | object` | 通知内容，可为字符串或配置对象（如 { title, message }） |


#### 返回值

`void`

---

## notifyError

```ts
notifyError(...)
```

显示错误类型的通知（红色）


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `content` | `string | object` | 通知内容 |


#### 返回值

`void`

---

## notifySuccess

```ts
notifySuccess(...)
```

显示成功类型的通知（绿色）


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `content` | `string | object` | 通知内容 |


#### 返回值

`void`

---

## notifyWarning

```ts
notifyWarning(...)
```

显示警告类型的通知（黄色）


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `content` | `string | object` | 通知内容 |


#### 返回值

`void`

---

## prompt

```ts
prompt(...)
```

打开输入对话框，允许用户输入文本


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `content` | `string` | 输入提示文本 |



### 示例

```ts
const result = await modal.prompt('请输入备注：')
console.log(result.value)
```

## Example

```ts
import modal from '@/utils/modal'
modal.msgSuccess('操作成功')
await modal.confirm('确定要删除吗？')
modal.loading('提交中...')
modal.closeLoading()
```