<!--
# Modal 对话框组件

## 介绍

封装 Element Plus 的 `<el-dialog>`，提供 **属性透传、自动聚焦、延迟关闭回调、统一隐藏机制** 等增强功能。  
与 XzDrawer、XzPagination 等组件保持完全一致的风格与体验，适用于后台系统的确认、表单编辑、详情展示等场景。

通过 inject(VisibleEntity) 控制显隐，推荐配合外层 v-if 使用，确保动画流畅与内存优化。

## 核心特性

✅ 通过 inject(VisibleEntity) 统一管理对话框显隐状态  
✅ 完整属性透传（title、width、align-center、destroy-on-close、modal 等全支持）  
✅ 可选响应式宽度（responsive 属性开启后，小屏幕自动优化）  
✅ 默认提供 footer 插槽与可选关闭按钮（hiddenClose）  
✅ 关闭动画结束后延迟 300ms 触发 VisibleEntity.close()，完美兼容外层 v-if  
✅ 支持 hidden 属性完全隐藏（与 Pagination、Drawer 等组件一致）  
✅ 为未来移动端适配预留 useDevice 工具（当前默认关闭，更适合后台固定宽度）

## 基础用法

对话框通过 `VisibleEntity` 统一管理显隐状态，推荐在外层使用 `v-if` 配合 `visibleEntity.visible` 控制挂载，确保关闭动画完整播放并及时销毁内容。

```vue
<template>
  <XzModal
    v-if="modalVisibleEntity.visible"
    name="visibleEntity"
    title="删除确认"
    width="400px"
    :close-on-click-modal="false"
    @closed="onModalClosed"
  >
    <template #body>
      <p>确定要删除该记录吗？此操作不可恢复。</p>
    </template>

    <template #footer>
      <el-button @click="modalVisibleEntity.close()">取消</el-button>
      <el-button type="danger" @click="confirmDelete">确定删除</el-button>
    </template>
  </XzModal>
</template>

<script setup lang="ts">
import { VisibleEntity } from '@xxzz/xz-ui-lib'

// 创建对话框实例
const modalVisibleEntity = new VisibleEntity()

// 在当前组件或父组件中提供
provide('visibleEntity', modalVisibleEntity)

// 示例：打开对话框
function openDeleteModal() {
  modalVisibleEntity.open()
}

function confirmDelete() {
  // 执行删除逻辑
  modalVisibleEntity.close()
}

function onModalClosed() {
  console.log('对话框已完全关闭并销毁')
}
</script>
```

## 注意事项

- 推荐配合外层 `<XzModal v-if="visibleEntity.visible">` 使用
- title、width、destroy-on-close 等原生属性通过 $attrs 直接透传
- 响应式功能默认关闭，避免影响后台布局；需自适应时显式设置 responsive
- 关闭延迟时间为 300ms（匹配 el-dialog 默认过渡动画时长）
-->

<template>
  <div v-show="!hidden" class="modal-container">
    <el-dialog
      v-model="currentVisible"
      :width="finalWidth"
      v-bind="$attrs"
      destroy-on-close
      @closed="handleClose"
    >
      <!-- 自定义 footer -->
      <template #footer>
        <slot name="footer" />
        <el-button v-if="!hiddenClose" @click="handleClose">关闭</el-button>
      </template>

      <!-- 内容区域 -->
      <div class="modal-body-custom">
        <slot name="body" />
        <slot v-if="!$slots.body" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
/**
 * @prop {string} [name="visibleEntity"] inject 的 key，用于获取 VisibleEntity 实例
 * @prop {boolean} [hiddenClose=false] 是否隐藏默认的“关闭”按钮（footer 中默认按钮）
 * @prop {boolean} [hidden=false] 是否完全隐藏对话框（v-show 控制，与 Pagination 等组件一致）
 * @prop {boolean} [responsive=false] 是否开启响应式宽度适配（小屏幕下固定 px 值自动转为 90%）
 *
 * @event 无（所有原生 el-dialog 事件如 open、close、closed、opened 等通过 $attrs 透传）
 *
 * @expose currentVisible 当前对话框可见性（内部 ref，用于 v-model 绑定 el-dialog）
 * @expose finalWidth 计算后的最终对话框宽度（响应式处理后）
 */
import { ref, inject, onMounted, computed, useAttrs, Ref } from "vue";
import { VisibleEntity } from "@/class";
import { useDevice } from "@/composables/useDevice";

defineOptions({
  name: "XzModal",
  inheritAttrs: false, // 手动透传 $attrs
});

interface ModalProps {
  /** inject 的 key */
  name?: string;
  /** 是否隐藏默认关闭按钮 */
  hiddenClose?: boolean;
  /** 是否完全隐藏对话框（v-show 控制，与其他组件一致） */
  hidden?: boolean;
  /** 是否开启响应式宽度适配（小屏幕下固定 px 自动转为合适值） */
  responsive?: boolean;
}

const props = withDefaults(defineProps<ModalProps>(), {
  name: "visibleEntity",
  hiddenClose: false,
  hidden: false,
  responsive: false, // 默认关闭，适合后台系统
});

// ========================
// VisibleEntity inject
// ========================
const visibleEntity = inject<Ref<VisibleEntity>>(props.name);
if (!visibleEntity?.value) {
  console.warn(`[XzModal] 未找到 inject 的 VisibleEntity，key: ${props.name}`);
}

// ========================
// 可见性控制（配合 v-if + onMounted 同步）
// ========================
const currentVisible = ref(false);

onMounted(() => {
  if (visibleEntity?.value) {
    currentVisible.value = visibleEntity.value.visible;
  }
});

// ========================
// 关闭逻辑（保留延迟，确保动画完成 + v-if 销毁）
// ========================
const handleClose = () => {
  currentVisible.value = false;
  // el-dialog 关闭动画结束后触发，延迟调用 close() 确保外层 v-if 优雅卸载
  setTimeout(() => {
    visibleEntity?.value.close();
  }, 300);
};

// ========================
// 响应式宽度（可选开启，与 Drawer 一致）
// ========================
const { isTablet } = useDevice(); // < 992px

const userWidth = computed(() => {
  return (useAttrs() as any)?.width;
});

const finalWidth = computed(() => {
  if (!props.responsive) {
    return userWidth.value;
  }

  const width = userWidth.value;
  if (!width) return undefined;

  // 小屏幕下固定 px 值自动转为 90%（移动/平板友好）
  if (isTablet.value && typeof width === "string" && /^\d+px$/.test(width.trim())) {
    return "90%";
  }

  return width;
});
</script>

<style scoped lang="scss">
.modal-body-custom {
  padding: 8px;
  min-height: 100px; // 防止空内容时高度塌陷
}

/* hidden 时彻底不占位 */
.modal-container[style*="display: none"] {
  display: none !important;
}
</style>
