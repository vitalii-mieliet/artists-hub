import { handleArtistsListByQuery } from '../js/presenters/artist-filter-presenter';

document.addEventListener('DOMContentLoaded', () => {
  const filterBtn = document.querySelector('.artist-button-filters');
  const arrowIcon = filterBtn.querySelector('.arrow-icon');
  const modalBox = document.querySelector('.artist-modal-filters-box');
  const toggleBtns = document.querySelectorAll(
    '.artist-sort-name[data-toggle-js]'
  );
  const toggleSections = document.querySelectorAll('[data-artist-modal]');
  const searchInput = document.querySelector('[data-artist-search]');
  const searchBtn = document.querySelector('.artist-search-button');

  modalBox?.addEventListener('change', e => {
    const target = e.target;
    if (target.matches('input[type="radio"]')) {
      closeAllMenus();
      handleArtistsListByQuery();
    }
  });

  searchBtn?.addEventListener('click', e => {
    e.stopPropagation();
    const query = searchInput?.value.trim();
    if (!query) return;

    closeAllMenus();
    handleArtistsListByQuery();
  });

  filterBtn?.addEventListener('click', e => {
    e.stopPropagation();
    modalBox.classList.toggle('open');
    arrowIcon.classList.toggle('rotated');
  });

  toggleBtns.forEach((btn, index) => {
    const section = toggleSections[index];
    const icon = btn.querySelector('svg');

    btn.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = section.classList.contains('open');

      toggleSections.forEach(sec => sec.classList.remove('open'));
      toggleBtns.forEach(b => {
        b.classList.remove('active-filter');
        const svg = b.querySelector('svg');
        svg?.classList.remove('rotated');
      });

      if (!isOpen) {
        section.classList.add('open');
        btn.classList.add('active-filter');
        icon?.classList.add('rotated');
      }
    });
  });

  document.addEventListener('click', e => {
    const isClickInside =
      modalBox.contains(e.target) || filterBtn.contains(e.target);
    if (!isClickInside) {
      closeAllMenus();
    }
  });

  function closeAllMenus() {
    modalBox.classList.remove('open');
    arrowIcon.classList.remove('rotated');

    toggleSections.forEach(section => section.classList.remove('open'));
    toggleBtns.forEach(btn => {
      btn.classList.remove('active-filter');
      const svg = btn.querySelector('svg');
      svg?.classList.remove('rotated');
    });
  }
});
