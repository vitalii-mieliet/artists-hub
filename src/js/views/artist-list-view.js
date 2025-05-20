import { iziToast } from '../libs';

const refs = {
  list: document.querySelector('.artists-list'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

export function renderArtists(artists) {
  if (!refs.list) return;

  if (!artists || artists.length === 0) {
    refs.list.innerHTML = '<li class="artist-card">No artists found.</li>';
    return;
  }

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
          <button class="learn-more-btn js-learn-more-btn" data-artist-id="${_id}">
            Learn More
            <span>
              <svg class="learn-more-icon-caret-right" width="24" height="24">
                <use href="./assets/svg/sprite.svg#icon-caret-right"></use>
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

export function toggleLoadMoreButton(show) {
  if (!refs.loadMoreBtn) return;
  refs.loadMoreBtn.style.display = show ? 'flex' : 'none';
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

export function clearArtistsList() {
  if (!refs.list) return;
  refs.list.innerHTML = '';
}
