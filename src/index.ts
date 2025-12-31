// Components
export { default as XzTable } from './components/XzTable/index';
export { default as XzPagination } from './components/XzPagination/index';

// Composables
export * from './composables';

// Utils
export * from './utils';

// Install function
import type { App } from 'vue';
import XzTable from './components/XzTable/index';
import XzPagination from './components/XzPagination/index';

const components = [XzTable, XzPagination];

export function install(app: App) {
  components.forEach(comp => {
    app.component(comp.name || 'AnonymousComponent', comp);
  });
}

export default { install };