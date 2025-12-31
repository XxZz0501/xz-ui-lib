[**xz-ui-lib**](../../README.md)

***

# scroll

> `const` **scroll**: `object`

页面滚动工具集

提供平滑滚动到指定位置的能力，使用 requestAnimationFrame + 缓动函数实现流畅动画，
兼容不同浏览器的滚动容器差异，并支持 SSR 安全调用。

## Type Declaration

---

## to

```ts
to(...)
```

平滑滚动到指定垂直位置（Y 坐标）
使用二次方缓动（ease-in-out）实现自然动画效果，
自动兼容 documentElement 和 body 的滚动差异。


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `to` | `number` | 目标垂直滚动位置（单位：px），例如 0 表示页面顶部 |
| `duration` | `number = 500` | 动画持续时间（单位：毫秒），默认 500ms |
| `callback?` | `unknown` | () => `void` 动画完成后的回调函数（可选） |


#### 返回值

`void`

### 示例

```ts
// 滚动到顶部
scroll.to(0)

// 滚动到 1000px 位置，600ms，完成后提示
scroll.to(1000, 600, () => alert('已滚动到指定位置'))
```

#### Note

在非浏览器环境（如 SSR、单元测试）中会静默跳过，不会报错。

---

## toTop

```ts
toTop(...)
```

快速滚动到页面顶部


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `duration` | `number = 500` | 动画时长（毫秒），默认 500ms |
| `callback?` | `unknown` | () => `void` 完成回调（可选） |