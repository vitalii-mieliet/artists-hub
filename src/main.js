import { handleArtistsList } from './js/presenters/artist-list-presenter';
import { handleRevies } from './js/presenters/feedback-presenter';
import './js/controllers/mobile-menu';

document.addEventListener('DOMContentLoaded', function () {
  handleArtistsList();
  handleRevies();
});
