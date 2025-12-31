// scripts/build-docs-class.mjs
import { execSync } from 'child_process'
import { escapeMarkdownTypes } from './escape-md-types.mjs'

console.log('📦 正在生成 class 文档...')

execSync('npx typedoc --options typedoc.class.json', {
  stdio: 'inherit'
})

console.log('🎨 正在处理HTML标签的 Markdown...')
escapeMarkdownTypes('docs/class/**/*.md')

console.log('✅ class 文档生成完成！')