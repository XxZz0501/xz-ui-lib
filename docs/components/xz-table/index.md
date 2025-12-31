# xz-table

## 介绍

# CrudTable

高阶 CRUD 表格组件，用于快速搭建具备 **查询、分页、选择、重置** 等能力的标准数据表格。

该组件本身不管理数据逻辑，而是与组合式函数 [`useCrudTable`](/composables/useCrudTable/functions/useCrudTable.html) 深度协同：
- 由 `useCrudTable` 提供 **表格状态（table）** 和 **数据加载方法（getList）**
- 由 `CrudTable` 负责 **UI 渲染与用户交互**

## 使用前提

1. 必须配合 `useCrudTable` 使用。
2. 需要传入由 `useCrudTable` 返回的 `table` 实例和 `getList` 方法。
3. 表格列定义通过 `#columns` 插槽传入（使用 Element Plus 的 `<el-table-column>`）。

## 基础用法示例

```vue
<script setup lang="ts">
import { useCrudTable } from '@/composables/useCrudTable'
import type { User, UserQuery } from '@/types'

const { table, getList } = useCrudTable<User, UserQuery>({
  fetchApi: (params) => api.user.list(params),
  defaultQuery: { keyword: '' }
})
</script>

<template>
  <CrudTable :table="table" :get-list="getList">
    <template #query>
      <el-input v-model="table.query.keyword" placeholder="请输入关键词" />
    </template>

    <template #columns>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
    </template>
  </CrudTable>
</template>
```
功能特性
✅ 自动绑定查询、重置、分页事件
✅ 支持隐藏查询区、分页、重置按钮
✅ 支持单选模式（限制只能选中一行）
✅ 响应式布局（支持 queryLayout="between" 或 "start"）
✅ 暴露 selectedRows、clearSelection() 等方法供父组件控制
✅ 内置加载状态（v-loading）
💡 注意：本组件依赖 Element Plus 的 <el-table> 和 <el-button>，请确保已全局注册或按需引入。

## 示例

```vue
<template>
  <xz-table />
</template>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `/*** 表格核心实例（由 useCrudTable.table 提供）*/table` | `Table&lt;T, Q&gt;;/*** 获取列表数据的方法（由 useCrudTable.getList 提供）*/getList` | - | - |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `{
  (e` | `"refresh")` | - |

## Slots

| 名称 | 说明 |
|------|------|
| `query` | 查询表单项 |
| `query` | actions - 操作按钮 |
| `columns` | 表格列定义 |

## Exposed

| 属性/方法 | 说明 |
|----------|------|
| `/**` | - |
| `* 当前选中的行数据` | - |
| `*/` | - |
| `selectedRows` | - |
| `/**` | - |
| `* 清空所有选中项` | - |
| `*/` | - |
| `clearSelection` | - |
| `tableRef.value?.clearSelection();` | - |
| `selectedRows.value = [];` | - |