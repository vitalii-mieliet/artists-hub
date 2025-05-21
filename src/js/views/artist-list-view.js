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
    <svg class="learn-more-icon-caret-right" width="24" height="24">
      <use href="/img/svg/sprite.svg#icon-caret-right"></use>
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
