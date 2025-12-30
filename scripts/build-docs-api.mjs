// scripts/build-docs-api.mjs
import { execSync } from 'child_process'

console.log('📦 正在生成 API 文档...')

execSync('npx typedoc', {
  stdio: 'inherit'
})

console.log('🎨 正在优化生成的 Markdown...')
await import('./post-process-api.mjs')

console.log('✅ API 文档生成完成！')