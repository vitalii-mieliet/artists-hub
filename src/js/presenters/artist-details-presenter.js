import { getArtistDetails } from '../api/soundWaveAPI';
import { openModal } from '../utils/modal-controller';
import { renderArtistDetails } from '../views/artist-details-view';

export async function handleArtistDetails(id) {
  try {
    const data = await getArtistDetails(id);
    console.log(data);
    renderArtistDetails(data);
    openModal('#artist-modal');
  } catch (error) {
    console.error('An error occurred while loading the data:', error);
  }
}
