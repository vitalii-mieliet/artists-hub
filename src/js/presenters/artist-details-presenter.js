import { getArtistDetails } from '../api/soundWaveAPI';
import { openModal } from '../utils/modal-controller';

export async function handleArtistDetails(id) {
  try {
    const data = await getArtistDetails(id);
    console.log(data);
    openModal('#artist-modal');
  } catch (error) {
    console.error('An error occurred while loading the data:', error);
  }
}
