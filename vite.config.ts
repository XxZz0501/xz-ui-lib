import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import path from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      cleanVueFileName: true,
      include: ['src'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 将 @ 指向 src 目录
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'XzUiLib',
      formats: ['es', 'cjs'],
      fileName: (format) => format === 'cjs' ? 'xz-ui-lib.cjs' : 'xz-ui-lib.js'
    },
    rollupOptions: {
      external: ['vue', 'element-plus'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        },
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'style.css';
          }
          return 'assets/[name].[hash][extname]';
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});