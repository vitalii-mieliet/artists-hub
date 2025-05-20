import { getArtistListByQuery } from '../api/soundWaveAPI';

import { handleArtistDetails } from './artist-details-presenter';
import {
  renderArtists,
  toggleLoader,
  toggleLoadMoreButton,
  showError,
  getCurrentFilters,
  clearArtistsList,
} from '../views/artist-list-view';

const searchInput = document.querySelector('[data-artist-search]');
const genreInputs = document.querySelectorAll('input[name="sort-genre"]');
const sortInputs = document.querySelectorAll('input[name="sort"]');

let currentPage = 1;

export async function handleArtistsListByQuery() {
  try {
    toggleLoader(true);
    const filters = getCurrentFilters();
    const data = await getArtistListByQuery({
      currentPage,
      ...filters,
    });
    clearArtistsList();
    renderArtists(data.artists);
    const limit = Number(data.limit);
    const totalPages = Math.ceil(data.totalArtists / limit);
    toggleLoadMoreButton(currentPage < totalPages);
  } catch (error) {
    showError('Failed to load artists');
  } finally {
    toggleLoader(false);
  }
}

document.addEventListener('click', e => {
  const btn = e.target.closest('.js-learn-more-btn');

  if (!btn) return;

  const artistId = btn.dataset.artistId;
  if (artistId) {
    handleArtistDetails(artistId);
  }
});

document
  .querySelector('.load-more-btn')
  ?.addEventListener('click', async () => {
    currentPage += 1;
    await handleArtistsList();
  });

function setupFilterListeners() {
  const triggerFiltering = () => {
    currentPage = 1;
    const filters = getCurrentFilters();
    console.log('🎯 Фільтри:', filters);
    handleArtistsListByQuery();
  };

  if (searchInput) {
    console.log('✅ searchInput знайдено');
    searchInput.addEventListener('input', triggerFiltering);
  }

  genreInputs.forEach(input =>
    input.addEventListener('change', () => {
      console.log('✅ genre змінився');
      triggerFiltering();
    })
  );

  sortInputs.forEach(input =>
    input.addEventListener('change', () => {
      console.log('✅ sort змінився');
      triggerFiltering();
    })
  );
}

handleArtistsListByQuery();
setupFilterListeners();
