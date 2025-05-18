export function renderSlide(reviewsData) {
  const createStars = count => {
    return Array.from(
      { length: count },
      () =>
        `<svg class="reviews-icon-stars" width="20" height="20">
        <use href="../assets/svg/sprite.svg#icon-stars"></use>
    </svg>`
    ).join('');
  };

  return reviewsData
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
}
