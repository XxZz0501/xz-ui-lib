<!-- src/components/CrudTable.vue -->
<template>
  <div class="crud-table-container">
    <!-- 查询区域 -->
    <div v-if="!props.hideQuery" class="query-section" :class="[`layout-${props.queryLayout}`]">
      <div class="query-form">
        <slot name="query" />
      </div>
      <div class="query-actions">
        <el-button type="primary" icon="Search" @click="handleSearch"> 查询 </el-button>
        <el-button v-if="!props.hideReset" icon="Refresh" @click="handleReset"> 重置 </el-button>
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
        <slot name="columns" />
      </el-table>
    </div>

    <!-- 分页区域 -->
    <div v-if="!props.hidePagination && table.pagination.total > 0" class="pagination-section">
      <pagination
        :total="table.pagination.total"
        v-model:page="table.pagination.pageNum"
        v-model:limit="table.pagination.pageSize"
        @pagination="emit('refresh')"
      />
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
  generic="T extends { id: string | number }, Q extends import('@/class/table').QueryInter"
>
import { ref, computed, nextTick } from "vue";
import type { Table } from "@/class/table";
import Pagination from "./pagination.vue"; // 请根据实际路径调整
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

const emit = defineEmits<{
  (e: "refresh"): void;
}>();

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
    margin-top: 16px;
    height: 54px;
  }
}
</style>
