## 使用组件

```vue
// 全局注入
import ElementPlus from "element-plus"
import "@xxzz/xz-ui-lib/style.css";
import { install } from "@xxzz/xz-ui-lib";
app.use(ElementPlus);
install(app as any);

// 按需注入
<template>
  <XzButton type="primary">按钮</XzButton>
</template>

<script setup>
import { XzButton } from 'xz-ui-lib'
</script>
```

## 使用工具函数

```ts
import { xzDate } from 'xz-ui-lib'

const now = xzDate.dateFormatNow()
```

## 使用组合式函数

```ts
import { useFetch } from 'xz-ui-lib'

const { data } = useFetch('/api/user')
```

> 查看左侧导航，了解所有可用功能。
