# Drawer 抽屉组件

## 介绍

封装 Element Plus 的 `<el-drawer>`，提供 **属性透传、响应式宽度、自动聚焦、延迟关闭回调** 等增强功能。
与 `XzModal`、`XzPagination` 等组件保持完全一致的风格与体验，适用于后台系统的详情查看、复杂表单编辑、操作侧边栏等场景。

该组件通过 `inject(VisibleEntity)` 统一管理显隐状态，推荐配合外层 `v-if="visibleEntity.visible"` 使用，确保关闭动画流畅并及时销毁内容。

## 核心特性

- ✅ 通过 `VisibleEntity` 统一控制显隐，支持多次打开/关闭
- ✅ 完整属性透传（`title`、`size`、`direction`、`destroy-on-close`、`modal` 等全支持）
- ✅ 可选响应式宽度（`responsive` 开启后，小屏幕下固定 px 自动转为 90%）
- ✅ 默认提供 `header`、`body`、`footer` 插槽与可选“关闭”按钮（`hideDefaultClose`）
- ✅ 关闭动画结束后延迟 150ms 调用 `VisibleEntity.close()`，完美兼容外层 `v-if` 销毁
- ✅ 打开后自动聚焦内容区域（提升键盘可访问性）
- ✅ 支持 `hidden` 属性完全隐藏（与 Modal、Pagination 一致）

## 基础用法

```vue
<template>
  <!-- 推荐使用 v-if 控制挂载 -->
  <XzDrawer
    v-if="drawerVisibleEntity.visible"
    title="用户详情"
    size="1000px"
    direction="rtl"
    :destroy-on-close="true"
  >
    <template #body>
      <div class="detail-info">
        <p><strong>姓名：</strong>张三</p>
        <p><strong>部门：</strong>技术部</p>
        <p><strong>入职时间：</strong>2023-01-01</p>
        <!-- 更多详情内容 -->
      </div>
    </template>

    <template #footer>
      <el-button @click="editUser">编辑</el-button>
      <el-button type="primary" @click="drawerVisibleEntity.close()">关闭</el-button>
    </template>
  </XzDrawer>
</template>

<script setup lang="ts">
import { VisibleEntity } from '@/class'

const drawerVisibleEntity = new VisibleEntity()

provide('visibleEntity', drawerVisibleEntity)

function openDrawer() {
  drawerVisibleEntity.open()
}
</script>
```


## Props

| 名称             | 类型    | 默认值          | 说明                                                   |
| ---------------- | ------- | --------------- | ------------------------------------------------------ |
| name             | string  | "visibleEntity" | inject 的 key，用于获取VisibleEntity实例，可自定义     |
| hideDefaultClose | boolean | false           | 是否隐藏默认的“关闭”按钮（自定义 footer 时建议开启） |
| hidden           | boolean | false           | 是否完全隐藏抽屉（使用v-show，不销毁 DOM）             |
| autoFocus        | boolean | true            | 打开后是否自动聚焦内容区域（提升键盘可访问性）         |
| responsive       | boolean | false           | 是否开启响应式宽度（小屏幕下固定 px 值自动转为 90%）   |

> 所有 Element Plus 原生属性（如 title、size、direction、modal、destroy-on-close、close-on-press-escape 等）均通过属性透传直接使用。

## Events

* 无自定义事件。所有原生事件（如 open、close、closed）均通过 \$attrs 透传给 `<el-drawer>`。

## 注意事项

* ⚠️ **必须配合 VisibleEntity 使用**，并在外层使用 v-if="visibleEntity.visible" 控制组件挂载。
* ⚠️ 推荐透传 :destroy-on-close="true"，配合 v-if 实现内容彻底销毁。
* 🔧 若需响应式宽度（平板场景友好），显式设置 responsive。
* 🚫 隐藏抽屉时，**优先使用 hidden 而非 v-if**（仅在完全不需要时才用 v-if 销毁）。

## 依赖

* Element Plus - Drawer
* 项目内类：@/class/VisibleEntity
* 项目内组合式函数：@/composables/useDevice（响应式时使用）
