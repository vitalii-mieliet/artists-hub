import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

document.addEventListener('DOMContentLoaded', function () {
    const reviewsList = document.querySelector('.splide__list');

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

    const createStars = count => {
        return Array.from(
            { length: count },
            () =>
                `<svg class="reviews-icon-stars" width="20" height="20">
        <use href="../assets/svg/sprite.svg#icon-stars"></use>
    </svg>`
        ).join('');
    };

    const slidesMarkup = reviewsData
        .map(
            ({ author, quote, rating }) => `
    <li class="splide__slide reviews-slide">
        <ul class="reviews-stars">
            ${createStars(rating)}
        </ul>
        <p class="reviews-quote">"${quote}"</p>
        <p class="reviews-author">${author}</p>
    </li>
    `
        )
        .join('');

    reviewsList.innerHTML = slidesMarkup;
});

document.addEventListener('DOMContentLoaded', function () {
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

