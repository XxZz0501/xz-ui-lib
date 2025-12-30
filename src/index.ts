// Components
export { default as MyButton } from './components/MyButton/index';

// Composables
export * from './composables';

// Utils
export * from './utils';

// Install function
import type { App } from 'vue';
import MyButton from './components/MyButton/index';

const components = [MyButton];

export function install(app: App) {
  components.forEach(comp => {
    app.component(comp.name || comp.displayName || 'AnonymousComponent', comp);
  });
}

export default { install };