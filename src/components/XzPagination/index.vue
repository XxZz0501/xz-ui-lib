<!-- src/components/Pagination.vue -->
<template>
  <div v-show="!hidden" class="pagination-container">
    <el-pagination
      v-model:current-page="currentPageProxy"
      v-model:page-size="pageSizeProxy"
      :background="background"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCountRef"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { scroll } from "@/utils";

// ========================
// Props 定义（带类型）
// ========================
interface PaginationProps {
  /**
   * 总数据条数
   */
  total: number;

  /**
   * 当前页码（v-model:page）
   */
  page?: number;

  /**
   * 每页条数（v-model:limit）
   */
  limit?: number;

  /**
   * 可选的每页大小选项
   */
  pageSizes?: number[];

  /**
   * 页码按钮数量（默认根据屏幕宽度动态调整）
   */
  pagerCount?: number;

  /**
   * 分页组件布局
   */
  layout?: string;

  /**
   * 是否启用背景色
   */
  background?: boolean;

  /**
   * 切换分页后是否自动滚动到顶部
   */
  autoScroll?: boolean;

  /**
   * 是否隐藏分页组件
   */
  hidden?: boolean;

  /**
   * 对齐方式（left / center / right）
   */
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
// 响应式 pagerCount（移动端适配）
// ========================
const isMobile = ref(false);
const pagerCountRef = computed(() => {
  if (props.pagerCount !== undefined) {
    return props.pagerCount;
  }
  return isMobile.value ? 5 : 7;
});

onMounted(() => {
  const checkScreen = () => {
    isMobile.value = window.innerWidth < 992;
  };
  checkScreen();
  window.addEventListener("resize", checkScreen);

  // 组件卸载时移除监听（可选，若项目有内存泄漏顾虑）
  onBeforeUnmount(() => window.removeEventListener("resize", checkScreen));
});

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
    scroll.to(0, 800);
  }
}

function handleCurrentChange(newPage: number) {
  emit("pagination", { page: newPage, limit: props.limit });
  if (props.autoScroll) {
    scroll.to(0, 800);
  }
}
</script>

<style scoped lang="scss">
.pagination-container {
  display: flex;
  justify-content: v-bind(align);
  margin-top: 16px;

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
