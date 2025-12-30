import{_ as s,c as i,o as e,ae as t}from"./chunks/framework.CDjunVez.js";const c=JSON.parse('{"title":"xzDate","description":"","frontmatter":{},"headers":[],"relativePath":"api/date/variables/xzDate.md","filePath":"api/date/variables/xzDate.md"}'),n={name:"api/date/variables/xzDate.md"};function h(l,a,p,d,r,k){return e(),i("div",null,[...a[0]||(a[0]=[t(`<p><a href="./../../README.html"><strong>xz-ui-lib</strong></a></p><hr><h1 id="xzdate" tabindex="-1">xzDate <a class="header-anchor" href="#xzdate" aria-label="Permalink to &quot;xzDate&quot;">​</a></h1><blockquote><p><code>const</code> <strong>xzDate</strong>: <code>object</code></p></blockquote><p>日期工具函数集合</p><p>提供常用日期格式化、计算、判断等实用方法。 所有方法均支持 <code>Date</code> 对象或时间戳（number）作为输入。</p><h2 id="type-declaration" tabindex="-1">Type Declaration <a class="header-anchor" href="#type-declaration" aria-label="Permalink to &quot;Type Declaration&quot;">​</a></h2><hr><h2 id="adddays" tabindex="-1">addDays <a class="header-anchor" href="#adddays" aria-label="Permalink to &quot;addDays&quot;">​</a></h2><pre><code>        \`\`\`ts
        addDays(...)
        \`\`\`

        在指定日期上增加/减少天数

        
            #### 参数

            | 名称 | 类型 | 说明 |
            |------|------|------|
            | \`date\` | \`Date\` | 原始日期 |
</code></pre><p>| <code>days</code> | <code>number</code> | 要增加的天数（可为负数） |</p><h4 id="返回值" tabindex="-1">返回值 <a class="header-anchor" href="#返回值" aria-label="Permalink to &quot;返回值&quot;">​</a></h4><p><code>Date</code></p><h3 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> tomorrow</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> xzDate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addDays</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> yesterday</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> xzDate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addDays</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><hr><h2 id="calculatedaysbetweendates" tabindex="-1">calculateDaysBetweenDates <a class="header-anchor" href="#calculatedaysbetweendates" aria-label="Permalink to &quot;calculateDaysBetweenDates&quot;">​</a></h2><pre><code>        \`\`\`ts
        calculateDaysBetweenDates(...)
        \`\`\`

        计算两个日期之间的天数差（endDate - startDate）

        
            #### 参数

            | 名称 | 类型 | 说明 |
            |------|------|------|
            | \`startDate\` | \`string | Date\` | 开始日期（字符串或 Date） |
</code></pre><p>| <code>endDate</code> | <code>string | Date</code> | 结束日期（字符串或 Date） |</p><h4 id="返回值-1" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-1" aria-label="Permalink to &quot;返回值&quot;">​</a></h4><p><code>number</code></p><h3 id="示例-1" tabindex="-1">示例 <a class="header-anchor" href="#示例-1" aria-label="Permalink to &quot;示例&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">xzDate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">calculateDaysBetweenDates</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;2024-01-01&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;2024-12-31&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 365</span></span></code></pre></div><hr><h2 id="dateformatmax" tabindex="-1">dateFormatMax <a class="header-anchor" href="#dateformatmax" aria-label="Permalink to &quot;dateFormatMax&quot;">​</a></h2><pre><code>        \`\`\`ts
        dateFormatMax(...)
        \`\`\`

        格式化日期为 &#39;YYYY-MM-DD HH:mm:ss&#39;（最大精度）

        
            #### 参数

            | 名称 | 类型 | 说明 |
            |------|------|------|
            | \`date\` | \`number | Date\` | 日期对象或时间戳 |
</code></pre><h4 id="返回值-2" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-2" aria-label="Permalink to &quot;返回值&quot;">​</a></h4><p><code>string</code></p><h3 id="示例-2" tabindex="-1">示例 <a class="header-anchor" href="#示例-2" aria-label="Permalink to &quot;示例&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">xzDate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dateFormatMax</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &quot;2024-12-30 15:30:45&quot;</span></span></code></pre></div><hr><h2 id="dateformatnow" tabindex="-1">dateFormatNow <a class="header-anchor" href="#dateformatnow" aria-label="Permalink to &quot;dateFormatNow&quot;">​</a></h2><pre><code>        \`\`\`ts
        dateFormatNow(...)
        \`\`\`

        获取当前时间的格式化字符串（&#39;YYYY-MM-DD HH:mm:ss&#39;）
</code></pre><h4 id="返回值-3" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-3" aria-label="Permalink to &quot;返回值&quot;">​</a></h4><p><code>string</code></p><h3 id="示例-3" tabindex="-1">示例 <a class="header-anchor" href="#示例-3" aria-label="Permalink to &quot;示例&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> now</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> xzDate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dateFormatNow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &quot;2024-12-30 15:30:45&quot;</span></span></code></pre></div><hr><h2 id="formatdate" tabindex="-1">formatDate <a class="header-anchor" href="#formatdate" aria-label="Permalink to &quot;formatDate&quot;">​</a></h2><pre><code>        \`\`\`ts
        formatDate(...)
        \`\`\`

        格式化日期为指定格式（简易版）
</code></pre><p>支持：&#39;YYYY-MM-DD&#39;, &#39;YYYY/MM/DD&#39;, &#39;MM-DD&#39;, &#39;HH:mm&#39; 等</p><pre><code>            #### 参数

            | 名称 | 类型 | 说明 |
            |------|------|------|
            | \`date\` | \`number | Date\` | 日期对象或时间戳 |
</code></pre><p>| <code>format</code> | <code>string = &#39;YYYY-MM-DD&#39;</code> | 格式字符串，默认 &#39;YYYY-MM-DD&#39; |</p><h4 id="返回值-4" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-4" aria-label="Permalink to &quot;返回值&quot;">​</a></h4><p><code>string</code></p><h3 id="示例-4" tabindex="-1">示例 <a class="header-anchor" href="#示例-4" aria-label="Permalink to &quot;示例&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">xzDate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">formatDate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;YYYY/MM/DD&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &quot;2024/12/30&quot;</span></span></code></pre></div><hr><h2 id="getweekrange" tabindex="-1">getWeekRange <a class="header-anchor" href="#getweekrange" aria-label="Permalink to &quot;getWeekRange&quot;">​</a></h2><pre><code>        \`\`\`ts
        getWeekRange(...)
        \`\`\`

        获取指定日期所在周的周一和周日（按中国习惯，周一为每周第一天）

        
            #### 参数

            | 名称 | 类型 | 说明 |
            |------|------|------|
            | \`date\` | \`number | Date\` | 日期对象或时间戳，默认为今天 |
</code></pre><h3 id="示例-5" tabindex="-1">示例 <a class="header-anchor" href="#示例-5" aria-label="Permalink to &quot;示例&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">mon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sun</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> xzDate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getWeekRange</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span></code></pre></div><hr><h2 id="isleapyear" tabindex="-1">isLeapYear <a class="header-anchor" href="#isleapyear" aria-label="Permalink to &quot;isLeapYear&quot;">​</a></h2><pre><code>        \`\`\`ts
        isLeapYear(...)
        \`\`\`

        判断是否为闰年

        
            #### 参数

            | 名称 | 类型 | 说明 |
            |------|------|------|
            | \`year\` | \`number\` | 年份（数字） |
</code></pre><h4 id="返回值-5" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-5" aria-label="Permalink to &quot;返回值&quot;">​</a></h4><p><code>boolean</code></p><h3 id="示例-6" tabindex="-1">示例 <a class="header-anchor" href="#示例-6" aria-label="Permalink to &quot;示例&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">xzDate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isLeapYear</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2024</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span></code></pre></div><hr><h2 id="istoday" tabindex="-1">isToday <a class="header-anchor" href="#istoday" aria-label="Permalink to &quot;isToday&quot;">​</a></h2><pre><code>        \`\`\`ts
        isToday(...)
        \`\`\`

        判断给定日期是否为今天

        
            #### 参数

            | 名称 | 类型 | 说明 |
            |------|------|------|
            | \`date\` | \`number | Date\` | 日期对象或时间戳 |
</code></pre><h4 id="返回值-6" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-6" aria-label="Permalink to &quot;返回值&quot;">​</a></h4><p><code>boolean</code></p><h3 id="示例-7" tabindex="-1">示例 <a class="header-anchor" href="#示例-7" aria-label="Permalink to &quot;示例&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">xzDate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isToday</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span></code></pre></div><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { xzDate } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;xz-ui-lib&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> nowStr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> xzDate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dateFormatNow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> days</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> xzDate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">calculateDaysBetweenDates</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;2024-01-01&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span></code></pre></div>`,68)])])}const g=s(n,[["render",h]]);export{c as __pageData,g as default};
