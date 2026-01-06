<!-- 
# Pagination 分页组件

## 介绍

封装 Element Plus 的 `<el-pagination>`，提供 **响应式适配、v-model 双向绑定、自动滚动到顶部** 等增强功能。  
支持灵活布局配置、移动端优化，并可通过 `align` 属性控制对齐方式，适用于各类列表页场景。

该组件设计为 **无状态 UI 组件**，不管理分页逻辑，仅负责渲染与用户交互，需由父组件传入当前页码、每页数量及总条数。

## 核心特性

✅ 支持 `v-model:page` 和 `v-model:limit` 双向绑定  
✅ 自动响应屏幕宽度：桌面端显示 7 个页码按钮，移动端缩减为 5 个  
✅ 切换分页后可选自动滚动到页面顶部（默认开启）  
✅ 支持完全隐藏（`hidden`）而不占布局空间  
✅ 对齐方式灵活：`left` / `center` / `right`（默认右对齐）  
✅ 当切换每页条数导致当前页无效时，自动重置为第一页  
✅ 完整属性透传（layout、page-sizes、background、total 等全支持）
✅ 支持 tableRef 自动定位滚动容器  

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

const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(100)

function handlePagination({ page, limit }) {
  // 调用 API 获取新数据
  fetchData({ page, limit })
}
</script>
```

注意事项
必须传入 total，否则分页器无法正确计算总页数。
若使用 autoScroll: true（默认），请确保项目中已正确引入并配置 @/utils/xzScroll.to 方法。
pagerCount 通常无需手动设置，组件会根据屏幕宽度自动适配；如需固定值，可显式传入。
隐藏分页器请使用 hidden 属性，而非 v-if，以避免重复挂载/销毁带来的性能开销。 
 -->
<template>
  <div v-show="!hidden" class="pagination-container">
    <el-pagination
      v-model:current-page="currentPageProxy"
      v-model:page-size="pageSizeProxy"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * @prop {number} total 总数据条数
 * @prop {number} [page=1] 当前页码（支持 v-model:page）
 * @prop {number} [limit=20] 每页条数（支持 v-model:limit）
 * @prop {boolean} [autoScroll=true] 切换分页后是否自动滚动到页面顶部
 * @prop {boolean} [hidden=false] 是否隐藏分页组件（完全不渲染）
 * @prop {"left"|"center"|"right"} [align="right"] 分页容器对齐方式
 * @prop {InstanceType<typeof ElTable>} tableRef tableRef
 *
 * @event update:page (value: number) 当前页码更新时触发（用于 v-model:page）
 * @event update:limit (value: number) 每页条数更新时触发（用于 v-model:limit）
 * @event pagination (payload: { page: number; limit: number }) 分页参数变更时统一触发
 *
 * @expose currentPageProxy 当前页码的双向绑定代理（内部使用）
 * @expose pageSizeProxy 每页条数的双向绑定代理（内部使用）
 */
import { computed, nextTick } from "vue";
import { xzScroll } from "@/utils";
import { ElTable } from "element-plus";

defineOptions({
  name: "XzPagination",
});

// ========================
// Props 定义（带类型）
// ========================
interface PaginationProps {
  /** 总数据条数 */
  total: number;

  /** tableRef */
  tableRef: InstanceType<typeof ElTable> | null;

  /** 当前页码（v-model:page） */
  page?: number;

  /** 每页条数（v-model:limit）*/
  limit?: number;

  /** 切换分页后是否自动滚动到顶部*/
  autoScroll?: boolean;

  /** 是否隐藏分页组件 */
  hidden?: boolean;

  /** 对齐方式（left / center / right）*/
  align?: "left" | "center" | "right";
}

const props = withDefaults(defineProps<PaginationProps>(), {
  total: 0,
  page: 1,
  limit: 20,
  pageSizes: () => [10, 20, 30, 50],
  pagerCount: undefined, // 由内部动态计算
  layout: "total, sizes, prev, pager, next, jumper",
  background: true,
  autoScroll: true,
  hidden: false,
  align: "right",
});

const emit = defineEmits<{
  (e: "update:page", value: number): void;
  (e: "update:limit", value: number): void;
  (e: "pagination", payload: { page: number; limit: number }): void;
}>();

// ========================
// 双向绑定代理
// ========================
const currentPageProxy = computed({
  get: () => props.page,
  set: (val: number) => emit("update:page", val),
});

const pageSizeProxy = computed({
  get: () => props.limit,
  set: (val: number) => emit("update:limit", val),
});

// ========================
// 事件处理
// ========================
function handleSizeChange(newPageSize: number) {
  let newPage = props.page;
  // 如果当前页超出范围，重置为第一页
  if (newPage * newPageSize > props.total) {
    newPage = 1;
    emit("update:page", newPage);
  }
  emit("pagination", { page: newPage, limit: newPageSize });
  if (props.autoScroll) {
    scrollToTableTop();
  }
}

function handleCurrentChange(newPage: number) {
  emit("pagination", { page: newPage, limit: props.limit });
  if (props.autoScroll) {
    scrollToTableTop();
  }
}

// 滚动至table顶部
const scrollToTableTop = () => {
  nextTick(() => {
    const tableEl = props.tableRef?.$el;
    if (!tableEl) return;

    // 优先找 .el-scrollbar__wrap（百分比高度场景）
    const scrollContainer = tableEl.querySelector(".el-scrollbar__wrap");
    if (scrollContainer) {
      xzScroll.toElementTop(scrollContainer, 500);
      return;
    }

    // 回退到 .el-table__body-wrapper（固定高度场景）
    const bodyWrapper = tableEl.querySelector(".el-table__body-wrapper");
    if (bodyWrapper) {
      xzScroll.toElementTop(bodyWrapper, 500);
    }
  });
};
</script>

<style scoped lang="scss">
.pagination-container {
  display: flex;
  justify-content: v-bind(align);
  margin-top: 0px;
  padding-bottom: 0px !important;

  .el-pagination {
    // 不再使用 float，用 Flex 控制对齐
    padding: 0;
  }
}

/* 隐藏时彻底不占位 */
.pagination-container[style*="display: none"] {
  display: none !important;
}
</style>
