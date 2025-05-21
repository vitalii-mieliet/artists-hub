import { getArtistList } from '../api/soundWaveAPI';
import { handleArtistDetails } from './artist-details-presenter';
import {
  renderArtists,
  toggleLoader,
  showError,
  clearArtists,
} from '../views/artist-list-view';
import { createPagination } from '../pagination';

let pagination;

async function fetchAndRenderArtists(page = 1) {
  try {
    toggleLoader(true);
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
    toggleLoader(false);
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
