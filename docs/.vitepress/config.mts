import { defineConfig } from 'vitepress'
import { resolve } from 'node:path'

// 获取项目根目录（docs 的上一级）
const root = resolve(__dirname, '..')
const srcDir = resolve(root, '../src') // 假设 src 和 docs 同级

export default defineConfig({
  base: '/xz-ui-lib/',
  title: "XZ UI",
  description: "Vue 3 组件库",

  // 开启 Vue 特性（如 <script setup>）
  vue: {
    include: [/\.vue$/, /\.md$/],
  },

  // 配置 Vite（用于解析你的源码）
  vite: {
    resolve: {
      alias: {
        // 让文档中能直接 import 'xz-ui-lib'
        'xz-ui-lib': srcDir,
      },
    },
    // 如果你的组件用了 SCSS/Tailwind，可能需要额外配置
  },

  // 主题配置
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: 'API', link: '/api/README' },
      { text: 'Composables', link: '/composables/' },
      { text: '组件', link: '/components/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '介绍', link: '/guide/introduction' },
          ],
        },
      ],
      '/api/': [
        {
          text: '工具函数 API',
          items: [
            { text: '日期工具 (xzDate)', link: '/api/date/variables/xzDate' },
            { text: '表单规则 (xzFormRules)', link: '/api/formRules/variables/xzFormRules' },
            { text: '对象 (xzObject)', link: '/api/object/variables/xzObject' },
            { text: 'ui (xzUi)', link: '/api/ui/README' },
            { text: '滚动 (xzScroll)', link: '/api/scroll-to/variables/scroll' },
          ],
        },
      ],
      '/composables/': [
        {
          text: '组合式函数',
          items: [
            { text: '概览', link: '/composables/' },
            // 后续添加具体 composable
          ],
        },
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            { text: '概览', link: '/components/' },
            // 后续添加具体组件
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/XxZz0501/xz-ui-lib' },
    ],
  },
})