import Pagination from 'tui-pagination';
export function createPagination({ totalItems, itemsPerPage, onPageChange }) {
  const container = document.getElementById('pagination');

  const options = {
    totalItems,
    itemsPerPage,
    visiblePages: 3,
    centerAlign: true,
    usageStatistics: false,
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '{{#if type === "prev"}}' +
        '<svg class="icon icon-arrow-left"><use href="/assets/svg/sprite.svg#icon-left-arrow-alt"></use></svg>' +
        '{{else}}' +
        '<svg class="icon icon-arrow-right"><use href="/assets/svg/sprite.svg#icon-right-arrow-alt"></use></svg>' +
        '{{/if}}' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '{{#if type === "prev"}}' +
        '<svg class="icon icon-arrow-left"><use href="/assets/svg/sprite.svg#icon-left-arrow-alt"></use></svg>' +
        '{{else}}' +
        '<svg class="icon icon-arrow-right"><use href="/assets/svg/sprite.svg#icon-right-arrow-alt"></use></svg>' +
        '{{/if}}' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
      firstPage: '',
      lastPage: '',
    },
  };

  const pagination = new Pagination(container, options);

  pagination.on('beforeMove', event => {
    const currentPage = event.page;
    onPageChange(currentPage);
  });

  return pagination;
}
