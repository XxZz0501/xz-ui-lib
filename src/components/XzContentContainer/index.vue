<!--
# ContentContainer 内容容器组件

## 介绍

提供标准化的页面布局容器，包含面包屑导航区、主内容区、底部按钮区三部分。  
支持普通滚动布局与 Flex 弹性布局两种模式，内置 Element Plus 加载状态，适用于表单页、详情页等典型业务场景。

该组件为无状态 UI 容器，不管理业务逻辑，仅负责结构组织与加载状态展示。

## 核心特性

✅ 内置 v-loading 加载状态，自动隐藏/显示非内容区域  
✅ 支持 breadcrumb / content / button 三个语义化插槽  
✅ 支持两种布局模式：
   - 普通模式：整个容器滚动
   - Flex 模式（isFlex=true）：内容区独立滚动，按钮区固定在底部  
✅ 自动处理内边距、滚动条与分隔线样式  
✅ 支持透传所有 HTML 属性（如 class、style）

## 基础用法

```vue
<template>
  <XzContentContainer :loading="isLoading" :is-flex="true">
    <template #breadcrumb>
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </template>

    <template #content>
      <UserForm />
    </template>

    <template #button>
      <el-button type="primary" @click="submit">提交</el-button>
    </template>
  </XzContentContainer>
</template>
```

注意事项
- 若使用 isFlex=true，建议内容高度较大时启用，以确保操作按钮始终可见。
- loading 为 true 时，面包屑和按钮区域将自动隐藏。
- 所有未声明属性将透传至根元素。
-->

<template>
  <div class="xz-content-container" v-loading="loading" v-bind="$attrs">
    <div v-if="$slots.breadcrumb" class="xz-content-container__breadcrumb" v-show="!loading">
      <el-breadcrumb :separator-icon="ArrowRight">
        <slot name="breadcrumb"></slot>
      </el-breadcrumb>
    </div>

    <div
      class="xz-content-container__wrapper"
      :class="{ 'xz-content-container__wrapper--flex': isFlex }"
    >
      <div class="xz-content-container__content">
        <slot name="content"></slot>
      </div>

      <div v-if="$slots.button" class="xz-content-container__button" v-show="!loading">
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @prop {boolean} [isFlex=false] 是否启用 Flex 布局（内容区滚动，按钮区固定）
 * @prop {boolean} [loading=false] 是否处于加载状态
 *
 * @slot breadcrumb 面包屑导航项（通常为 el-breadcrumb-item）
 * @slot content 主内容区域
 * @slot button 底部操作按钮区域（居中显示）
 */

import { ArrowRight } from "@element-plus/icons-vue";

defineOptions({
  name: "XzContentContainer",
});

interface ContentContainerProps {
  /** 是否启用 Flex 布局（内容区滚动，按钮区固定） */
  isFlex?: boolean;
  /** 是否处于加载状态 */
  loading?: boolean;
}

const props = withDefaults(defineProps<ContentContainerProps>(), {
  isFlex: false,
  loading: false,
});
</script>

<style scoped lang="scss">
.xz-content-container {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__breadcrumb {
    margin-bottom: 16px;
  }

  &__wrapper {
    flex: 1;
    background-color: #fff;
    padding: 20px;
    overflow-y: auto;

    &--flex {
      overflow: hidden;
      display: flex;
      flex-direction: column;

      .xz-content-container__content {
        flex: 1;
        overflow-y: auto;
      }
    }

    .xz-content-container__content {
      overflow-x: hidden;
      padding-bottom: 16px;
    }

    .xz-content-container__button {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #e5e5e5;
    }
  }
}
</style>
