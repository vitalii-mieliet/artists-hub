import { handleArtistsList } from './js/presenters/artist-list-presenter';
import { handleRevies } from './js/presenters/feedback-presenter';
import './js/controllers/mobile-menu';
import './js/artists-filter';
import { renderGenreFilter } from './js/views/render-genres';

document.addEventListener('DOMContentLoaded', function () {
  handleArtistsList();
  handleRevies();
  renderGenreFilter();
});
