# ContentContainer 内容容器

提供标准化的页面布局结构，包含 **面包屑导航区、主内容区、底部按钮区**，内置加载状态与灵活布局模式，适用于表单页、详情页等典型业务场景。

## 何时使用

* 需要统一页面结构（导航 + 内容 + 操作）
* 表单提交页需固定操作按钮在底部
* 页面需要展示加载状态并自动隐藏非核心区域
* 希望通过插槽自由组合页面各区域内容

## 核心特性

* ✅ 内置 `v-loading` 加载遮罩
* ✅ 支持普通滚动与 Flex 弹性布局两种模式
* ✅ 三个语义化插槽：`breadcrumb` / `content` / `button`
* ✅ 自动处理内边距、滚动条与分隔线样式
* ✅ 支持透传所有 HTML 属性（如 `class`、`style`）

## API

### Props

| 参数        | 说明                                                   | 类型        | 默认值    |
| ----------- | ------------------------------------------------------ | ----------- | --------- |
| `isFlex`  | 是否启用 Flex 布局（内容区独立滚动，按钮区固定在底部） | `boolean` | `false` |
| `loading` | 是否显示加载状态                                       | `boolean` | `false` |

### Slots

| 名称           | 说明                                            | 示例                                                  |
| -------------- | ----------------------------------------------- | ----------------------------------------------------- |
| `breadcrumb` | 面包屑导航项（通常为 `<el-breadcrumb-item>`） | `<el-breadcrumb-item>用户管理</el-breadcrumb-item>` |
| `content`    | 主内容区域（如表单、表格、详情信息等）          | `<UserForm />`                                      |
| `button`     | 底部操作按钮区域（居中显示，带顶部边框）        | `<el-button type="primary">提交</el-button>`        |

### Attributes 透传

该组件支持透传所有原生 HTML 属性（如 `class`、`style`、`data-*` 等）至根元素：

```vue
<XzContentContainer class="my-page" style="padding: 0" />
```

## 注意事项

* 当 `loading=true` 时，**面包屑区域和按钮区域将自动隐藏**，仅显示加载遮罩。
* 启用 `isFlex=true` 后，内容区将获得独立滚动能力，适合内容高度不确定或较长的场景。
* 若不需要面包屑，可不传 `#breadcrumb` 插槽，区域将自动消失（无空白占位）。
* 所有未声明的属性（包括事件）均会透传至根 `<div>` 元素。

## 示例

### 基础用法（普通滚动）

```vue
<template>
  <XzContentContainer :loading="isLoading">
    <template #breadcrumb>
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </template>

    <template #content>
      <el-form>...</el-form>
    </template>

    <template #button>
      <el-button type="primary" @click="submit">保存</el-button>
    </template>
  </XzContentContainer>
</template>
```

### Flex 布局（按钮固定在底部）

```vue
<template>
  <XzContentContainer :is-flex="true" :loading="isLoading">
    <template #content>
      <!-- 高度不确定的长表单 -->
      <LongForm />
    </template>

    <template #button>
      <el-button type="primary">提交</el-button>
    </template>
  </XzContentContainer>
</template>
```

---

> 💡 提示：该组件不包含任何业务逻辑，仅为 UI 容器，建议与 `XzPagination`、`XzDrawer` 等组件搭配使用，构建完整页面。
