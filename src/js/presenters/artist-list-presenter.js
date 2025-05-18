import { getArtistList } from '../api/soundWaveAPI';

export async function handleArtistsList() {
  try {
    const data = await getArtistList();
    console.log(data.artists);
  } catch (error) {
    console.error('An error occurred while loading the data:', error);
  }
}
