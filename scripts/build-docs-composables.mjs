// scripts/build-docs-composables.mjs
import { execSync } from 'child_process'
import { escapeMarkdownTypes } from './escape-md-types.mjs'

console.log('📦 正在生成 composables 文档...')

execSync('npx typedoc --options typedoc.composables.json', {
  stdio: 'inherit'
})

console.log('🎨 正在处理HTML标签的 Markdown...')
escapeMarkdownTypes('docs/composables/**/*.md')

console.log('✅ composables 文档生成完成！')