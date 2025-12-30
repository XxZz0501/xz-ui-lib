# 📚 xz-ui-lib 项目维护手册

> 本手册适用于：
>
> *   工具函数库（Utils）
> *   Vue 3 Composables
> *   基于 VitePress 的文档系统
> *   GitHub Pages 部署

## 🗂️ 项目结构概览

```markdown
xz-ui-lib/
├── src/
│   ├── utils/          # 工具函数（如 date.ts）
│   └── composables/    # 组合式函数（如 useCrudTable.ts）
├── docs/               # VitePress 文档源码
│   ├── api/            # 自动生成的 API 文档（经脚本美化）
│   └── .vitepress/
│       └── config.js   # VitePress 配置
├── scripts/
│   └── post-process-api.mjs  # API 文档后处理脚本
├── package.json
└── README.md
```

## 🛠️ 一、开发流程

### 1. 编写工具函数（Utils）

*   路径：`src/utils/date.ts`
*   导出命名空间（如 `xzDate`）：

    ```typescript
    export const xzDate = {
      addDays(date: Date, days: number): Date { /* ... */ },
      // ...
    }
    ```

### 2. 编写 Composables

*   路径：`src/composables/useXxx.ts`
*   使用 Composition API（`ref`, `computed`, `onMounted` 等）
*   提供完整 TypeScript 类型

### 3. 主入口导出

```typescript
// src/index.ts
export * from './utils'
export * from './composables'
```

## 📖 二、生成与美化 API 文档

### 步骤 1：用 TypeDoc 生成原始 Markdown（可选）

```bash
npx typedoc --out docs/api src/index.ts
```

> 若你手写 `.md` 或使用其他方式生成 API 文档，可跳过此步。

### 步骤 2：运行后处理脚本（美化 + 侧边栏支持）

```bash
node scripts/post-process-api.mjs
```

✅ **该脚本会：**

*   将 `### methodName()` 转为美观的函数卡片
*   自动提取参数、返回值、示例
*   **在每个方法前插入 `#### methodName`**，确保出现在 VitePress “On this page” 侧边栏中

> 💡 脚本位置：`scripts/post-process-api.mjs`（请保留！）

## 🏗️ 三、本地预览文档

```bash
npm run docs:dev
```

访问：http\://localhost:1000/

> ✅ 确保 `docs/.vitepress/config.js` 中配置了正确的导航菜单。

## 📦 四、构建静态文档

```bash
npm run docs:build
```

输出目录：`docs/.vitepress/dist/`

> ⚠️ **关键配置**：\
> 在 `docs/.vitepress/config.js` 中设置 `base` 路径（必须与 GitHub 仓库名一致）：

```typescript
// docs/.vitepress/config.js
export default {
  base: '/你的仓库名/', // ← 例如：'/xz-ui-lib/'
  // 其他配置...
}
```

## 🌐 五、部署到 GitHub Pages

### 使用 `gh-pages`（独立分支）

#### 1. 安装依赖

```bash
npm install -D gh-pages
```

#### 2. 添加脚本（`package.json`）

```json
{
  "scripts": {
    "docs:build": "vitepress build docs",
    "docs:deploy": "gh-pages -d docs/.vitepress/dist"
  }
}
```

#### 3. 部署

```bash
npm run docs:build
npm run docs:deploy
```

#### 4. 访问地址

```bash
https://<你的 GitHub 用户名>.github.io/你的仓库名/
```

> ✅ GitHub 会自动从 `gh-pages` 分支提供服务。
>
> <https://xxzz0501.github.io/xz-ui-lib/>

## 🧪 六、常见问题排查

| 问题                            | 解决方案                                                    |
| :---------------------------- | :------------------------------------------------------ |
| **打包后无样式 / 资源 404**           | 检查 `base` 是否与 GitHub 仓库名完全一致（区分大小写，带前后 `/`）             |
| **函数未出现在右侧“On this page”侧边栏** | 确保 `post-process-api.mjs` 脚本在每个方法前插入了 `#### methodName` |
| **本地双击 HTML 无样式**             | 不要双击打开！用 `npx serve -s docs/.vitepress/dist` 预览         |
| **TypeScript 报错**             | 确保 `tsconfig.json` 包含 `src/` 和 `docs/`                  |

## 📝 七、发布到 npm（可选）

```bash
npm login
npm publish
```

> ✅ 确保 `package.json` 中包含正确字段（需先配置构建工具如 `vite` 或 `unbuild`）：

```json
{
  "name": "xz-ui-lib",
  "files": ["dist"],
  "main": "dist/xz-ui-lib.umd.cjs",
  "module": "dist/xz-ui-lib.js",
  "types": "dist/index.d.ts"
}
```

## 🔁 八、日常维护命令速查

| 命令                                  | 作用               |
| :---------------------------------- | :--------------- |
| `npm run docs:dev`                  | 本地开发文档           |
| `npm run docs:build`                | 构建静态站点           |
| `npm run docs:deploy`               | 部署到 GitHub Pages |
| `node scripts/post-process-api.mjs` | 美化 API 文档        |
| `npm test`                          | 运行单元测试（如有）       |

## 📎 附：关键文件清单（请勿删除）

| 文件                             | 用途                |
| :----------------------------- | :---------------- |
| `scripts/post-process-api.mjs` | API 文档美化核心脚本      |
| `docs/.vitepress/config.js`    | 文档配置（含 `base` 路径） |
| `src/index.ts`                 | 库主入口              |
| `package.json`                 | 包含所有脚本命令          |

> 更新文档只需：`npm run docs:build && npm run docs:deploy`