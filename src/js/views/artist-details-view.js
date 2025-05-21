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
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.5928 7.25232C21.4789 6.82973 21.2563 6.44433 20.9472 6.13449C20.6381 5.82465 20.2532 5.60118 19.8308 5.48632C18.2648 5.05632 11.9998 5.04932 11.9998 5.04932C11.9998 5.04932 5.73584 5.04232 4.16884 5.45332C3.74677 5.57347 3.36266 5.8001 3.05341 6.11146C2.74415 6.42282 2.52013 6.80844 2.40284 7.23132C1.98984 8.79732 1.98584 12.0453 1.98584 12.0453C1.98584 12.0453 1.98184 15.3093 2.39184 16.8593C2.62184 17.7163 3.29684 18.3933 4.15484 18.6243C5.73684 19.0543 11.9848 19.0613 11.9848 19.0613C11.9848 19.0613 18.2498 19.0683 19.8158 18.6583C20.2383 18.5437 20.6236 18.3207 20.9335 18.0115C21.2434 17.7023 21.4672 17.3176 21.5828 16.8953C21.9968 15.3303 21.9998 12.0833 21.9998 12.0833C21.9998 12.0833 22.0198 8.81832 21.5928 7.25232ZM9.99584 15.0543L10.0008 9.05432L15.2078 12.0593L9.99584 15.0543Z" fill="white" />
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
