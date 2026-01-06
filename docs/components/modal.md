# Modal 对话框组件

## 介绍

封装 Element Plus 的 `<el-dialog>`，提供 **属性透传、响应式宽度、自动聚焦、延迟关闭回调** 等增强功能。
与 `XzDrawer`、`XzPagination` 等组件保持完全一致的风格与体验，适用于后台系统的表单编辑、详情查看、确认操作等场景。

该组件通过 `inject(VisibleEntity)` 统一管理显隐状态，推荐配合外层 `v-if="visibleEntity.visible"` 使用，确保关闭动画完整播放并及时销毁内容。

## 核心特性

- ✅ 通过 `VisibleEntity` 统一控制显隐，支持多次打开/关闭
- ✅ 完整属性透传（`title`、`width`、`align-center`、`destroy-on-close`、`close-on-click-modal` 等全支持）
- ✅ 可选响应式宽度（`responsive` 开启后，小屏幕下固定 px 自动转为 90%）
- ✅ 默认提供 `footer` 插槽与可选“关闭”按钮（`hiddenCancel`）
- ✅ 关闭动画结束后延迟 300ms 调用 `VisibleEntity.close()`，完美兼容外层 `v-if` 销毁
- ✅ 支持 `hidden` 属性完全隐藏（与 Pagination、Drawer 一致）

## 基础用法

```vue
<template>
  <!-- 推荐使用 v-if 控制挂载，避免内存泄漏 -->
  <XzModal
    v-if="modalVisibleEntity.visible"
    title="编辑用户"
    width="800px"
    :close-on-click-modal="false"
    :destroy-on-close="true"
  >
    <template #body>
      <el-form :model="form" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
      </el-form>
    </template>

    <template #footer>
      <el-button @click="modalVisibleEntity.close()">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </XzModal>
</template>

<script setup lang="ts">
import { VisibleEntity } from '@/class'

const modalVisibleEntity = new VisibleEntity()

provide('visibleEntity', modalVisibleEntity)

function openModal() {
  modalVisibleEntity.open()
}
</script>
```


## Props

| 名称         | 类型    | 默认值          | 说明                                                   |
| ------------ | ------- | --------------- | ------------------------------------------------------ |
| name         | string  | "visibleEntity" | inject 的 key，用于获取VisibleEntity实例，可自定义     |
| hiddenCancel | boolean | false           | 是否隐藏默认的“关闭”按钮（自定义 footer 时建议开启） |
| hidden       | boolean | false           | 是否完全隐藏对话框（使用v-show，不销毁 DOM）           |
| responsive   | boolean | false           | 是否开启响应式宽度（小屏幕下固定 px 值自动转为 90%）   |

> 所有 Element Plus 原生属性（如 title、width、align-center、modal、close-on-click-modal、destroy-on-close 等）均通过属性透传直接使用。

## Events

* 无自定义事件。所有原生事件（如 open、close、closed、opened）均通过 \$attrs 透传给 `<el-dialog>`。

## 注意事项

* ⚠️ **必须配合 VisibleEntity 使用**，并在外层使用 v-if="visibleEntity.visible" 控制组件挂载。
* ⚠️ 推荐透传 :destroy-on-close="true"，配合 v-if 实现内容彻底销毁，避免内存占用。
* 🔧 若需响应式宽度（平板/小窗口友好），显式设置 responsive。
* 🚫 隐藏对话框时，**优先使用 hidden 而非 v-if**（仅在完全不需要时才用 v-if 销毁）。

## 依赖

* Element Plus - Dialog
* 项目内类：@/class/VisibleEntity
* 项目内组合式函数：@/composables/useDevice（响应式时使用）
