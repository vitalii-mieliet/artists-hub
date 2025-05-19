import { Splide } from '../libs';

let splideInstance = null;

function generateFeedbackSlidesMarkup(reviewsData) {
  const generateStars = count =>
    Array.from(
      { length: Math.round(count) },
      () => `
      <svg class="reviews-icon-stars" width="20" height="20">
        <use href="../assets/svg/sprite.svg#icon-stars"></use>
      </svg>`
    ).join('');

  return reviewsData
    .map(
      ({ name, descr, rating }) => `
      <li class="splide__slide reviews-slide">
        <ul class="reviews-stars">${generateStars(rating)}</ul>
        <p class="reviews-quote">"${descr}"</p>
        <p class="reviews-author">${name}</p>
      </li>`
    )
    .join('');
}

export function renderFeedbackSlider(reviewsData) {
  const container = document.querySelector('.splide__list');
  if (!container) {
    console.error('Container ".splide__list" not found.');
    return;
  }

  // 🔥 Знищити попередній Splide, якщо він був
  if (splideInstance) {
    splideInstance.destroy(true); // повне знищення
  }

  container.innerHTML = generateFeedbackSlidesMarkup(reviewsData);

  requestAnimationFrame(() => {
    splideInstance = new Splide('.splide', {
      type: 'loop',
      autoplay: false,
      interval: 4000,
      pauseOnHover: true,
      arrows: false,
      pagination: true,

      speed: 800,
    });

    splideInstance.mount();

    const prev = document.getElementById('prev-arrow');
    const next = document.getElementById('next-arrow');

    if (prev && next) {
      prev.addEventListener('click', () => splideInstance.go('<'));
      next.addEventListener('click', () => splideInstance.go('>'));
    }
  });
}
