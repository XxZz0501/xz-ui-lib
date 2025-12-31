// scripts/escape-md-types.mjs
import { globSync } from 'glob'
import { readFileSync, writeFileSync } from 'fs'

export function escapeMarkdownTypes(pattern) {
  const files = globSync(pattern)

  if (files.length === 0) {
    console.warn(`⚠️ 未找到匹配 "${pattern}" 的文件`)
    return
  }

  for (const file of files) {
    console.log("file:" + file)
    let content = readFileSync(file, 'utf8')

    // 只处理代码相关的行（避免误伤普通文本）
    // 将 `Promise<number>` → `Promise&lt;number&gt;`
    // 注意：只替换在反引号内的 < 和 >
    content = content.replace(/`([^`]*?)<([^`]*?)>/g, (match, before, after) => {
        return '`' + before + '&lt;' + after + '&gt;' + '`'
    })

    // 也可以全局安全替换（如果上述不够）
    // content = content.replace(/</g, '&lt;').replace(/>/g, '&gt;')

    writeFileSync(file, content)
    console.log('✅ Escaped types in:', file)
}
}

if (typeof process !== 'undefined' && import.meta.url === `file://${process.argv[1]}`) {
  const pattern = process.argv[2]
  if (!pattern) {
    console.error('❌ 用法: node escape-md-types.mjs "<glob-pattern>"')
    process.exit(1)
  }
  escapeMarkdownTypes(pattern)
}