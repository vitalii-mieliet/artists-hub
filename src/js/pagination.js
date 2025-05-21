import Pagination from 'tui-pagination';

export function createPagination({ totalItems, itemsPerPage, onPageChange }) {
  const container = document.getElementById('pagination');
  const visiblePages = 3;

  const options = {
    totalItems,
    itemsPerPage,
    visiblePages,
    centerAlign: true,
    usageStatistics: false,
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton: ({ type }) => {
        const arrow = type === 'prev' ? '🡨' : '🡪';
        return `<a href="#" class="tui-page-btn tui-${type}">${arrow}</a>`;
      },
      disabledMoveButton: ({ type }) => {
        const arrow = type === 'prev' ? '🡨' : '🡪';
        return `<span class="tui-page-btn tui-is-disabled tui-${type}">${arrow}</span>`;
      },
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const pagination = new Pagination(container, options);

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

  function updatePageUI(currentPage) {
    insertDynamicExtraPage(currentPage);
  }

  updatePageUI(1);

  pagination.on('afterMove', ({ page }) => {
    updatePageUI(page);
  });

  pagination.on('beforeMove', event => {
    onPageChange(event.page);
  });

  return pagination;
}
