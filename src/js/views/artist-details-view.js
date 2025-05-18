import { getArtistDetails } from '../api/soundWaveAPI';

export async function handlArtistDetails(id) {
  try {
    const data = await getArtistDetails(id);
    console.log(data);
    console.log(data.tracksList);
  } catch (error) {
    console.error('An error occurred while loading the data:', error);
  }
}
