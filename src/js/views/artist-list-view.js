import { getGenreList } from '../api/soundWaveAPI';
import { iziToast } from '../libs';

const refs = {
  list: document.querySelector('.artists-list'),
};

export function renderArtists(artists) {
  if (!refs.list) return;

  const markup = artists
    .map(
      ({
        _id,
        strArtist,
        strArtistThumb,
        genres,
        strBiographyEN = 'No description available',
      }) => {
        return `
        <li class="artist-card">
          <div class="artist-img-wraper">
            <img src="${strArtistThumb}" alt="${strArtist}" class="artist-img" width="640" height="393" />
          </div>
          <ul class="artist-genres-list">
            ${genres
              .map(g => `<li class="artist-genres-list-item">${g}</li>`)
              .join('')}
          </ul>
          <h3 class="artist-name">${strArtist}</h3>
          <p class="artist-desc">${strBiographyEN}</p>
          <button
  class="learn-more-btn js-learn-more-btn"
  data-artist-id="${_id}"
  data-genres='${JSON.stringify(genres)}'
>
  Learn More
  <span>
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 19.9426L17 12.9426L9 5.94263V19.9426Z" fill="white" />
</svg>
  </span>
</button>
        </li>`;
      }
    )
    .join('');

  refs.list.insertAdjacentHTML('beforeend', markup);
}

export function showError(
  message = 'Something went wrong. Please try again later.'
) {
  iziToast.error({
    title: 'Error',
    message,
    position: 'topRight',
    timeout: 3000,
    progressBar: true,
    close: true,
    closeOnClick: true,
  });
}

export function clearArtists() {
  if (refs.list) refs.list.innerHTML = '';
}
export function getCurrentFilters() {
  const query = document.querySelector('[data-artist-search]')?.value.trim();
  const genre = document.querySelector(
    'input[name="sort-genre"]:checked'
  )?.value;

  let sortName = document.querySelector('input[name="sort"]:checked')?.value;
  if (sortName === 'default') {
    sortName = undefined;
  }

  return Object.fromEntries(
    Object.entries({ query, genre, sortName }).filter(
      ([_, val]) => val !== '' && val !== undefined
    )
  );
}
export async function renderGenres() {
  const container = document.querySelector('[data-genre-list]');
  if (!container) return;

  try {
    const genres = await getGenreList();

    // Додай пункт "All genres" на початок
    genres.unshift({ _id: 'default', genre: 'All genres', value: '' });

    const markup = genres
      .map(
        (genre, index) => `
        <label class="artist-custom-radio">
          <input
            type="radio"
            name="sort-genre"
            value="${genre.value ?? genre.genre}"
            ${index === 0 ? 'checked' : ''}
          />
          ${genre.genre}
          <span class="artist-radio-icon">
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
              <path
                d="M4.99997 8.58597L1.70697 5.29297L0.292969 6.70697L4.99997 11.414L14.707 1.70697L13.293 0.292969L4.99997 8.58597Z"
                fill="white"
              />
            </svg>
          </span>
        </label>
      `
      )
      .join('');

    container.innerHTML = markup;
  } catch (error) {
    console.error('🔥 Failed to render genres:', error);
  }
}
