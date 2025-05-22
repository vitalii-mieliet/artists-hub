import Pagination from 'tui-pagination';
import spriteUrl from '../assets/svg/sprite.svg';
export function createPagination({ totalItems, itemsPerPage, onPageChange }) {
  const container = document.getElementById('pagination');
  let pagination = null;
  let currentPage = 1;
  let currentVisiblePages = null;

  function getVisiblePages() {
    return window.innerWidth < 768 ? 1 : 3;
  }

  const arrowRight =
    '<svg class="tui-page-btn icon-tui" width="14" height="15">' +
    `<use href="${spriteUrl}#icon-right-arrow-alt"></use>` +
    '</svg>';

  const arrowLeft =
    '<svg class="tui-page-btn icon-tui" width="14" height="15">' +
    `<use href="${spriteUrl}#icon-left-arrow-alt"></use>` +
    '</svg>';

  function initPagination(page = 1) {
    container.innerHTML = ''; // очищаємо контейнер

    currentVisiblePages = getVisiblePages();

    const options = {
      totalItems,
      itemsPerPage,
      visiblePages: currentVisiblePages,
      page,
      centerAlign: true,
      usageStatistics: false,
      template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage:
          '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton: ({ type }) => {
          const arrow = type === 'prev' ? `${arrowLeft}` : `${arrowRight}`;
          return `<a href="#" class="tui-page-btn tui-${type}">${arrow}</a>`;
        },
        disabledMoveButton: ({ type }) => {
          const arrow = type === 'prev' ? `${arrowLeft}` : `${arrowRight}`;
          return `<span class="tui-page-btn tui-is-disabled tui-${type}">${arrow}</span>`;
        },
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
          '<span class="tui-ico-ellip">...</span>' +
          '</a>',
      },
    };

    pagination = new Pagination(container, options);

    pagination.on('afterMove', ({ page }) => {
      currentPage = page;
      insertDynamicExtraPage(page);
    });

    pagination.on('beforeMove', event => {
      onPageChange(event.page);
    });

    insertDynamicExtraPage(page);
  }

  function insertDynamicExtraPage(currentPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const dynamicPage = currentPage + 6;

    const oldExtra = container.querySelector('.tui-extra-page');
    if (oldExtra) oldExtra.remove();

    if (dynamicPage > totalPages) return;

    const btn = document.createElement('a');
    btn.href = '#';
    btn.className = 'tui-page-btn tui-extra-page';
    btn.textContent = dynamicPage;

    btn.addEventListener('click', e => {
      e.preventDefault();
      pagination.movePageTo(dynamicPage);
    });

    const nextBtn = container.querySelector('.tui-next');
    const ellipsis = container.querySelector('.tui-next-is-ellip');

    container.querySelectorAll('.tui-prev-is-ellip').forEach(el => el.remove());

    if (ellipsis && nextBtn) {
      container.insertBefore(btn, nextBtn);
    } else if (nextBtn) {
      container.insertBefore(btn, nextBtn);
    } else {
      container.appendChild(btn);
    }
  }

  // ініціалізація на старті
  initPagination();

  // ресет при зміні ширини
  window.addEventListener('resize', () => {
    const newVisiblePages = getVisiblePages();
    if (newVisiblePages !== currentVisiblePages) {
      initPagination(currentPage);
    }
  });

  return {
    goToPage: page => {
      pagination.movePageTo(page);
    },
  };
}
