<!--
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
-->

<template>
  <div class="crud-table-container">
    <!-- 查询区域 -->
    <div v-if="!props.hideQuery" class="query-section" :class="[`layout-${props.queryLayout}`]">
      <div class="query-form">
        <!-- @slot query - 查询表单项 -->
        <slot name="query" />
      </div>
      <div class="query-actions">
        <el-button type="primary" icon="Search" @click="handleSearch"> 查询 </el-button>
        <el-button v-if="!props.hideReset" icon="Refresh" @click="handleReset"> 重置 </el-button>
        <!-- @slot query-actions - 操作按钮 -->
        <slot name="query-actions" />
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="table-section">
      <el-table
        ref="tableRef"
        :data="table.data"
        :height="tableHeight"
        :show-overflow-tooltip="true"
        v-loading="table.loading"
        @selection-change="onSelectionChange"
        :class="{ 'single-selection': props.singleSelection }"
      >
        <!-- @slot columns - 表格列定义 -->
        <slot name="columns" />
      </el-table>
    </div>

    <!-- 分页区域 -->
    <div v-if="!props.hidePagination && table.pagination.total > 0" class="pagination-section">
      <pagination
        :total="table.pagination.total"
        v-model:page="table.pagination.pageNum"
        v-model:limit="table.pagination.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
  name="XzTable"
  generic="T extends { id: string | number }, Q extends import('@/class/table').QueryInter"
>
/**
 * @prop {Table<T, Q>} table 表格核心实例，由 useCrudTable.table 提供
 * @prop {() => Promise<T[]>} getList 获取列表数据的方法，由 useCrudTable.getList 提供
 * @prop {boolean} [hideQuery=false] 是否隐藏查询区域
 * @prop {boolean} [hidePagination=false] 是否隐藏分页
 * @prop {boolean} [hideReset=false] 是否隐藏重置按钮
 * @prop {"between"|"start"} [queryLayout="between"] 查询区域布局方式
 * @prop {boolean} [singleSelection=false] 是否启用单选模式
 * @prop {string|number} [height="100%"] 表格高度
 *
 * @slot query 查询表单项插槽
 * @slot query-actions 查询区右侧操作按钮插槽
 * @slot columns 表格列定义插槽（必须使用 el-table-column）
 *
 * @expose selectedRows 当前选中的行数据数组
 * @expose clearSelection 清空所有选中项
 * @expose toggleRowSelection 切换某一行的选中状态
 * @expose getTableRef 获取内部 ElTable 实例引用
 */

import { ref, computed, nextTick } from "vue";
import type { Table } from "@/class/table";
import Pagination from "../XzPagination/index.vue";
import { ElTable } from "element-plus";

const props = withDefaults(
  defineProps<{
    /**
     * 表格核心实例（由 useCrudTable.table 提供）
     */
    table: Table<T, Q>;

    /**
     * 获取列表数据的方法（由 useCrudTable.getList 提供）
     */
    getList: () => Promise<T[]>;

    /**
     * 是否隐藏查询区域
     */
    hideQuery?: boolean;

    /**
     * 是否隐藏分页
     */
    hidePagination?: boolean;

    /**
     * 是否隐藏“重置”按钮
     */
    hideReset?: boolean;

    /**
     * 查询区域布局方式
     * - 'between': 左表单右按钮（默认）
     * - 'start': 表单在左，按钮紧随其后
     */
    queryLayout?: "between" | "start";

    /**
     * 是否启用单选模式（隐藏表头全选框，限制只能选一项）
     */
    singleSelection?: boolean;

    /**
     * 表格高度（默认填满容器）
     */
    height?: string | number;
  }>(),
  {
    queryLayout: "between",
    height: "100%",
  }
);

const tableRef = ref<InstanceType<typeof ElTable> | null>(null);
const selectedRows = ref<T[]>([]);

// 计算表格高度（支持百分比或数值）
const tableHeight = computed(() => {
  if (typeof props.height === "number") {
    return `${props.height}px`;
  }
  return props.height;
});

// ===== 方法 =====

/**
 * 触发查询（调用外部 getList）
 */
const handleSearch = () => {
  props.table.search(props.getList);
};

/**
 * 重置查询条件并刷新
 */
const handleReset = () => {
  props.table.reset(props.getList);
};

/**
 * 处理多选变化（支持单选限制）
 */
const onSelectionChange = (selection: T[]) => {
  if (props.singleSelection) {
    if (selection.length > 1) {
      // 清空选择，只保留最新一项
      const last = selection[selection.length - 1];
      nextTick(() => {
        tableRef.value?.clearSelection();
        tableRef.value?.toggleRowSelection(last, true);
      });
      selectedRows.value = [last];
      return;
    }
  }
  selectedRows.value = selection;
};

// ===== 暴露给父组件 =====
defineExpose({
  /**
   * 当前选中的行数据
   */
  selectedRows,

  /**
   * 清空所有选中项
   */
  clearSelection() {
    tableRef.value?.clearSelection();
    selectedRows.value = [];
  },

  /**
   * 切换某一行的选中状态
   */
  toggleRowSelection(row: T, selected?: boolean) {
    tableRef.value?.toggleRowSelection(row, selected);
    // 注意：selectedRows 需要手动同步（或依赖 selection-change）
  },

  /**
   * 获取当前表格引用（ElTable 实例）
   */
  getTableRef() {
    return tableRef.value;
  },
});
</script>

<script lang="ts">
export default {
  name: "XzTable",
};
</script>

<style scoped lang="scss">
.crud-table-container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .query-section {
    display: flex;
    margin-bottom: 8px;
    gap: 16px;

    &.layout-between {
      justify-content: space-between;
    }

    &.layout-start {
      justify-content: flex-start;
    }

    .query-form {
      flex: 1;
      min-width: 0; // 防止 flex 子项溢出
    }

    .query-actions {
      display: flex;
      gap: 12px;
      white-space: nowrap;
    }
  }

  .table-section {
    flex: 1;
    overflow: hidden;

    :deep(.el-table) {
      height: 100%;

      .el-table__header-wrapper th {
        background-color: #ecf2fe !important;
      }

      /* 单选模式：隐藏表头全选框 */
      &.single-selection {
        .el-table__header .el-checkbox {
          display: none !important;
        }
      }
    }
  }

  .pagination-section {
    margin-top: 8px;
  }
}
</style>
