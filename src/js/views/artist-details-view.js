import spriteUrl from '/assets/svg/sprite.svg';
export function renderArtistDetails(data) {
  const infoWrapper = document.querySelector('.js-modal-artist-detail-info');

  infoWrapper.innerHTML = '';
  const infoMarkup = ` <h2 class="artist-modal-name">${data.strArtist}</h2>
      <div class="artist-modal-biography-field">
        <div class="artist-modal-img-wrapper">
          <img
            class="artist-modal-album-img"
            src="${data.strArtistThumb}"
            alt="${data.strArtist}"
          />
        </div>
        <div class="artist-modal-album-list-wrapper">
          <!-- <div class="artist-modal-biography-wrapper"> -->
          <ul class="artist-modal-album-list">
            <li class="artist-modal-album-list-item">
              <p class="modal-album-list-item-title">Years active</p>
              <p class="modal-album-list-item-value">${formatYears(
                data.intFormedYear,
                data.intDiedYear
              )}</p>
            </li>
            <li class="artist-modal-album-list-item">
              <p class="modal-album-list-item-title">Sex</p>
              <p class="modal-album-list-item-value">${data.strGender}</p>
            </li>
            <li class="artist-modal-album-list-item">
              <p class="modal-album-list-item-title">Members</p>
              <p class="modal-album-list-item-value">${data.intMembers}</p>
            </li>
            <li class="artist-modal-album-list-item">
              <p class="modal-album-list-item-title">Country</p>
              <p class="modal-album-list-item-value">${data.strCountry}</p>
            </li>
            <li class="artist-modal-album-list-item biography-list-item-text">
              <p class="modal-album-list-item-title">Biography</p>
              <p
                class="modal-album-list-item-value biography-paragraph scrollable js-biography-paragraph"
              >${data.strBiographyEN}
              </p>
              <button type="button" class="biography-toggle-btn js-biography-toggle">Show more</button>
            </li>
          </ul>
          <!-- </div> -->
          <ul class="artist-modal-genres-list">
          ${
            data.genres
              ?.map(
                genre =>
                  `<li class="artist-modal-genres-list-item">${genre}</li>`
              )
              .join('') ||
            '<li class="artist-modal-genres-list-item">No genres</li>'
          }
          </ul>
        </div>
      </div>`;
  infoWrapper.innerHTML = infoMarkup;
  renderAlbums(data.tracksList);

  const bioParagraph = document.querySelector('.js-biography-paragraph');
  const toggleBtn = document.querySelector('.js-biography-toggle');

  toggleBtn.addEventListener('click', () => {
    bioParagraph.classList.toggle('expanded');
    const isExpanded = bioParagraph.classList.contains('expanded');
    toggleBtn.textContent = isExpanded ? 'Show less' : 'Show more';
  });
}

function renderAlbums(tracks) {
  const albumsWrapper = document.querySelector(
    '.artist-modal-fetched-albums-wrapper'
  );
  albumsWrapper.innerHTML = '';

  const grouped = groupTracksByAlbum(tracks);

  Object.entries(grouped).forEach(([album, tracks]) => {
    const albumBlock = document.createElement('div');
    albumBlock.classList.add('artist-modal-album-container');

    albumBlock.innerHTML = `
        <h4 class="artist-modal-album-name">${album}</h4>
        <ul class="artist-modal-album-track-header-list">
          <li class="artist-modal-album-track-header-list-item">Track</li>
          <li class="artist-modal-album-track-header-list-item">Time</li>
          <li class="artist-modal-album-track-header-list-item">Link</li>
        </ul>
        <ul class="artist-modal-track-list">
          ${tracks
            .map(
              track => `
            <li class="artist-modal-track-list-item">
              <p class="artist-modal-track-list-item-song">${track.strTrack}</p>
              <p class="artist-modal-track-list-item-time">${formatTime(
                track.intDuration
              )}</p>
              ${
                track.movie
                  ? `
                <a class="artist-modal-track-list-item-link" href="${track.movie}" target="_blank">
                  <svg width="24" height="25" class="icon">
                  <use href="${spriteUrl}#icon-youtube"></use>
                  </svg>
                </a>
              `
                  : ''
              }
            </li>`
            )
            .join('')}
        </ul>
      `;
    albumsWrapper.append(albumBlock);
  });
}

function groupTracksByAlbum(tracks) {
  return tracks.reduce((acc, track) => {
    acc[track.strAlbum] = acc[track.strAlbum] || [];
    acc[track.strAlbum].push(track);
    return acc;
  }, {});
}

function formatYears(start, end) {
  return end ? `${start}–${end}` : `${start}–present`;
}

function formatTime(ms) {
  const totalSec = Math.floor(Number(ms) / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = String(totalSec % 60).padStart(2, '0');
  return `${min}:${sec}`;
}
