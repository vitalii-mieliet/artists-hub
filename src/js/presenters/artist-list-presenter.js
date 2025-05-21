import { getArtistListByQuery } from '../api/soundWaveAPI';
import { handleArtistDetails } from './artist-details-presenter';
import {
  renderArtists,
  showError,
  clearArtists,
  getCurrentFilters,
  renderGenres,
} from '../views/artist-list-view';
import { createPagination } from '../pagination';
import { hideLoader, showLoader } from '../utils/loader';

let pagination = null;
let previousFilters = '';

export async function fetchAndRenderArtists(page = 1) {
  showLoader();
  try {
    const filters = getCurrentFilters();
    const filtersKey = JSON.stringify(filters); // унікальний ключ фільтрів

    const data = await getArtistListByQuery({ currentPage: page, ...filters });

    clearArtists();
    renderArtists(data.artists);

    const limit = Number(data.limit);
    const total = Number(data.totalArtists);

    // 🔁 перевірка: чи змінилися фільтри
    const filtersChanged = filtersKey !== previousFilters;

    if (filtersChanged) {
      pagination?.destroy?.(); // знищити стару пагінацію
      pagination = createPagination({
        totalItems: total,
        itemsPerPage: limit,
        onPageChange: fetchAndRenderArtists,
      });
      previousFilters = filtersKey; // кешуємо поточні фільтри
    }

    // Якщо пагінації ще не було (перший запуск)
    if (!pagination) {
      pagination = createPagination({
        totalItems: total,
        itemsPerPage: limit,
        onPageChange: fetchAndRenderArtists,
      });
      previousFilters = filtersKey;
    }
  } catch (error) {
    showError('Failed to load artists');
  } finally {
    hideLoader();
  }
}

export function handleArtistsList() {
  fetchAndRenderArtists(1);
}

document.addEventListener('click', e => {
  const btn = e.target.closest('.js-learn-more-btn');
  if (!btn) return;

  const artistId = btn.dataset.artistId;
  const genresRaw = btn.dataset.genres;
  const genres = genresRaw ? JSON.parse(genresRaw) : [];

  if (artistId) {
    handleArtistDetails(artistId, genres);
  }
});

function setupFilterUI() {
  const filterBtn = document.querySelector('.artist-button-filters');
  const arrowIcon = filterBtn?.querySelector('.arrow-icon');
  const modalBox = document.querySelector('.artist-modal-filters-box');
  const toggleBtns = document.querySelectorAll(
    '.artist-sort-name[data-toggle-js]'
  );
  const toggleSections = document.querySelectorAll('[data-artist-modal]');
  const searchInput = document.querySelector('[data-artist-search]');
  const searchBtn = document.querySelector('.artist-search-button');
  const resetBtn = document.querySelector('.artist-reset-filters');

  filterBtn?.addEventListener('click', e => {
    e.stopPropagation();
    modalBox.classList.toggle('open');
    arrowIcon?.classList.toggle('rotated');
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
        b.querySelector('svg')?.classList.remove('rotated');
      });

      if (!isOpen) {
        section.classList.add('open');
        btn.classList.add('active-filter');
        icon?.classList.add('rotated');
      }
    });
  });

  modalBox?.addEventListener('change', e => {
    const target = e.target;
    if (!target.matches('input[type="radio"]')) return;

    const type =
      target.name === 'sort'
        ? 'sort'
        : target.name === 'sort-genre'
        ? 'genre'
        : null;

    if (!type) return;

    let valueLabel =
      type === 'sort'
        ? target.closest('label')?.textContent.trim()
        : target.value || 'All genres';

    const label = document.querySelector(`[data-type-value="${type}"]`);
    if (label) label.textContent = valueLabel;

    // 👇 закрити відповідний випадаючий список
    const index = type === 'sort' ? 0 : 1;
    const section = document.querySelectorAll('[data-artist-modal]')[index];
    const button = document.querySelectorAll(
      '.artist-sort-name[data-toggle-js]'
    )[index];
    const icon = button.querySelector('svg');

    section?.classList.remove('open');
    button?.classList.remove('active-filter');
    icon?.classList.remove('rotated');

    fetchAndRenderArtists(1);
  });

  // 🔍 Пошук
  searchBtn?.addEventListener('click', e => {
    e.stopPropagation();
    const query = searchInput?.value.trim();

    if (!query) return;

    fetchAndRenderArtists(1);
  });

  searchInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchAndRenderArtists(1);
    }
  });

  // ❌ Reset Filters
  resetBtn?.addEventListener('click', () => {
    // Очистити інпут пошуку
    if (searchInput) searchInput.value = '';

    // Скинути жанр
    const genreInputs = document.querySelectorAll('input[name="sort-genre"]');
    if (genreInputs.length) {
      genreInputs.forEach(i => (i.checked = false));
      genreInputs[0].checked = true;
      document.querySelector('[data-type-value="genre"]').textContent =
        'All genres';
    }

    // Скинути сортування
    const sortInputs = document.querySelectorAll('input[name="sort"]');
    if (sortInputs.length) {
      sortInputs.forEach(i => (i.checked = false));
      sortInputs[0].checked = true;
      document.querySelector('[data-type-value="sort"]').textContent =
        'Default';
    }

    fetchAndRenderArtists(1);
  });

  // ❎ Закриття при кліку поза фільтром
  document.addEventListener('click', e => {
    const isClickInside =
      modalBox.contains(e.target) || filterBtn.contains(e.target);
    if (!isClickInside) {
      modalBox.classList.remove('open');
      arrowIcon?.classList.remove('rotated');
      toggleSections.forEach(sec => sec.classList.remove('open'));
      toggleBtns.forEach(btn => {
        btn.classList.remove('active-filter');
        btn.querySelector('svg')?.classList.remove('rotated');
      });
    }
  });
}
handleArtistsList();
setupFilterUI();
renderGenres();
