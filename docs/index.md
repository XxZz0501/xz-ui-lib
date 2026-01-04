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


## 💡 组合式函数（Composables）

### [`useCrudTable`](composables/useCrudTable/README.md)

封装 CRUD 表格逻辑，简化数据管理。

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
