# xz-table

## 介绍

高阶 CRUD 表格组件，用于快速搭建具备 **查询、分页、选择、重置** 等能力的标准数据表格。

该组件本身不管理数据逻辑，而是与组合式函数 [`useCrudTable`](/composables/useCrudTable/functions/useCrudTable.html) 深度协同：

- 由 `useCrudTable` 提供 **表格状态（table）** 和 **数据加载方法（getList）**
- 由 `XzTable` 负责 **UI 渲染与用户交互**

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
  apiFn: {list}
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

## Props

| 名称                | 类型                    | 默认值        | 说明                                         |
| ------------------- | ----------------------- | ------------- | -------------------------------------------- |
| `table`           | `Table<T, Q>`         | —            | 表格核心实例，由 `useCrudTable.table` 提供 |
| `getList`         | `() => Promise<T[]>`  | —            | 获取列表数据的方法，由 `getList` 提供      |
| `hideQuery`       | `boolean`             | `false`     | 是否隐藏查询区域                             |
| `hidePagination`  | `boolean`             | `false`     | 是否隐藏分页                                 |
| `hideReset`       | `boolean`             | `false`     | 是否隐藏“重置”按钮                         |
| `queryLayout`     | `'between' \| 'start'` | `'between'` | 查询区域布局方式                             |
| `singleSelection` | `boolean`             | `false`     | 是否启用单选模式（限制只能选中一行）         |
| `height`          | `string \| number`     | `'100%'`    | 表格高度                                     |

## Events

| 事件名      | 参数 | 说明                                      |
| ----------- | ---- | ----------------------------------------- |
| `refresh` | —   | 手动触发刷新时派发（可用于父组件 reload） |

## Slots

| 名称              | 说明                                           |
| ----------------- | ---------------------------------------------- |
| `query`         | 查询表单项插槽（如输入框、选择器等）           |
| `query-actions` | 查询区右侧操作按钮插槽（追加自定义按钮）       |
| `columns`       | 表格列定义插槽（必须使用 `el-table-column`） |

## Exposed

| 属性/方法                              | 说明                                 |
| -------------------------------------- | ------------------------------------ |
| `selectedRows`                       | 当前选中的行数据数组（`ref<T[]>`） |
| `clearSelection()`                   | 清空所有选中项                       |
| `toggleRowSelection(row, selected?)` | 切换某一行的选中状态                 |
| `getTableRef()`                      | 获取内部 `ElTable` 实例引用        |

## 功能特性

* ✅ 自动绑定查询、重置、分页事件
* ✅ 支持隐藏查询区、分页、重置按钮
* ✅ 支持单选模式（限制只能选中一行）
* ✅ 响应式布局（支持 `queryLayout="between"` 或 `"start"`）
* ✅ 暴露 `selectedRows`、`clearSelection()` 等方法供父组件控制
* ✅ 内置加载状态（`v-loading`）

> 💡 注意：本组件依赖 Element Plus 的 `<el-table>` 和 `<el-button>`，请确保已全局注册或按需引入。
