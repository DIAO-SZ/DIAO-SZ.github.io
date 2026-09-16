(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function () {
    var sourceList = document.querySelector('#publication-source');
    var listEl = document.querySelector('#publication-list');
    var typeSelect = document.querySelector('#publication-type-filter');
    var yearSelect = document.querySelector('#publication-year-filter');
    var sortButton = document.querySelector('#publication-year-sort');
    var searchInput = document.querySelector('#publication-search');

    if (!sourceList || !listEl || !typeSelect || !yearSelect || !sortButton) {
      return;
    }

    var typeLabels = {
      journal: { en: 'Journal Papers', zh: '期刊论文' },
      conference: { en: 'Conference Papers', zh: '会议论文' },
      ieeeTrans: { en: 'IEEE Trans.', zh: 'IEEE Trans.' },
      review: { en: 'Review Papers', zh: '综述论文' },
      preprint: { en: 'Preprints', zh: '预印本' },
      other: { en: 'Other', zh: '其他' }
    };

    var typeOrder = [
      'journal',
      'conference',
      'ieeeTrans',
      'review',
      'preprint'
    ];

    var orderedTypes = [];

    function getCurrentLanguage() {
      var html = document.documentElement;
      var language = (
        html.getAttribute('data-language') ||
        html.getAttribute('lang') ||
        'en'
      ).toLowerCase();

      return language === 'zh' ? 'zh' : 'en';
    }

    function getTypeLabel(type, language) {
      var labels = typeLabels[type];

      if (!labels) {
        return type;
      }

      if (typeof labels === 'string') {
        return labels;
      }

      return labels[language] || labels.en || type;
    }

    function getSelectLabel(select, language) {
      if (!select) {
        return language === 'zh' ? '类型' : 'Type';
      }

      var attrName =
        language === 'zh'
          ? 'data-label-zh'
          : 'data-label-en';

      var label = select.getAttribute(attrName);

      if (!label) {
        label = language === 'zh' ? '类型' : 'Type';
      }

      return label;
    }

    function buildTypeOptions() {
      var language = getCurrentLanguage();
      var currentValue = typeSelect.value;

      var optionsHtml = orderedTypes
        .map(function (type) {
          return (
            '<option value="' +
            type +
            '">' +
            getTypeLabel(type, language) +
            '</option>'
          );
        })
        .join('');

      var defaultLabel =
        getSelectLabel(typeSelect, language);

      typeSelect.innerHTML =
        '<option value="all">' +
        defaultLabel +
        '</option>' +
        optionsHtml;

      if (
        currentValue &&
        (
          currentValue === 'all' ||
          orderedTypes.indexOf(currentValue) !== -1
        )
      ) {
        typeSelect.value = currentValue;
      } else {
        typeSelect.value = 'all';
      }
    }

    var searchTerm = '';
    var citationManager =
      window.CitationModal || null;

    function sanitizeNode(node) {
      var clone = node.cloneNode(true);

      Array.prototype
        .slice.call(
          clone.querySelectorAll('img, template')
        )
        .forEach(function (el) {
          el.remove();
        });

      return clone;
    }

    function normalizeQuotes(text) {
      if (!text) {
        return '';
      }

      var replaced =
        text.replace(
          /''([^']+?)''/g,
          function (_, title) {
            return (
              '“' +
              title
                .trim()
                .replace(/[\s,;:.]+$/, '') +
              '”'
            );
          }
        );

      replaced =
        replaced.replace(
          /"([^"]+?)"/g,
          function (_, title) {
            return (
              '“' +
              title
                .trim()
                .replace(/[\s,;:.]+$/, '') +
              '”'
            );
          }
        );

      return replaced;
    }

    var publications =
      Array.prototype
        .slice.call(
          sourceList.querySelectorAll('li')
        )
        .map(function (item) {
          var year =
            parseInt(
              item.getAttribute('data-year'),
              10
            );

          var plainCitation =
            item.getAttribute(
              'data-citation-plain'
            ) || '';

          var bibCitation =
            item.getAttribute(
              'data-citation-bibtex'
            ) || '';

          var sanitized =
            sanitizeNode(item);

          var textContent =
            sanitized.textContent
              .replace(/\s+/g, ' ')
              .trim();

          var normalizedText =
            normalizeQuotes(textContent);

          return {
            type:
              item.getAttribute('data-type') ||
              'other',

            year:
              isNaN(year)
                ? null
                : year,

            date:
              item.getAttribute('data-date') ||
              '',

            content:
              item.innerHTML.trim(),

            rawText:
              normalizedText,

            searchText:
              normalizedText.toLowerCase(),

            plainCitation:
              plainCitation,

            bibCitation:
              bibCitation
          };
        });

    var uniqueTypes =
      Array.from(
        new Set(
          publications
            .map(function (pub) {
              return pub.type;
            })
            .filter(Boolean)
        )
      );

    /*
     * IEEE Trans. 是一个虚拟分类，
     * 不需要在 publications.json 中添加 type。
     */
    orderedTypes =
      typeOrder.filter(function (type) {
        return (
          type === 'ieeeTrans' ||
          uniqueTypes.indexOf(type) !== -1
        );
      });

    uniqueTypes.forEach(function (type) {
      if (
        typeOrder.indexOf(type) === -1
      ) {
        orderedTypes.push(type);
      }
    });

    buildTypeOptions();

    function updateYearOptions() {
      var years =
        Array.from(
          new Set(
            publications
              .map(function (pub) {
                return pub.year;
              })
              .filter(Boolean)
          )
        );

      years.sort(function (a, b) {
        return b - a;
      });

      yearSelect.innerHTML =
        '<option value="all">Date</option>' +
        years
          .map(function (year) {
            return (
              '<option value="' +
              year +
              '">' +
              year +
              '</option>'
            );
          })
          .join('');
    }

    updateYearOptions();

    var sortOrder = 'desc';

    var sortIconSvg =
      '' +
      '<svg class="publication-sort-icon" viewBox="0 0 1025 1024" xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" focusable="false">' +
      '<path d="M754.012 538a59.832 59.832 0 0 1 40.055 15.402c24.663 22.223 26.722 60.323 4.6 85.097L557.154 908.976a60.125 60.125 0 0 1-4.6 4.621c-24.661 22.223-62.587 20.154-84.709-4.62L226.332 638.498A60.418 60.418 0 0 1 211 598.261C211 564.98 237.857 538 270.987 538h483.025zM557.155 117.024L798.668 387.5A60.418 60.418 0 0 1 814 427.739C814 461.02 787.143 488 754.013 488H270.988a59.832 59.832 0 0 1-40.055-15.402c-24.663-22.223-26.722-60.323-4.6-85.097l241.513-270.477a60.125 60.125 0 0 1 4.6-4.621c24.661-22.223 62.587-20.154 84.709 4.62z" fill="currentColor"></path>' +
      '</svg>';

    function updateSortButtonIcon() {
      sortButton.innerHTML =
        sortIconSvg;

      var icon =
        sortButton.querySelector('svg');

      if (icon) {
        icon.classList.toggle(
          'publication-sort-icon--asc',
          sortOrder === 'asc'
        );
      }
    }

    function normalizeDate(
      dateStr,
      year
    ) {
      if (!dateStr) {
        return year
          ? String(year) + '-01-01'
          : '0000-01-01';
      }

      var normalized =
        dateStr.trim();

      if (/^\d{4}$/.test(normalized)) {
        return normalized + '-12-31';
      }

      if (
        /^\d{4}-\d{2}$/.test(
          normalized
        )
      ) {
        return normalized + '-01';
      }

      if (
        /^\d{4}\/\d{2}/.test(
          normalized
        )
      ) {
        var parts =
          normalized.split('/');

        return (
          parts[0] +
          '-' +
          parts[1] +
          '-01'
        );
      }

      return normalized;
    }

    function render() {
      var selectedType =
        typeSelect.value;

      var selectedYear =
        yearSelect.value;

      var highlightTerm =
        searchInput
          ? searchInput.value.trim()
          : '';

      var normalizedSearch =
        searchTerm;


      /*
       * 筛选
       */
      var filtered =
        publications.filter(
          function (pub) {

            /*
             * IEEE Transactions
             *
             * 包括：
             * IEEE Transactions on ...
             * IEEE/ASME Transactions on ...
             *
             * 不包括 IEEE Conference。
             */
            if (
              selectedType ===
              'ieeeTrans'
            ) {

              var isIEEETrans =
                /IEEE(?:\/ASME)?\s+Transactions\s+on/i
                  .test(
                    pub.rawText || ''
                  );

              if (!isIEEETrans) {
                return false;
              }

            } else if (
              selectedType !== 'all' &&
              pub.type !== selectedType
            ) {

              return false;

            }


            /*
             * Year
             */
            if (
              selectedYear !== 'all' &&
              String(pub.year) !==
                selectedYear
            ) {
              return false;
            }


            /*
             * Search
             */
            if (
              normalizedSearch &&
              pub.searchText.indexOf(
                normalizedSearch
              ) === -1
            ) {
              return false;
            }


            return true;
          }
        );


      /*
       * 排序
       */
      filtered.sort(function (a, b) {
        var dateA =
          normalizeDate(
            a.date,
            a.year
          );

        var dateB =
          normalizeDate(
            b.date,
            b.year
          );

        if (dateA === dateB) {
          return 0;
        }

        if (sortOrder === 'desc') {
          return dateA > dateB
            ? -1
            : 1;
        }

        return dateA > dateB
          ? 1
          : -1;
      });


      listEl.innerHTML = '';


      if (filtered.length === 0) {
        var emptyItem =
          document.createElement('li');

        emptyItem.className =
          'publication-empty';

        emptyItem.textContent =
          'No matching publication';

        listEl.appendChild(
          emptyItem
        );

        return;
      }


      /*
       * 关键：
       * 编号按照当前筛选结果重新计算。
       *
       * 例如 IEEE Trans. 有 8 篇：
       * [8] [7] ... [1]
       */
      var total =
        filtered.length;


      filtered.forEach(
        function (pub, index) {

          var li =
            document.createElement(
              'li'
            );

          var number =
            sortOrder === 'desc'
              ? total - index
              : index + 1;

          li.className =
            'publication-item';


          var indexEl =
            document.createElement(
              'span'
            );

          indexEl.className =
            'publication-index';

          indexEl.textContent =
            '[' +
            number +
            ']';


          var bodyEl =
            document.createElement(
              'div'
            );

          bodyEl.className =
            'publication-body';

          bodyEl.innerHTML =
            pub.content;


          enhanceDisplay(bodyEl);

          applySearchHighlight(
            bodyEl,
            highlightTerm
          );


          var actions =
            document.createElement(
              'div'
            );

          actions.className =
            'publication-actions';

          var hasActions =
            false;


/*
          var citeButton =
            document.createElement(
              'button'
            );

          citeButton.type =
            'button';

          citeButton.className =
            'publication-cite';

          citeButton.innerHTML =
            '<img src="https://img.shields.io/badge/Link-Cite-0969da?labelColor=555" alt="Cite badge">';

          citeButton.setAttribute(
            'aria-label',
            'Cite this publication'
          );

          citeButton.setAttribute(
            'data-citation-modal-trigger',
            ''
          );

          citeButton.setAttribute(
            'data-citation-index',
            String(number)
          );

          actions.appendChild(
            citeButton
          );

          setupCitationTrigger(
            citeButton,
            pub,
            actions
          );

          var manager =
            citationManager ||
            window.CitationModal;

          if (
            manager &&
            typeof manager.refreshTriggers ===
              'function'
          ) {
            manager.refreshTriggers(
              actions
            );
          }

          hasActions = true;
*/


          var findAncestorLink =
            function (node) {

              var current =
                node;

              while (current) {

                if (
                  current.tagName &&
                  current.tagName
                    .toLowerCase() ===
                    'a'
                ) {
                  return current;
                }

                if (
                  current === bodyEl
                ) {
                  return null;
                }

                current =
                  current.parentNode;
              }

              return null;
            };


          var badgeImages =
            Array.prototype.slice.call(
              bodyEl.querySelectorAll(
                'a img'
              )
            );

          var pdfBadges = [];
          var videoBadges = [];
          var otherBadges = [];


          badgeImages.forEach(
            function (img) {

              var link =
                findAncestorLink(img);

              if (!link) {
                return;
              }

              var altText =
                (
                  img.getAttribute(
                    'alt'
                  ) || ''
                ).toLowerCase();


              if (
                altText.indexOf(
                  'pdf'
                ) !== -1 &&
                altText.indexOf(
                  'badge'
                ) !== -1
              ) {

                pdfBadges.push(
                  link
                );

                return;
              }


              if (
                altText.indexOf(
                  'video'
                ) !== -1 &&
                altText.indexOf(
                  'badge'
                ) !== -1
              ) {

                videoBadges.push(
                  link
                );

                return;
              }


              if (
                altText.indexOf(
                  'badge'
                ) !== -1
              ) {

                otherBadges.push(
                  link
                );

              }

            }
          );


          var appendedBadges = [];


          var appendBadge =
            function (link) {

              if (
                !link ||
                appendedBadges.indexOf(
                  link
                ) !== -1
              ) {
                return;
              }


              if (
                link.parentNode
              ) {
                link.parentNode
                  .removeChild(link);
              }


              link.classList.add(
                'publication-badge'
              );


              var badgeImage =
                link.querySelector(
                  'img'
                );


              if (badgeImage) {

                badgeImage.classList.add(
                  'publication-badge__image'
                );

              }


              actions.appendChild(
                link
              );


              appendedBadges.push(
                link
              );


              hasActions =
                true;
            };


          pdfBadges.forEach(
            appendBadge
          );

          videoBadges.forEach(
            appendBadge
          );

          otherBadges.forEach(
            appendBadge
          );


          if (hasActions) {
            bodyEl.appendChild(
              actions
            );
          }


          li.appendChild(
            indexEl
          );

          li.appendChild(
            bodyEl
          );


          var yearEl =
            document.createElement(
              'span'
            );

          yearEl.className =
            'publication-year';

          yearEl.textContent =
            pub.year
              ? String(pub.year)
              : '';

          li.appendChild(
            yearEl
          );


          listEl.appendChild(
            li
          );

        }
      );

    }


    typeSelect.addEventListener(
      'change',
      render
    );

    yearSelect.addEventListener(
      'change',
      render
    );

    updateSortButtonIcon();


    sortButton.addEventListener(
      'click',
      function () {

        sortOrder =
          sortOrder === 'desc'
            ? 'asc'
            : 'desc';

        updateSortButtonIcon();

        render();

      }
    );


    if (searchInput) {

      searchInput.addEventListener(
        'input',
        function () {

          searchTerm =
            this.value
              .trim()
              .toLowerCase();

          render();

        }
      );

    }


    if (window.MutationObserver) {

      var languageObserver =
        new MutationObserver(
          function (mutations) {

            for (
              var i = 0;
              i < mutations.length;
              i++
            ) {

              var mutation =
                mutations[i];

              if (
                mutation.type ===
                  'attributes' &&
                mutation.attributeName ===
                  'data-language'
              ) {

                buildTypeOptions();

                render();

                break;
              }

            }

          }
        );


      languageObserver.observe(
        document.documentElement,
        {
          attributes: true,
          attributeFilter: [
            'data-language'
          ]
        }
      );

    }


    function enhanceDisplay(container) {