import { handleArtistsList } from './js/presenters/artist-list-presenter';
import { handleRevies } from './js/presenters/feedback-presenter';
import { handlArtistDetails } from './js/views/artist-details-view';

document.addEventListener('DOMContentLoaded', function () {
  handleArtistsList();
  handleRevies();
  handlArtistDetails('65ada833af9f6d155db48eaa');
});
