// scripts/post-process-api.mjs
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { readdirSync, statSync } from 'fs';

function getAllMdFiles(dir, fileList = []) {
    const entries = readdirSync(dir);
    for (const entry of entries) {
        const fullPath = resolve(dir, entry);
        const stats = statSync(fullPath);

        if (stats.isDirectory()) {
            getAllMdFiles(fullPath, fileList);
        } else if (entry.endsWith('.md') && entry !== 'modules.md') {
            fileList.push(fullPath);
        }
    }
    return fileList;
}

const API_DIR = resolve(process.cwd(), 'docs/api');
const mdFiles = getAllMdFiles(API_DIR);

if (mdFiles.length === 0) {
    console.warn('⚠️ 未找到任何 API 文档文件');
    process.exit(0);
}

console.log('✨ 开始美化以下文件：');
mdFiles.forEach(f => console.log('  -', f.replace(API_DIR + /[\\/]/.source, '')));

for (const filePath of mdFiles) {
    let content = readFileSync(filePath, 'utf8');

    // === Step 1: 重写主标题 ===
    content = content.replace(/^# (Variable|Function|Module): (.+)$/m, '# $2');

    // === Step 2: 按 "### methodName()" 分割方法区块 ===
    const methodBlocks = content.split(/(?:\r?\n)(?=### [a-zA-Z_$])/);

    if (methodBlocks.length <= 1) {
        writeFileSync(filePath, content, 'utf8');
        continue;
    }

    const overview = methodBlocks[0].trim();
    const processedMethods = [];

    for (let i = 1; i < methodBlocks.length; i++) {
        const block = methodBlocks[i];
        if (!block.trim()) continue;

        // 提取方法名：### addDays() → addDays
        const nameMatch = block.match(/^### ([a-zA-Z_$][\w$]*)\(/);
        if (!nameMatch) {
            processedMethods.push(block);
            continue;
        }
        const methodName = nameMatch[1];

        // 提取签名：从 > **addDays**(...) 行
        let signature = `${methodName}(...)`;
        const signatureMatch = block.match(/> \*\*${methodName}\*\*\(.*\):.*`[^`]+`/);
        if (signatureMatch) {
            // 转换为 ts 风格：addDays(date, days): Date
            let sig = signatureMatch[0]
                .replace(/^> \*\*/, '')
                .replace(/\*\*$/, '')
                .replace(/`/g, '');
            signature = sig;
        }

        // 按行处理，提取描述、参数、返回值、示例
        const lines = block.split('\n');
        let desc = '';
        let params = [];
        let returns = '';
        let example = '';
        let currentSection = 'desc';
        let currentParamName = '';
        let currentParamType = '';
        let currentParamDesc = '';

        for (let line of lines) {
            const trimmed = line.trim();

            // 检测章节
            if (trimmed.startsWith('#### Parameters')) {
                currentSection = 'params';
                continue;
            } else if (trimmed.startsWith('#### Returns')) {
                currentSection = 'returns';
                continue;
            } else if (trimmed.startsWith('#### Example')) {
                currentSection = 'example';
                example = ''; // 准备收集代码
                continue;
            }

            if (currentSection === 'desc') {
                // 描述在方法标题之后、Parameters 之前
                if (
                    !trimmed.startsWith('###') &&
                    !trimmed.startsWith('>') &&
                    !trimmed.startsWith('####') &&
                    trimmed &&
                    !trimmed.startsWith('[**') // 忽略顶部链接
                ) {
                    desc += trimmed + '\n';
                }
            } else if (currentSection === 'params') {
                if (trimmed.startsWith('##### ')) {
                    // 新参数开始
                    if (currentParamName) {
                        // 保存上一个参数
                        params.push({
                            name: currentParamName,
                            type: currentParamType || 'unknown',
                            desc: currentParamDesc.trim() || '-'
                        });
                    }
                    currentParamName = trimmed.replace('##### ', '');
                    currentParamType = '';
                    currentParamDesc = '';
                } else if (trimmed.startsWith('`') && trimmed.endsWith('`')) {
                    // 类型行
                    currentParamType = trimmed.replace(/`/g, '');
                } else if (trimmed && !trimmed.startsWith('#')) {
                    // 描述行
                    currentParamDesc += trimmed + ' ';
                }
            } else if (currentSection === 'returns') {
                if (trimmed.startsWith('`') && trimmed.endsWith('`')) {
                    returns = trimmed.replace(/`/g, '');
                }
            } else if (currentSection === 'example') {
                // 收集代码块内容（包括 ```ts ... ```）
                example += line + '\n';
            }
        }

        // 保存最后一个参数
        if (currentParamName) {
            params.push({
                name: currentParamName,
                type: currentParamType || 'unknown',
                desc: currentParamDesc.trim() || '-'
            });
        }

        desc = desc.trim();
        example = example.trim();

        // 构建参数表格
        let paramTable = '';
        if (params.length > 0) {
            paramTable = `
#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
`;
            for (const p of params) {
                paramTable += `| \`${p.name}\` | \`${p.type}\` | ${p.desc} |\n`;
            }
        }

        const returnBlock = returns ? `\n#### 返回值\n\n\`${returns}\`` : '';
        const exampleBlock = example ? `\n### 示例\n\n${example}` : '';

        const methodContent = `
## ${methodName}

\`\`\`ts
${signature}
\`\`\`

${desc}

${paramTable}
${returnBlock}
${exampleBlock}
`.trim();

        processedMethods.push(methodContent);
    }

    const finalContent = [overview, ...processedMethods].join('\n\n---\n\n');
    writeFileSync(filePath, finalContent, 'utf8');
}

console.log('✅ 所有 API 文档已成功美化！');