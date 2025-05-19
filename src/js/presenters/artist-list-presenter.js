import { getArtistList } from '../api/soundWaveAPI';
import { handleArtistDetails } from './artist-details-presenter';
import {
  renderArtists,
  toggleLoader,
  toggleLoadMoreButton,
  showError,
} from '../views/artist-list-view';

let currentPage = 1;

export async function handleArtistsList() {
  try {
    toggleLoader(true);
    const data = await getArtistList(currentPage);
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
  console.log(btn);
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
