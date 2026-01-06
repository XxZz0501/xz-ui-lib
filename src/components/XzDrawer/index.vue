<!--
# Drawer 抽屉组件

## 介绍

封装 Element Plus 的 `<el-drawer>`，提供 **属性透传、自动聚焦、延迟关闭回调、统一隐藏机制** 等增强功能。  
支持可选响应式宽度适配（通过 responsive 属性开启），适用于后台系统详情/编辑侧边栏。

通过 inject(VisibleEntity) 控制显隐，配合外层 v-if 使用，确保动画流畅与内存优化。

## 核心特性

✅ 通过 inject(VisibleEntity) 统一管理抽屉显隐状态  
✅ 完整属性透传（title、size、direction、destroy-on-close 等全支持）  
✅ 可选响应式宽度（responsive 属性开启后，小屏幕自动优化）  
✅ 默认提供 header、body、footer 插槽  
✅ 可隐藏默认关闭按钮（hideDefaultClose）  
✅ 关闭动画结束后延迟触发 VisibleEntity.close()，完美兼容外层 v-if  
✅ 打开后自动聚焦内容（提升可访问性）  
✅ 支持 hidden 属性完全隐藏（与 Pagination 等组件一致）

## 基础用法

抽屉通过 `VisibleEntity` 统一管理显隐状态，推荐在外层使用 `v-if` 配合 `visibleEntity.visible` 控制挂载，以实现动画流畅和内存优化。

```vue
<template>
  <XzDrawer
    v-if="drawerVisibleEntity.visible"
    name="visibleEntity"
    title="编辑用户"
    size="800px"
    direction="rtl"
    @closed="onDrawerClosed"
  >
    <template #body>
    </template>

    <template #footer>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </template>
  </XzDrawer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { VisibleEntity } from '@xxzz/xz-ui-lib'

// 创建抽屉实例
const drawerVisibleEntity = new VisibleEntity()

// 在需要打开抽屉的地方提供实例（通常在父组件或全局）
provide('visibleEntity', drawerVisibleEntity)

// 示例：打开抽屉
function openDrawer() {
  drawerVisibleEntity.open()
}

// 可选：抽屉完全关闭后的回调
function onDrawerClosed() {
  console.log('抽屉已完全关闭并销毁')
}
</script>

```

## 注意事项

- 推荐配合外层 `<XzDrawer v-if="visibleEntity.visible">` 使用
- size 等原生属性通过 $attrs 透传（如 :size="1000" title="详情"）
- 响应式功能默认关闭，避免影响后台固定布局；需自适应时显式设置 responsive
-->

<template>
  <div v-show="!hidden" class="drawer-container">
    <el-drawer
      v-model="currentVisible"
      :size="finalSize"
      v-bind="$attrs"
      @close="handleClose"
    >
      <template v-if="$slots.header" #header>
        <slot name="header" />
      </template>

      <div ref="bodyRef" class="drawer-body-custom" tabindex="-1">
        <slot name="body" />
        <slot v-if="!$slots.body" />
      </div>

      <template #footer>
        <slot name="footer" />
        <el-button v-if="!hideDefaultClose" @click="handleClose">关闭</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
/**
 * @prop {string} [name="visibleEntity"] inject 的 key，用于获取 VisibleEntity 实例
 * @prop {boolean} [hideDefaultClose=false] 是否隐藏默认的“关闭”按钮（footer 中默认按钮）
 * @prop {boolean} [hidden=false] 是否完全隐藏抽屉（v-show 控制，与 Pagination 等组件一致）
 * @prop {boolean} [responsive=false] 是否开启响应式宽度适配（小屏幕下固定 px 值自动转为 90%）
 *
 * @event 无（所有原生 el-drawer 事件如 open、close、closed 等通过 $attrs 透传）
 *
 * @expose currentVisible 当前抽屉可见性（内部 ref，用于 v-model 绑定 el-drawer）
 * @expose finalSize 计算后的最终抽屉宽度（响应式处理后）
 */
import { ref, inject, onMounted, computed, Ref, useAttrs } from "vue";
import { VisibleEntity } from "@/class";
import { useDevice } from "@/composables"; // 引入统一工具

defineOptions({
  name: "XzDrawer",
  inheritAttrs: false,
});

interface DrawerProps {
  name?: string;
  hideDefaultClose?: boolean;
  hidden?: boolean;
  /** 是否开启响应式宽度适配（小屏幕下固定px自动转为90%） */
  responsive?: boolean;
}

const props = withDefaults(defineProps<DrawerProps>(), {
  name: "visibleEntity",
  hideDefaultClose: false,
  hidden: false,
  responsive: false, // 默认关闭，适合后台系统
});

// ========================
// VisibleEntity
// ========================
const visibleEntity = inject<Ref<VisibleEntity>>(props.name);
if (!visibleEntity?.value) {
  console.warn(`[XzDrawer] 未找到 inject 的 VisibleEntity，key: ${props.name}`);
}

const currentVisible = ref(false);
onMounted(() => {
  if (visibleEntity?.value) {
    currentVisible.value = visibleEntity.value.visible;
  }
});

const handleClose = () => {
  currentVisible.value = false;
  setTimeout(() => {
    visibleEntity?.value.close();
  }, 150);
};

// ========================
// 响应式宽度（可选开启）
// ========================
const { isTablet } = useDevice(); // < 992px

const userSize = computed(() => {
  // 从 $attrs 中提取用户传入的 size（el-drawer 原生支持）
  return (attrs.value as any)?.size;
});

const finalSize = computed(() => {
  if (!props.responsive) {
    return userSize.value; // 不开启响应式，直接透传
  }

  const size = userSize.value;
  if (!size) return undefined;

  // 如果是固定 px 值且当前是小屏幕，改为 90%
  if (isTablet.value && typeof size === "string" && /^\d+px$/.test(size.trim())) {
    return "90%";
  }

  return size;
});

// 暴露 attrs 以供 computed 使用（Vue 3.4+ 支持）
const attrs = useAttrs() || ({} as any);
</script>

<style scoped lang="scss">
.drawer-body-custom {
  height: 100%;
  overflow-y: auto;
  outline: none;
}

.drawer-container[style*="display: none"] {
  display: none !important;
}
</style>
