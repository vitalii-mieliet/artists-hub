import { Splide } from '../libs';
import { renderSlide } from '../views/feedback-view';

const reviewsData = [
  {
    author: 'Emily Johnson',
    quote:
      "ArtistsHub has transformed the way I discover new music. It's like having a personal DJ that knows my taste perfectly!",
    rating: 4,
  },
  {
    author: 'Mishka Johnson',
    quote:
      "ArtistsHub has transformed the way I discover new music. It's like having a personal DJ that knows my taste perfectly!",
    rating: 5,
  },
  {
    author: 'Bloger Mihailo',
    quote:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet fuga dicta ad quia, nostrum aliquid ullam enim recusandae quod totam reprehenderit dolorem? Eum fugit quasi commodi dolores et nostrum consequuntur.',
    rating: 3,
  },
  {
    author: 'Misha Bloger',
    quote:
      "ArtistsHub has transformed the way I discover new music. It's like having a personal DJ that knows my taste perfectly!",
    rating: 2,
  },
];

export function appendReviews() {
  const reviewsList = document.querySelector('.splide__list');
  const sliderMarkup = renderSlide(reviewsData);
  reviewsList.innerHTML = sliderMarkup;

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
}
