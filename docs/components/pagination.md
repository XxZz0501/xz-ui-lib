# Pagination 分页组件

## 介绍

封装 Element Plus 的 `<el-pagination>`，提供 **响应式适配、v-model 双向绑定、自动滚动到顶部** 等增强功能。
支持灵活布局配置、移动端优化，并可通过 `align` 属性控制对齐方式，适用于各类列表页场景。

该组件设计为 **无状态 UI 组件**，不管理分页逻辑，仅负责渲染与用户交互，需由父组件传入当前页码、每页数量及总条数。

## 核心特性

- ✅ 支持 `v-model:page` 和 `v-model:limit` 双向绑定
- ✅ 自动响应屏幕宽度：桌面端显示 7 个页码按钮，移动端缩减为 5 个
- ✅ 切换分页后可选自动滚动到页面顶部（默认开启）
- ✅ 支持完全隐藏（`hidden`）而不占布局空间
- ✅ 对齐方式灵活：`left` / `center` / `right`（默认右对齐）
- ✅ 当切换每页条数导致当前页无效时，自动重置为第一页

## 基础用法

```vue
<template>
  <Pagination
    v-model:page="currentPage"
    v-model:limit="pageSize"
    :total="total"
    @pagination="handlePagination"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fetchData } from '@/api'

const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)

// 初始加载
fetchData({ page: 1, limit: 20 }).then(res => {
  total.value = res.total
})

function handlePagination({ page, limit }: { page: number; limit: number }) {
  fetchData({ page, limit }).then(res => {
    total.value = res.total
    // 更新列表数据...
  })
}
</script>
```


## Props

| 名称           | 类型                            | 默认值                                        | 说明                                                                                    |
| -------------- | ------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------- |
| `total`      | `number`                      | —                                            | **必填**。总数据条数，用于计算总页数                                              |
| `page`       | `number`                      | `1`                                         | 当前页码，支持 `v-model:page`                                                         |
| `limit`      | `number`                      | `20`                                        | 每页条数，支持 `v-model:limit`                                                        |
| `pageSizes`  | `number[]`                    | `[10, 20, 30, 50]`                          | 可选的每页大小选项                                                                      |
| `pagerCount` | `number`                      | 动态（5 或 7）                                | 页码按钮数量。若未指定，组件根据屏幕宽度自动设置（<992px 为 5，否则为 7）               |
| `layout`     | `string`                      | `"total, sizes, prev, pager, next, jumper"` | 分页组件布局，参考[Element Plus 文档](https://element-plus.org/zh-CN/component/pagination) |
| `background` | `boolean`                     | `true`                                      | 是否启用分页按钮背景色                                                                  |
| `autoScroll` | `boolean`                     | `true`                                      | 切换分页后是否自动滚动到页面顶部（调用 `scroll.to(0, 800)`）                          |
| `hidden`     | `boolean`                     | `false`                                     | 是否隐藏分页组件（使用 `v-show`，不销毁 DOM）                                         |
| `align`      | `'left' \| 'center' \| 'right'` | `'right'`                                   | 分页容器的水平对齐方式                                                                  |

## Events

| 事件名           | 参数                                | 说明                                                                                         |
| ---------------- | ----------------------------------- | -------------------------------------------------------------------------------------------- |
| `update:page`  | `(value: number)`                 | 当前页码变更时触发，用于 `v-model:page`                                                    |
| `update:limit` | `(value: number)`                 | 每页条数变更时触发，用于 `v-model:limit`                                                   |
| `pagination`   | `{ page: number; limit: number }` | **推荐监听此事件**。当分页参数（页码或每页数）任一发生变化时统一触发，便于发起数据请求 |


## 注意事项

* ⚠️ **必须传入 `total`**，否则分页器无法正确计算总页数，可能导致 UI 异常。
* ⚠️ 若启用 `autoScroll: true`（默认），请确保项目中已实现 `@/utils/scroll.to` 方法。
* 🔧 `pagerCount` 通常无需手动设置。如需固定值（如始终显示 9 个页码按钮），可显式传入 `:pager-count="9"`。
* 🚫 隐藏分页器时，**优先使用 `hidden` 而非 `v-if`**，避免频繁创建/销毁组件实例，提升性能。


## 依赖

* [Element Plus - Pagination]()
* 项目内工具函数：`@/utils/scroll.to`
