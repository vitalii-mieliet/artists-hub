import Splide from '@splidejs/splide';
import '@splidejs/splide/css';
import { renderSlide } from './js/views/reviews-render';

const reviewsData = [
  {
    author: 'Emily Johnson',
    quote: `ArtistsHub has transformed the way I discover new music. It's
  like having a personal DJ that knows my taste perfectly!`,
    rating: 4,
  },
  {
    author: 'Mishka Johnson',
    quote: `ArtistsHub has transformed the way I discover new music. It's
  like having a personal DJ that knows my taste perfectly!`,
    rating: 5,
  },
  {
    author: 'Bloger Mihailo',
    quote: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet fuga dicta ad quia, nostrum aliquid ullam enim recusandae quod totam reprehenderit dolorem? Eum fugit quasi commodi dolores et nostrum consequuntur.`,
    rating: 3,
  },
  {
    author: 'Misha Bloger',
    quote: `ArtistsHub has transformed the way I discover new music. It's
  like having a personal DJ that knows my taste perfectly!`,
    rating: 2,
  },
];

document.addEventListener('DOMContentLoaded', function () {
  const reviewsList = document.querySelector('.splide__list');
  const sliderHTML = renderSlide(reviewsData);
  reviewsList.innerHTML = sliderHTML;

  const splide = new Splide('.splide', {
    type: 'loop',
    autoplay: false,
    interval: 4000,
    pauseOnHover: true,
    arrows: false,
    pagination: true,
    speed: 800,
  });
  splide.mount();

  document
    .getElementById('prev-arrow')
    .addEventListener('click', () => splide.go('<'));
  document
    .getElementById('next-arrow')
    .addEventListener('click', () => splide.go('>'));
});
