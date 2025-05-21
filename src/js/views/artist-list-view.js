import { iziToast } from '../libs';

const refs = {
  list: document.querySelector('.artists-list'),
  loader: document.querySelector('.loader'),
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

export function toggleLoader(show) {
  if (!refs.loader) return;
  refs.loader.classList.toggle('is-hidden', !show);
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
