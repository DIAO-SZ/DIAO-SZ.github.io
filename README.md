## Hi there 👋

# <span data-lang="en">👨🏻‍🎓 Biography</span><span data-lang="zh" hidden>👨🏻‍🎓 个人简介</span>

<p data-lang="en">
  👋 Hi, I am currently an Assistant Researcher at the School of Artificial Intelligence, Nankai University. My research mainly focuses on 
 <strong><span style="color: #6F2C91;">flexible-structure robotic systems</span></strong> 
  (including pneumatic artificial muscle-actuated robots and flexible-joint robots), 
  with particular interests in hysteresis modeling, motion control, and compliant interaction.
I received the Ph.D. degree in Artificial Intelligence from 
 Nankai University
  in June 2026, under the supervision of Prof.  Ning Sun.
</p>
<p data-lang="zh" hidden>
我目前是南开大学人工智能学院的助理研究员，主要围绕 <span style="color: #6F2C91;"><strong>柔性结构机器人系统</strong></span>（包括气动人工肌肉机器人和柔性关节机器人）开展相关研究，涉及迟滞建模、运动控制和柔顺交互三个方面。

此前，我于2026年6月在南开大学</a>获得人工智能专业博士学位，师从孙宁教授。
</p>

<p data-lang="en">
  I have been awarded the inaugural 
  <strong>National Natural Science Foundation of China (NSFC) Youth Student Basic Research Project</strong> 
  (for Ph.D. students), and the inaugural 
  <strong>Young Elite Scientists Sponsorship Program (for Ph.D. Students) by China Association for Science and Technology (CAST)</strong>. 

  My research contributions have resulted in <strong>10+ publications</strong> 
  <a href="https://scholar.google.com/citations?hl=zh-CN&user=AggJ7NwAAAAJ">
    <img src="https://img.shields.io/endpoint?logo=Google%20Scholar&amp;url=https://raw.githubusercontent.com/DIAO-SZ/DIAO-SZ.github.io/google-scholar-stats/gs_data_shieldsio.json&amp;labelColor=f6f6f6&amp;color=9cf&amp;style=flat&amp;label=citations" 
         alt="Google Scholar citations">
  </a>
  in top journals, including <strong>IEEE Transactions</strong>. 

 I have also contributed to the research community as a reviewer for IEEE TIE, IEEE TSMCS, IEEE TCyber, IEEE RAL, IEEE Internet of Things Journal, Nonlinear Dynamics, ISA Transactions, ICRA, ACC, CDC, etc.
</p>
<p data-lang="zh" hidden>
  我作为<strong>项目负责人</strong>主持获批了<strong><span style="color: red;">国家自然科学基金</span>青年学生基础研究项目<span style="color: red;">（博士研究生）</span></strong>。目前，我已在包括 <strong>IEEE Transactions</strong> 在内的高水平期刊发表<strong>论文10余篇
  <a href='https://scholar.google.com/citations?user=g91ocA8AAAAJ'>
    <img src="https://img.shields.io/endpoint?logo=Google%20Scholar&amp;url=https://raw.githubusercontent.com/meng-zhai/meng-zhai.github.io/google-scholar-stats/gs_data_shieldsio.json&amp;labelColor=f6f6f6&amp;color=9cf&amp;style=flat&amp;label=citations" alt="Google Scholar citations">
  </a>
  </strong>。相关研究成果获得会议<strong>最佳论文奖/最佳张贴论文奖共5项</strong>，并先后获自主机器人技术研讨会奖学金提名奖（全球每年8名候选人）、博士研究生国家奖学金、比亚迪奖学金及其他奖励与荣誉。此外，我还担任 IEEE TIE、IEEE TSMCS、IEEE TCyber、IEEE RAL、IEEE Internet of Things Journal、Nonlinear Dynamics、ISA Transactions、ICRA、ACC、CDC 等期刊和会议的审稿人。
</p>

<p data-lang="en">
  I look forward to potential academic discussions and collaborations. Please feel free to contact me at
  <a href="mailto:tangshi2026@gmail.com">tangshi2026@gmail.com</a>.
</p>
<p data-lang="zh" hidden>
  我期待未来的学术交流与合作。随时欢迎通过 <a href="mailto:tangshi2026@gmail.com">tangshi2026@gmail.com</a> 与我联系。
</p>

### 📎 Homepages
- Personal Pages: https://meng-zhai.github.io (updated recently🔥)
- Google Scholar: https://scholar.google.com/citations?user=g91ocA8AAAAJ&hl

### <span data-lang="en">💬 Recent News</span><span data-lang="zh" hidden>💬 最新动态</span>

{% assign news_items = site.data.news | default: [] %}
{% assign news_count = news_items | size %}
{% assign limit = include.limit %}
{% if limit %}
  {% assign limit = limit | plus: 0 %}
  {% if limit > news_count %}
    {% assign limit = news_count %}
  {% elsif limit < 0 %}
    {% assign limit = 0 %}
  {% endif %}
{% else %}
  {% assign limit = news_count %}
{% endif %}

{% if limit > 0 %}
{% for item in news_items limit: limit %}
{% assign item_en = item.en | default: nil %}
{% assign item_zh = item.zh | default: nil %}
{% if item_en or item_zh %}
- {% if item_en %}<span data-lang="en">{{ item_en }}</span>{% endif %}{% if item_zh %}<span data-lang="zh"{% if item_en %} hidden{% endif %}>{{ item_zh }}</span>{% endif %}
{% else %}
- {{ item }}
{% endif %}
{% endfor %}
{: .news-list}
{% else %}
<p data-lang="en">No news items are available right now. Please check back later.</p>
<p data-lang="zh" hidden>暂无消息更新，欢迎稍后再来查看。</p>
{% endif %}

{% if include.show_button and limit < news_count %}
<!-- <p class="news-actions">
  <a class="btn" href="{{ '/news/' | relative_url }}">
    <span data-lang="en">-- Read More News --</span>
    <span data-lang="zh" hidden>-- 查看更多消息 --</span>
  </a>
</p> -->
{% endif %}

### <span data-lang="en">📚 Publications</span><span data-lang="zh" hidden>📚 论文列表</span>


<div class="publication-controls">
  <input
    type="search"
    id="publication-search"
    class="publication-search"
    placeholder="Search publications..."
    aria-label="Search publications"
    data-placeholder-en="Search publications..."
    data-placeholder-zh="搜索成果..."
    data-aria-label-en="Search publications"
    data-aria-label-zh="搜索成果"
  >
  <select id="publication-type-filter" data-label-en="Type" data-label-zh="类型">
    <option value="all">Type</option>
  </select>
  <select id="publication-year-filter" data-label-en="Date" data-label-zh="日期">
    <option value="all">Date</option>
  </select>
  <button
    type="button"
    id="publication-year-sort"
    class="publication-sort"
    aria-label="Sort by newest"
    data-aria-label-en="Sort by newest"
    data-aria-label-zh="按最新排序"
  >
    <svg
      class="publication-sort-icon"
      viewBox="0 0 1025 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M754.012 538a59.832 59.832 0 0 1 40.055 15.402c24.663 22.223 26.722 60.323 4.6 85.097L557.154 908.976a60.125 60.125 0 0 1-4.6 4.621c-24.661 22.223-62.587 20.154-84.709-4.62L226.332 638.498A60.418 60.418 0 0 1 211 598.261C211 564.98 237.857 538 270.987 538h483.025zM557.155 117.024L798.668 387.5A60.418 60.418 0 0 1 814 427.739C814 461.02 787.143 488 754.013 488H270.988a59.832 59.832 0 0 1-40.055-15.402c-24.663-22.223-26.722-60.323-4.6-85.097l241.513-270.477a60.125 60.125 0 0 1 4.6-4.621c24.661-22.223 62.587-20.154 84.709 4.62z"
        fill="currentColor"
      />
    </svg>
  </button>
</div>

<ol id="publication-list" class="publication-list"></ol>

{% assign publications = site.data.publications %}
<ul id="publication-source" class="publication-source" hidden>
  {% for pub in publications %}
  <li
    data-type="{{ pub.type }}"
    data-year="{{ pub.year }}"
    {% if pub.date %}data-date="{{ pub.date }}"{% endif %}
    {% if pub.citation_plain %}data-citation-plain="{{ pub.citation_plain | escape_once }}"{% endif %}
    {% if pub.citation_bibtex %}data-citation-bibtex="{{ pub.citation_bibtex | replace: '\n', '&#10;' | escape_once }}"{% endif %}
  >
    {{ pub.body_html | strip }}
    {% if pub.scholar_id %}
    <strong><span class="show_paper_citations" data="{{ pub.scholar_id }}"></span></strong>
    {% endif %}
  </li>
  {% endfor %}
</ul>




{% comment %}
{% include citation-modal.html %}
{% endcomment %}