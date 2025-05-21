import { getArtistList } from '../api/soundWaveAPI';
import { handleArtistDetails } from './artist-details-presenter';
import {
  renderArtists,
  toggleLoader,
  showError,
  clearArtists,
} from '../views/artist-list-view';
import { createPagination } from '../pagination';
import { hideLoader, showLoader } from '../utils/loader';

let pagination;

async function fetchAndRenderArtists(page = 1) {
  showLoader();
  try {
    const data = await getArtistList(page);
    clearArtists();
    renderArtists(data.artists);

    if (!pagination) {
      const limit = Number(data.limit);
      const total = Number(data.totalArtists);
      pagination = createPagination({
        totalItems: total,
        itemsPerPage: limit,
        onPageChange: fetchAndRenderArtists,
      });
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
