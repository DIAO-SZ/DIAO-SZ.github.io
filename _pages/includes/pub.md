# <span data-lang="en">📚 Publications</span><span data-lang="zh" hidden>📚 论文列表</span>


<style>
.publication-controls {
  display: flex;
  gap: 12px;
  align-items: stretch;
}

/* 四个框统一高度 */
.publication-search,
.publication-controls select,
.publication-sort {
  height: 52px !important;
  min-height: 52px !important;
  box-sizing: border-box !important;
  margin: 0 !important;
}

.publication-search {
  flex: 1;
}

.publication-sort {
  width: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 论文编号 */
.publication-list {
  list-style: none;
  padding-left: 0;
}

.publication-list > li {
  display: grid;
  grid-template-columns: 48px 1fr;
  column-gap: 12px;
  margin-bottom: 18px;
}

.publication-number {
  white-space: nowrap;
}

.publication-entry p {
  margin: 0;
}
</style>


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

  <select
    id="publication-type-filter"
    data-label-en="Type"
    data-label-zh="类型"
  >
    <option value="all">Type</option>
    <option value="journal">Journal</option>
    <option value="conference">Conference</option>
    <option value="ieee-trans">IEEE Trans.</option>
  </select>

  <select
    id="publication-year-filter"
    data-label-en="Date"
    data-label-zh="日期"
  >
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


<ol
  id="publication-list"
  class="publication-list"
></ol>


{% assign publications = site.data.publications %}

<ul
  id="publication-source"
  class="publication-source"
  hidden
>

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
    <strong>
      <span
        class="show_paper_citations"
        data="{{ pub.scholar_id }}"
      ></span>
    </strong>
    {% endif %}

  </li>

  {% endfor %}

</ul>


<script>
document.addEventListener("DOMContentLoaded", function () {

  const search = document.getElementById("publication-search");
  const type = document.getElementById("publication-type-filter");
  const year = document.getElementById("publication-year-filter");
  const sort = document.getElementById("publication-year-sort");
  const list = document.getElementById("publication-list");
  const source = document.getElementById("publication-source");

  let newestFirst = true;

  const pubs = Array.from(source.children).map(function (el) {
    return {
      type: el.dataset.type || "",
      year: el.dataset.year || "",
      date: el.dataset.date || el.dataset.year || "",
      html: el.innerHTML
    };
  });


  /* 生成 Date 年份 */
  [...new Set(pubs.map(p => p.year))]
    .sort((a, b) => b - a)
    .forEach(function (y) {
      const option = document.createElement("option");
      option.value = y;
      option.textContent = y;
      year.appendChild(option);
    });


  function text(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || "";
  }


  /* IEEE Transactions，包括 IEEE/ASME Transactions */
  function isIEEETrans(pub) {
    return /IEEE(?:\/ASME)? Transactions on/i.test(text(pub.html));
  }


  function dateValue(pub) {
    return Number(pub.date.replace("-", "")) || Number(pub.year);
  }


  function render() {

    const keyword = search.value.toLowerCase().trim();
    const selectedType = type.value;
    const selectedYear = year.value;

    let result = pubs.filter(function (pub) {

      const searchOK =
        !keyword ||
        text(pub.html).toLowerCase().includes(keyword);

      let typeOK = true;

      if (selectedType === "journal") {
        typeOK = pub.type === "journal";
      }

      if (selectedType === "conference") {
        typeOK = pub.type === "conference";
      }

      if (selectedType === "ieee-trans") {
        typeOK = isIEEETrans(pub);
      }

      const yearOK =
        selectedYear === "all" ||
        pub.year === selectedYear;

      return searchOK && typeOK && yearOK;
    });


    result.sort(function (a, b) {
      return newestFirst
        ? dateValue(b) - dateValue(a)
        : dateValue(a) - dateValue(b);
    });


    list.innerHTML = "";


    result.forEach(function (pub, index) {

      const li = document.createElement("li");

      const number = document.createElement("span");
      number.className = "publication-number";

      number.textContent =
        "[" +
        (newestFirst
          ? result.length - index
          : index + 1) +
        "]";


      const entry = document.createElement("div");
      entry.className = "publication-entry";
      entry.innerHTML = pub.html;


      li.appendChild(number);
      li.appendChild(entry);

      list.appendChild(li);
    });

  }


  search.addEventListener("input", render);
  type.addEventListener("change", render);
  year.addEventListener("change", render);

  sort.addEventListener("click", function () {
    newestFirst = !newestFirst;
    render();
  });


  render();

});
</script>


{% comment %}
{% include citation-modal.html %}
{% endcomment %}