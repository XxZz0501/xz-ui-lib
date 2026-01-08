# xz-ui-lib

> 🌟 一个轻量级 Vue 3 组件库，包含表格、分页、工具函数和组合式逻辑，适用于企业级中后台项目。

[![npm version](https://img.shields.io/npm/v/@xxzz/xz-ui-lib)](https://www.npmjs.com/package/@xxzz/xz-ui-lib)

[![npm downloads](https://img.shields.io/npm/dt/@xxzz/xz-ui-lib)](https://www.npmjs.com/package/@xxzz/xz-ui-lib)

[![GitHub issues](https://img.shields.io/github/issues/XxZz0501/xz-ui-lib)](https://github.com/XxZz0501/xz-ui-lib/issues)

---

## 🚀 快速开始

### 1. 安装

```bash
npm install @xxzz/xz-ui-lib
```


### 2. 全局注册（推荐）

```
import { createApp } from 'vue'
import App from './App.vue'
import { install } from '@xxzz/xz-ui-lib'
import '@xxzz/xz-ui-lib/style.css'

const app = createApp(App)
install(app as any)
app.mount('#app')
```


### 3. 按需引入（可选）

```
import { XzTable, XzPagination } from '@xxzz/xz-ui-lib'
import { useCrudTable } from '@xxzz/xz-ui-lib'
import { xzDate } from '@xxzz/xz-ui-lib'
```


## 📦 库结构概览

本库分为四大模块：

| 模块                     | 用途       | 示例                                        |
| ------------------------ | ---------- | ------------------------------------------- |
| 🔧**Utils**        | 工具函数   | `formatDate`, `scrollTo`, `formRules` |
| 🧱**Class**        | 数据类     | `VisibleEntity`, `Table`                |
| 🖼️**Components** | UI 组件    | `XzTable`, `XzPagination`               |
| 💡**Composables**  | 组合式函数 | `useCrudTable`, `useRequest`            |


## 🚀 更新日志 (Changelog)

本页面记录了 **xz-ui-lib** 的所有版本更新内容，按时间倒序排列。

### v1.0.2 (当前版本)

#### 新增功能
- **components**
  - 新增 `XzDrawer` 抽屉组件（属性透传、响应式宽度、可选自动聚焦、延迟关闭回调）
  - 新增 `XzModal` 对话框组件（属性透传、响应式宽度、延迟关闭回调）
  - `XzTable` 与 `XzPagination` 支持完整属性透传（所有 Element Plus 原生属性均可直接使用）
  - `XzTable` + `XzPagination` 组合使用时，执行搜索或分页后自动滚动至表格顶部

- **composables**
  - 新增 `useDevice` 组合式函数，提供全库统一的响应式设备判断（mobile / tablet / desktop），为未来响应式增强预留统一入口

#### 改进
- 所有组件文档风格统一，代码示例采用 template + script 分离形式，确保 VitePress 文档零报错稳定运行

### v1.0.1

#### 修复
- **components**
  - 修复 `XzTable` 在某些查询条件下出现异常的问题
  - 持续完善组件稳定性与类型定义

### v1.0.0 (初始发布)

#### 新增功能
- **class**
  - 新增 `VisibleEntity` 类：统一管理抽屉、对话框等模态组件的显隐状态，支持 `open()` / `close()` / `visible` 响应式控制
  - 新增表格相关类（内部使用）

- **utils**
  - 新增 `object` 模块：对象操作工具函数
  - 新增 `ui` 模块：UI 相关通用工具
  - 新增 `scroll-to` 模块：平滑滚动工具（支持滚动到元素顶部）
  - 新增 `date` 模块：日期处理工具
  - 新增 `formRules` 模块：常用表单校验规则

- **components**
  - 新增 `XzTable` 表格组件（高度封装，支持搜索、分页联动、属性透传）
  - 新增 `XzPagination` 分页组件（响应式 pagerCount、自动滚动、属性透传、v-model 支持）

- **composables**
  - 新增 `useCrudTable` 组合式函数：快速实现 CRUD 表格常用逻辑（搜索、重置、分页、加载状态等）

#### 项目基础
- 完成组件库基础架构搭建
- 支持按需导入与全局注册
- TypeScript 全覆盖，提供完整类型提示
- 文档站点基于 VitePress 搭建

---

感谢您使用 **xz-ui-lib**！  
我们会持续迭代，专注于后台管理系统的高效、稳定、易用组件。如果您有任何建议或问题，欢迎提交 Issue 或 PR。


## 🧰 工具函数（Utils）

提供常用业务辅助函数。

### [`date.ts`](api/date/README.md)


### [`formRules.ts`](api/formRules/README.md)


### [`object.ts`](api/object/README.md)


### [`scroll-to.ts`](api/scroll-to/README.md)


### [`ui.ts`](api/ui/README.md)



## 🧱 类（Class）

封装通用数据模型和行为。

### [`table.ts`](class/table/README.md)


### [`visible.ts`](class/visible/README.md)


## 🖼️ 组件（Components）

### [`XzTable`](components/table.md)

一个功能完整的表格组件，支持分页、筛选、排序等。

### [`XzPagination`](components/pagination.md)

独立的分页组件，可与 `XzTable` 配合使用。

### [`XzDrawer`](components/drawer.md)

抽屉组件

### [`XzModal`](components/modal.md)

弹窗组件

### [`XzContentContainer`](components/contentContainer.md)

提供标准化的页面布局结构，包含 **面包屑导航区、主内容区、底部按钮区**，内置加载状态与灵活布局模式，适用于表单页、详情页等典型业务场景。


## 💡 组合式函数（Composables）

### [`useCrudTable`](composables/useCrudTable/README.md)

封装 CRUD 表格逻辑，简化数据管理。

### [`useDevice`](composables/useDevice/README.md)

封装设备大小获取逻辑。

## 📁 目录结构

```
src/
├── class/
│   ├── visible.ts
│   └── table.ts
├── components/
│   ├── XzTable/
│   │   ├── index.vue
│   │   └── index.ts
│   └── XzPagination/
│       ├── index.vue
│       └── index.ts
├── composables/
│   ├── useCrudTable.ts
│   └── useRequest.ts
└── utils/
    ├── date.ts
    ├── formRules.ts
    ├── object.ts
    ├── scroll-to.ts
    └── ui.ts
```


## 📂 导出方式

所有模块均通过 `index.ts` 聚合导出，支持按需引入：

```
// 组件
import { XzTable } from '@xxzz/xz-ui-lib'

// 组合式函数
import { useCrudTable } from '@xxzz/xz-ui-lib'

// 工具函数
import { xzDate } from '@xxzz/xz-ui-lib'

// 类
import { VisibleEntity } from '@xxzz/xz-ui-lib'
```


## 📈 发展计划

* ✅ 支持 TypeScript
* ✅ 支持 Vite + Vue 3
* ✅ 提供完整文档和示例
* ✅ 推出更多组件（如 Form、Modal）

## 🎯 特点总结

| 特性       | 是否支持 |
| ---------- | -------- |
| Vue 3 + TS | ✅       |
| 按需引入   | ✅       |
| 类型安全   | ✅       |
| 模块化设计 | ✅       |
| 可扩展     | ✅       |
| 文档齐全   | ✅       |
