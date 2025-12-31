// scripts/build-docs-components.mjs
import vueComponentMeta from 'vue-component-meta'
const { createComponentMetaChecker } = vueComponentMeta

import { globSync } from 'glob'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname, basename } from 'node:path'

const checker = createComponentMetaChecker(process.cwd(), {
    forceUseTs: true,
    schema: 'vue3'
})

const vueFiles = globSync('src/components/TestComp/index.vue')

for (const vuePath of vueFiles) {
    try {
        console.log('TestComp meta111:')
        // 👇 关键：转为 POSIX 路径
        const posixPath = vuePath.replace(/\\/g, '/')
        console.log('posixPath:' + posixPath)
        const meta = checker.getComponentMeta(posixPath)
        console.log('TestComp meta:', meta)

        if (!meta) {
            console.warn(`⚠️ 无法解析: ${vuePath}`)
            continue
        }

        const componentDir = dirname(vuePath)
        const componentName = pascalToKebab(basename(componentDir))
        const outDir = resolve('docs/components', componentName)
        if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

        // 提取 description（来自顶部注释）
        const description = meta.description || '暂无描述'

        // 提取 props
        const propsTable = Object.entries(meta.props || {}).map(([name, prop]) => {
            return `| \`${name}\` | \`${prop.type}\` | ${prop.default ? `\`${prop.default}\`` : '-'} | ${prop.description || '-'} |`
        }).join('\n') || '暂无'

        // 类似处理 emits, slots...

        const md = `# ${componentName}\n\n## 介绍\n${description}\n\n## Props\n| 名称 | 类型 | 默认值 | 说明 |\n|------|------|--------|------|\n${propsTable}`
        writeFileSync(resolve(outDir, 'index.md'), md)
        console.log(`✅ ${componentName}`)

    } catch (err) {
        console.error(`❌ ${vuePath}:`, err.message)
    }
}

function pascalToKebab(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}