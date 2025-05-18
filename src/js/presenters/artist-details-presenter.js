import { getArtistDetails } from '../api/soundWaveAPI';

export async function handleArtistDetails(id) {
  try {
    const data = await getArtistDetails(id);
    console.log(data);
  } catch (error) {
    console.error('An error occurred while loading the data:', error);
  }
}
