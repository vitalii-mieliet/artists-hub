import { getGenreList } from '../api/soundWaveAPI';

export async function renderGenreFilter() {
  const container = document.querySelector('[data-genre-list]');
  if (!container) return;

  try {
    const genres = await getGenreList();

    const markup = genres
      .map(
        genre => `
        <label class="artist-custom-radio">
          <input type="radio" name="sort-genre" value="${genre.genre}" />
          ${genre.genre}
          <span class="artist-radio-icon">
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.99997 8.58597L1.70697 5.29297L0.292969 6.70697L4.99997 11.414L14.707 1.70697L13.293 0.292969L4.99997 8.58597Z"
                fill="white" />
            </svg>
          </span>
        </label>
      `
      )
      .join('');

    container.innerHTML = markup;
  } catch (error) {
    console.error('Failed to load genres:', error);
  }
}
