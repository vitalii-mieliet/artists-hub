import { apiResponses } from './js/api/soundWaveAPI';
import { appendReviews } from './js/controllers/reviews-controller';

document.addEventListener('DOMContentLoaded', function () {
  appendReviews();
  apiResponses();
});
