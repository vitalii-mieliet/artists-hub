import { getArtistDetails } from '../api/soundWaveAPI';
import { openModal } from '../utils/modal-controller';
import { renderArtistDetails } from '../views/artist-details-view';

export async function handleArtistDetails(id, fallbackGenres = []) {
  try {
    const data = await getArtistDetails(id);
    if (!data.genres || !data.genres.length) {
      data.genres = fallbackGenres;
    }

    renderArtistDetails(data);
    openModal('#artist-modal');
  } catch (error) {
    console.error('An error occurred while loading the data:', error);
  }
}
