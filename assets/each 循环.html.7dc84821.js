import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{i as s}from"./app.e49371f8.js";const a={},p=s(`<h2 id="classify-\u5206\u7C7B" tabindex="-1"><a class="header-anchor" href="#classify-\u5206\u7C7B" aria-hidden="true">#</a> classify \u5206\u7C7B</h2><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">LessonScoreItem</span> <span class="token punctuation">{</span>
  dimension_id<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token comment">//\u4E3B\u7EF4\u5EA6ID</span>
  dimension_name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token comment">//\u4E3B\u7EF4\u5EA6</span>
  dimension_item_id<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token comment">//\u7EF4\u5EA6\u5B50\u9879 \uFF0C0 \u65F6\u4E3A\u4E3B\u7EF4\u5EA6ID</span>
  score<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token comment">//\u6253\u5206\uFF0CdimensionitemId = 0\uFF0C\u8BB0\u5F55\u5E73\u5747\u5206</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> scoreList <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    dimension_id<span class="token operator">:</span> <span class="token string">&#39;593&#39;</span><span class="token punctuation">,</span>
    dimension_name<span class="token operator">:</span> <span class="token string">&#39;\u5B66\u751F\u5B66\u4E60&#39;</span><span class="token punctuation">,</span>
    score<span class="token operator">:</span> <span class="token string">&#39;25&#39;</span><span class="token punctuation">,</span>
    sii<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    weight<span class="token operator">:</span> <span class="token string">&#39;25&#39;</span><span class="token punctuation">,</span>
    mun<span class="token operator">:</span> <span class="token string">&#39;0&#39;</span><span class="token punctuation">,</span>
    dimension_item_id<span class="token operator">:</span> <span class="token string">&#39;2223&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    dimension_id<span class="token operator">:</span> <span class="token string">&#39;593&#39;</span><span class="token punctuation">,</span>
    dimension_name<span class="token operator">:</span> <span class="token string">&#39;\u5B66\u751F\u5B66\u4E60&#39;</span><span class="token punctuation">,</span>
    score<span class="token operator">:</span> <span class="token string">&#39;25&#39;</span><span class="token punctuation">,</span>
    sii<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    weight<span class="token operator">:</span> <span class="token string">&#39;25&#39;</span><span class="token punctuation">,</span>
    mun<span class="token operator">:</span> <span class="token string">&#39;0&#39;</span><span class="token punctuation">,</span>
    dimension_item_id<span class="token operator">:</span> <span class="token string">&#39;2224&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    dimension_id<span class="token operator">:</span> <span class="token string">&#39;593&#39;</span><span class="token punctuation">,</span>
    dimension_name<span class="token operator">:</span> <span class="token string">&#39;\u5B66\u751F\u5B66\u4E60&#39;</span><span class="token punctuation">,</span>
    score<span class="token operator">:</span> <span class="token string">&#39;25&#39;</span><span class="token punctuation">,</span>
    sii<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    weight<span class="token operator">:</span> <span class="token string">&#39;25&#39;</span><span class="token punctuation">,</span>
    mun<span class="token operator">:</span> <span class="token string">&#39;0&#39;</span><span class="token punctuation">,</span>
    dimension_item_id<span class="token operator">:</span> <span class="token string">&#39;2226&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    dimension_id<span class="token operator">:</span> <span class="token string">&#39;593&#39;</span><span class="token punctuation">,</span>
    dimension_name<span class="token operator">:</span> <span class="token string">&#39;\u5B66\u751F\u5B66\u4E60&#39;</span><span class="token punctuation">,</span>
    score<span class="token operator">:</span> <span class="token string">&#39;25&#39;</span><span class="token punctuation">,</span>
    sii<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    weight<span class="token operator">:</span> <span class="token string">&#39;25&#39;</span><span class="token punctuation">,</span>
    mun<span class="token operator">:</span> <span class="token string">&#39;0&#39;</span><span class="token punctuation">,</span>
    dimension_item_id<span class="token operator">:</span> <span class="token string">&#39;2222&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    dimension_id<span class="token operator">:</span> <span class="token string">&#39;593&#39;</span><span class="token punctuation">,</span>
    dimension_name<span class="token operator">:</span> <span class="token string">&#39;\u5B66\u751F\u5B66\u4E60&#39;</span><span class="token punctuation">,</span>
    score<span class="token operator">:</span> <span class="token string">&#39;25&#39;</span><span class="token punctuation">,</span>
    sii<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    weight<span class="token operator">:</span> <span class="token string">&#39;25&#39;</span><span class="token punctuation">,</span>
    mun<span class="token operator">:</span> <span class="token string">&#39;0&#39;</span><span class="token punctuation">,</span>
    dimension_item_id<span class="token operator">:</span> <span class="token string">&#39;2225&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    dimension_id<span class="token operator">:</span> <span class="token string">&#39;595&#39;</span><span class="token punctuation">,</span>
    dimension_name<span class="token operator">:</span> <span class="token string">&#39;\u8BFE\u7A0B\u6027\u8D28&#39;</span><span class="token punctuation">,</span>
    score<span class="token operator">:</span> <span class="token string">&#39;25&#39;</span><span class="token punctuation">,</span>
    sii<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    weight<span class="token operator">:</span> <span class="token string">&#39;25&#39;</span><span class="token punctuation">,</span>
    mun<span class="token operator">:</span> <span class="token string">&#39;0&#39;</span><span class="token punctuation">,</span>
    dimension_item_id<span class="token operator">:</span> <span class="token string">&#39;2234&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    dimension_id<span class="token operator">:</span> <span class="token string">&#39;596&#39;</span><span class="token punctuation">,</span>
    dimension_name<span class="token operator">:</span> <span class="token string">&#39;\u8BFE\u5802\u6587\u5316&#39;</span><span class="token punctuation">,</span>
    score<span class="token operator">:</span> <span class="token string">&#39;25&#39;</span><span class="token punctuation">,</span>
    sii<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    weight<span class="token operator">:</span> <span class="token string">&#39;25&#39;</span><span class="token punctuation">,</span>
    mun<span class="token operator">:</span> <span class="token string">&#39;0&#39;</span><span class="token punctuation">,</span>
    dimension_item_id<span class="token operator">:</span> <span class="token string">&#39;2239&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>

<span class="token keyword">type</span> <span class="token class-name">PointList</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span>
  children<span class="token operator">:</span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token builtin">string</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token keyword">let</span> newList<span class="token operator">:</span> PointList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token generic-function"><span class="token function">classify</span><span class="token generic class-name"><span class="token operator">&lt;</span>LessonScoreItem<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
  scoreList<span class="token punctuation">,</span>
  <span class="token string">&#39;dimension_id&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> children <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    newList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      name<span class="token operator">:</span> item<span class="token punctuation">.</span>dimension_name<span class="token punctuation">,</span>
      children<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> children
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      type<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
      name<span class="token operator">:</span> item<span class="token punctuation">.</span>dimension_item_id<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function t(e,i){return p}var l=n(a,[["render",t],["__file","each \u5FAA\u73AF.html.vue"]]);export{l as default};
