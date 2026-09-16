# 📚 Publications

<style>
  .pub-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 20px 0 12px 0;
    width: 100%;
  }

  .pub-search {
    flex: 1;
    min-width: 220px;
    height: 38px;
    padding: 6px 12px;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
    background: #fff;
    font-size: 14px;
    box-sizing: border-box;
  }

  .pub-select {
    height: 38px;
    padding: 6px 30px 6px 10px;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
    background: #fff;
    font-size: 14px;
    cursor: pointer;
  }

  .pub-sort-button {
    width: 38px;
    height: 38px;
    padding: 0;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
    background: #fff;
    font-size: 18px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
  }

  .pub-sort-button:hover {
    background: #f5f5f5;
  }

  .pub-result-count {
    margin: 4px 0 18px 0;
    font-size: 13px;
    color: #777;
  }

  .publication-list {
    width: 100%;
  }

  .publication-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 14px;
  }

  .publication-number {
    flex: 0 0 auto;
    min-width: 34px;
    font-size: 15px;
    line-height: 1.6;
  }

  .publication-content {
    flex: 1;
    min-width: 0;
    font-size: 15px;
    line-height: 1.6;
  }

  .publication-content p {
    margin: 0;
  }

  .publication-title {
    color: inherit;
  }

  .publication-content a {
    word-break: break-word;
  }

  .pub-empty {
    margin-top: 20px;
    color: #777;
  }

  @media (max-width: 700px) {
    .pub-controls {
      flex-wrap: wrap;
    }

    .pub-search {
      flex: 1 1 100%;
      width: 100%;
    }

    .pub-select {
      flex: 1;
    }
  }
</style>


<div class="pub-controls">

  <input
    id="pub-search"
    class="pub-search"
    type="search"
    placeholder="Search publications..."
    aria-label="Search publications"
  >

  <select
    id="pub-type"
    class="pub-select"
    aria-label="Publication type"
  >
    <option value="all">Type</option>
    <option value="journal">Journal</option>
    <option value="conference">Conference</option>
    <option value="ieee-trans">IEEE Trans.</option>
  </select>

  <select
    id="pub-sort"
    class="pub-select"
    aria-label="Sort publications"
  >
    <option value="date">Date</option>
  </select>

  <button
    id="pub-sort-direction"
    class="pub-sort-button"
    type="button"
    aria-label="Change sort direction"
    title="Change sort direction"
  >
    ↕
  </button>

</div>


<div
  id="pub-result-count"
  class="pub-result-count"
></div>

<div
  id="publication-list"
  class="publication-list"
></div>


<script id="publication-data" type="application/json">
[
  {
    "type": "journal",
    "year": 2026,
    "date": "2026-08",
    "scholar_id": "",
    "body_html": "<p><strong>Shuzhen Diao</strong><sup>#</sup>, Xinlin Zhang, Zhi-Xin Yang, Yanding Qin, Wei Sun, and Ning Sun<sup>*</sup>, “<span class=\"publication-title\">Dynamic compliant control with multistep prediction for pneumatic artificial muscle-actuated parallel robots</span>,” <strong style=\"color:#1F4E79;\">IEEE Transactions on Industrial Electronics</strong>, Aug. 2026, <a href=\"https://doi.org/10.1109/TIE.2026.3730054\">doi: 10.1109/TIE.2026.3730054</a>.</p>"
  },
  {
    "type": "journal",
    "year": 2026,
    "date": "2026-01",
    "scholar_id": "",
    "body_html": "<p>Qihang Wang<sup>#</sup>, <strong>Shuzhen Diao</strong><sup>#</sup>, Gendi Liu, Tong Yang, Yongsheng Wang, Yanding Qin, and Ning Sun<sup>*</sup>, “<span class=\"publication-title\">Output feedback control for PAM-actuated parallel robots with interval type-2 fuzzy neural networks</span>,” <strong style=\"color:#1F4E79;\">IEEE Transactions on Systems, Man, and Cybernetics: Systems</strong>, vol. 56, no. 1, pp. 606–616, Jan. 2026, <a href=\"https://doi.org/10.1109/TSMC.2025.3632057\">doi: 10.1109/TSMC.2025.3632057</a>.</p>"
  },
  {
    "type": "journal",
    "year": 2025,
    "date": "2025-11",
    "scholar_id": "",
    "body_html": "<p><strong>Shuzhen Diao</strong><sup>#</sup>, Gendi Liu, Xinlin Zhang, Jing Zhao, Yanding Qin, Wei Sun, and Ning Sun<sup>*</sup>, “<span class=\"publication-title\">Velocity feedback-free synchronous control for pneumatic artificial muscle-actuated parallel robots with fractional-order hysteresis</span>,” <strong style=\"color:#1F4E79;\">IEEE Transactions on Industrial Electronics</strong>, vol. 72, no. 11, pp. 11725–11735, Nov. 2025, <a href=\"https://doi.org/10.1109/TIE.2025.3559959\">doi: 10.1109/TIE.2025.3559959</a>.</p>"
  },
  {
    "type": "journal",
    "year": 2025,
    "date": "2025-06",
    "scholar_id": "",
    "body_html": "<p><strong>Shuzhen Diao</strong><sup>#</sup>, Gendi Liu, Tong Yang, Menghua Zhang, Yanding Qin, Wei Sun, and Ning Sun<sup>*</sup>, “<span class=\"publication-title\">Finite-time synchronous motion control for pneumatic muscle-actuated parallel robots in Cartesian space</span>,” <strong style=\"color:#1F4E79;\">IEEE/ASME Transactions on Mechatronics</strong>, vol. 30, no. 3, pp. 2389–2400, Jun. 2025, <a href=\"https://doi.org/10.1109/TMECH.2024.3454172\">doi: 10.1109/TMECH.2024.3454172</a>.</p>"
  },
  {
    "type": "journal",
    "year": 2025,
    "date": "2025-03",
    "scholar_id": "",
    "body_html": "<p><strong>刁淑贞</strong><sup>#</sup>, 张欣霖, 刘根娣, 秦岩丁, 方勇纯, 孙宁<sup>*</sup>, “<span class=\"publication-title\">基于迟滞逆补偿的气动人工肌肉并联机器人同步控制</span>,” <strong style=\"color:#1F4E79;\">机器人</strong>, vol. 47, no. 2, pp. 145–154, Mar. 2025, <a href=\"https://doi.org/10.13973/j.cnki.robot.240158\">doi: 10.13973/j.cnki.robot.240158</a>.</p>"
  },
  {
    "type": "journal",
    "year": 2024,
    "date": "2024-04",
    "scholar_id": "",
    "body_html": "<p><strong>Shuzhen Diao</strong><sup>#</sup>, Gendi Liu, Zhuoqing Liu, Lu Zhou, Wei Sun, Yu Wang, and Ning Sun<sup>*</sup>, “<span class=\"publication-title\">Prescribed-time adaptive fuzzy control for pneumatic artificial muscle-actuated parallel robots with input constraints</span>,” <strong style=\"color:#1F4E79;\">IEEE Transactions on Fuzzy Systems</strong>, vol. 32, no. 4, pp. 2039–2051, Apr. 2024, <a href=\"https://doi.org/10.1109/TFUZZ.2023.3341930\">doi: 10.1109/TFUZZ.2023.3341930</a>.</p>"
  },
  {
    "type": "journal",
    "year": 2024,
    "date": "2024-04",
    "scholar_id": "",
    "body_html": "<p><strong>Shuzhen Diao</strong><sup>#</sup>, Wei Sun<sup>*</sup>, Shun-Feng Su, Xudong Zhao, and Ning Xu, “<span class=\"publication-title\">Novel adaptive control for flexible-joint robots with unknown measurement sensitivity</span>,” <strong style=\"color:#1F4E79;\">IEEE Transactions on Automation Science and Engineering</strong>, vol. 21, no. 2, pp. 1445–1456, Apr. 2024, <a href=\"https://doi.org/10.1109/TASE.2023.3248178\">doi: 10.1109/TASE.2023.3248178</a>.</p>"
  },
  {
    "type": "journal",
    "year": 2023,
    "date": "2023-04",
    "scholar_id": "",
    "body_html": "<p>Wei Sun<sup>#</sup>, <strong>Shuzhen Diao</strong>, Shun-Feng Su<sup>*</sup>, and Zongyao Sun, “<span class=\"publication-title\">Fixed-time adaptive neural network control for nonlinear systems with input saturation</span>,” <strong style=\"color:#1F4E79;\">IEEE Transactions on Neural Networks and Learning Systems</strong>, vol. 34, no. 4, pp. 1911–1920, Apr. 2023, <a href=\"https://doi.org/10.1109/TNNLS.2021.3105664\">doi: 10.1109/TNNLS.2021.3105664</a>.</p>"
  },
  {
    "type": "journal",
    "year": 2022,
    "date": "2022-10",
    "scholar_id": "",
    "body_html": "<p><strong>Shuzhen Diao</strong><sup>#</sup>, Wei Sun<sup>*</sup>, Shun-Feng Su<sup>*</sup>, and Jianwei Xia, “<span class=\"publication-title\">Adaptive asymptotic tracking control for multi-input and multi-output nonlinear systems with unknown hysteresis inputs</span>,” <strong style=\"color:#1F4E79;\">Information Sciences</strong>, vol. 612, pp. 241–256, Oct. 2022, <a href=\"https://doi.org/10.1016/j.ins.2022.08.092\">doi: 10.1016/j.ins.2022.08.092</a>.</p>"
  },
  {
    "type": "journal",
    "year": 2022,
    "date": "2022-08",
    "scholar_id": "",
    "body_html": "<p><strong>Shuzhen Diao</strong><sup>#</sup>, Wei Sun<sup>*</sup>, Shun-Feng Su<sup>*</sup>, and Jianwei Xia, “<span class=\"publication-title\">Adaptive fuzzy event-triggered control for single-link flexible-joint robots with actuator failures</span>,” <strong style=\"color:#1F4E79;\">IEEE Transactions on Cybernetics</strong>, vol. 52, no. 8, pp. 7231–7241, Aug. 2022, <a href=\"https://doi.org/10.1109/TCYB.2021.3049536\">doi: 10.1109/TCYB.2021.3049536</a>.</p>"
  },
  {
    "type": "journal",
    "year": 2022,
    "date": "2022-03",
    "scholar_id": "",
    "body_html": "<p><strong>Shuzhen Diao</strong><sup>#</sup>, Wei Sun<sup>*</sup>, and Shun-Feng Su<sup>*</sup>, “<span class=\"publication-title\">Neural-based adaptive event-triggered tracking control for flexible-joint robots with random noises</span>,” <strong style=\"color:#1F4E79;\">International Journal of Robust and Nonlinear Control</strong>, vol. 32, no. 5, pp. 2722–2740, Mar. 2022, <a href=\"https://doi.org/10.1002/rnc.5382\">doi: 10.1002/rnc.5382</a>.</p>"
  },
  {
    "type": "journal",
    "year": 2021,
    "date": "2021-10",
    "scholar_id": "",
    "body_html": "<p><strong>Shuzhen Diao</strong><sup>#</sup>, Wei Sun<sup>*</sup>, Le Wang, and Jing Wu, “<span class=\"publication-title\">Finite-time adaptive fuzzy control for nonlinear systems with unknown backlash-like hysteresis</span>,” <strong style=\"color:#1F4E79;\">International Journal of Fuzzy Systems</strong>, vol. 23, pp. 2037–2047, Oct. 2021, <a href=\"https://doi.org/10.1007/s40815-021-01066-1\">doi: 10.1007/s40815-021-01066-1</a>.</p>"
  },
  {
    "type": "journal",
    "year": 2021,
    "date": "2021-10",
    "scholar_id": "",
    "body_html": "<p>Wei Sun<sup>#</sup>, <strong>Shuzhen Diao</strong>, Shun-Feng Su, and Yuqiang Wu, “<span class=\"publication-title\">Adaptive fuzzy tracking for flexible-joint robots with random noises via command filter control</span>,” <strong style=\"color:#1F4E79;\">Information Sciences</strong>, vol. 575, pp. 116–132, Oct. 2021, <a href=\"https://doi.org/10.1016/j.ins.2021.06.025\">doi: 10.1016/j.ins.2021.06.025</a>.</p>"
  },
  {
    "type": "conference",
    "year": 2026,
    "date": "2026-06",
    "scholar_id": "",
    "body_html": "<p><strong>Shuzhen Diao</strong><sup>#</sup>, Xinlin Zhang, and Ning Sun<sup>*</sup>, “<span class=\"publication-title\">Obstacle-avoidance motion control of pneumatic artificial muscle-actuated parallel robots with hysteresis and creep</span>,” in <strong style=\"color:#5B9BD5;\">Proceedings of the 2026 7th International Conference on Artificial Intelligence and Electromechanical Automation (AIEA 2026)</strong>, Shenzhen, China, Jun. 2026, pp. 86–90, <a href=\"https://doi.org/10.1109/AIEA70743.2026.11632445\">doi: 10.1109/AIEA70743.2026.11632445</a>.</p>"
  }
]
</script>


<script>
document.addEventListener("DOMContentLoaded", function () {

  const publications = JSON.parse(
    document.getElementById("publication-data").textContent
  );

  const searchInput =
    document.getElementById("pub-search");

  const typeFilter =
    document.getElementById("pub-type");

  const sortFilter =
    document.getElementById("pub-sort");

  const sortDirectionButton =
    document.getElementById("pub-sort-direction");

  const publicationList =
    document.getElementById("publication-list");

  const resultCount =
    document.getElementById("pub-result-count");


  /*
   * 默认：
   * true  = newest → oldest
   * false = oldest → newest
   */
  let sortDescending = true;


  /*
   * 判断一篇论文是否属于 IEEE Transactions 系列。
   *
   * 包括：
   * IEEE Transactions on ...
   * IEEE/ASME Transactions on ...
   *
   * 不包括：
   * IEEE conference papers
   */
  function isIEEETransactions(item) {

    const html = item.body_html || "";

    return (
      /IEEE\s+Transactions\s+on/i.test(html) ||
      /IEEE\/ASME\s+Transactions\s+on/i.test(html)
    );

  }


  /*
   * HTML → 纯文本
   * 用于 Search。
   */
  function htmlToText(html) {

    const temp = document.createElement("div");

    temp.innerHTML = html || "";

    return (
      temp.textContent ||
      temp.innerText ||
      ""
    ).toLowerCase();

  }


  /*
   * 日期转成数字。
   *
   * 例如：
   * 2026-08 → 202608
   * 2025-03 → 202503
   */
  function getDateValue(item) {

    if (!item.date) {
      return (parseInt(item.year, 10) || 0) * 100;
    }

    const parts =
      String(item.date).split("-");

    const year =
      parseInt(parts[0], 10) || 0;

    const month =
      parseInt(parts[1], 10) || 1;

    return year * 100 + month;

  }


  /*
   * 得到完整论文的固定日期排序，
   * 用于生成论文编号。
   */
  const chronologicalPublications =
    [...publications].sort(function (a, b) {

      return (
        getDateValue(b) -
        getDateValue(a)
      );

    });


  /*
   * 搜索 + 类型筛选 + 日期排序
   */
  function getFilteredPublications() {

    const keyword =
      searchInput.value
        .trim()
        .toLowerCase();

    const selectedType =
      typeFilter.value;


    let filtered =
      publications.filter(function (item) {

        /*
         * Search
         */
        const text =
          htmlToText(item.body_html);

        const searchMatch =
          keyword === "" ||
          text.includes(keyword);


        /*
         * Type
         */
        let typeMatch = true;


        if (selectedType === "journal") {

          typeMatch =
            String(item.type).toLowerCase()
            === "journal";

        }

        else if (
          selectedType === "conference"
        ) {

          typeMatch =
            String(item.type).toLowerCase()
            === "conference";

        }

        else if (
          selectedType === "ieee-trans"
        ) {

          typeMatch =
            isIEEETransactions(item);

        }


        return (
          searchMatch &&
          typeMatch
        );

      });


    /*
     * Date sorting
     */
    filtered.sort(function (a, b) {

      const dateA =
        getDateValue(a);

      const dateB =
        getDateValue(b);


      if (sortDescending) {

        return dateB - dateA;

      }

      return dateA - dateB;

    });


    return filtered;

  }


  /*
   * 显示论文
   */
  function renderPublications() {

    const filtered =
      getFilteredPublications();


    publicationList.innerHTML = "";


    /*
     * 显示结果数量
     */
    resultCount.textContent =
      filtered.length +
      " publication" +
      (filtered.length === 1 ? "" : "s");


    /*
     * 没有搜索结果
     */
    if (filtered.length === 0) {

      publicationList.innerHTML =
        '<div class="pub-empty">' +
        'No publications found.' +
        '</div>';

      return;

    }


    filtered.forEach(function (item) {

      /*
       * 固定论文编号：
       * 最新文章编号最大。
       */
      const index =
        chronologicalPublications
          .indexOf(item);

      const number =
        chronologicalPublications.length -
        index;


      const row =
        document.createElement("div");

      row.className =
        "publication-item";


      const numberColumn =
        document.createElement("div");

      numberColumn.className =
        "publication-number";

      numberColumn.textContent =
        "[" + number + "]";


      const contentColumn =
        document.createElement("div");

      contentColumn.className =
        "publication-content";

      contentColumn.innerHTML =
        item.body_html || "";


      row.appendChild(
        numberColumn
      );

      row.appendChild(
        contentColumn
      );

      publicationList.appendChild(
        row
      );

    });

  }


  /*
   * Search
   */
  searchInput.addEventListener(
    "input",
    renderPublications
  );


  /*
   * Type：
   *
   * Type
   * Journal
   * Conference
   * IEEE Trans.
   */
  typeFilter.addEventListener(
    "change",
    renderPublications
  );


  /*
   * Date
   */
  sortFilter.addEventListener(
    "change",
    renderPublications
  );


  /*
   * 日期升序 / 降序
   */
  sortDirectionButton.addEventListener(
    "click",
    function () {

      sortDescending =
        !sortDescending;

      renderPublications();

    }
  );


  /*
   * 初始加载
   */
  renderPublications();

});
</script>