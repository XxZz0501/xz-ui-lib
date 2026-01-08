// src/index.ts
import type { App, Plugin } from 'vue'

const componentModules = import.meta.glob('./components/*/index.{vue,ts}', {
  eager: true,
})

const components = Object.values(componentModules)
  .map((mod: any) => mod.default)
  .filter((comp: any) => comp?.name)

// 自动注册到 Vue
const install: Plugin['install'] = (app: App) => {
  components.forEach((comp) => {
    app.component(comp.name, comp)
  })
}

// 显式导出（推荐手动维护，清晰可控）
export { default as XzTable } from './components/XzTable/index'
export { default as XzDrawer } from './components/XzDrawer/index'
export { default as XzModal } from './components/XzModal/index'
export { default as XzPagination } from './components/XzPagination/index'
export { default as XzContentContainer } from './components/XzContentContainer/index'

// 其他
export * from './composables'
export * from './utils'
export * from './class'

export { install }

export default { install }