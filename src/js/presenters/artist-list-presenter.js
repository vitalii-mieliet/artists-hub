import { getArtistList } from '../api/soundWaveAPI';
import { handleArtistDetails } from './artist-details-presenter';

export async function handleArtistsList() {
  try {
    const data = await getArtistList();
    console.log(data.artists);
  } catch (error) {
    console.error('An error occurred while loading the data:', error);
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
