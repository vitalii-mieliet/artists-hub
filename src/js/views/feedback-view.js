import { Splide } from '../libs';

let splideInstance = null;


function generateStarSVG(rating) {
  const percent = Math.min(100, (rating / 5) * 100);
  const maskId = `starMask-${Math.random().toString(36).substr(2, 9)}`;
  const starPath = `M12 2l3.09 6.26L22 9.27l-5.18 5.05L17.91 22 12 18.56 6.09 22l1.18-7.68L2 9.27l6.91-1.01L12 2z`;

  return `
    <svg class="reviews-stars-svg" width="120" height="24" viewBox="0 0 120 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="${maskId}">
          <g style="fill: var(--color-scheme-1-text);">
            <path d="${starPath}" transform="translate(0)" />
            <path d="${starPath}" transform="translate(24)" />
            <path d="${starPath}" transform="translate(48)" />
            <path d="${starPath}" transform="translate(72)" />
            <path d="${starPath}" transform="translate(96)" />
          </g>
        </mask>
      </defs>

      <!-- Сірі зірки -->
      <g style="fill: var(--color-scheme-1-text);">
        <path d="${starPath}" transform="translate(0)" />
        <path d="${starPath}" transform="translate(24)" />
        <path d="${starPath}" transform="translate(48)" />
        <path d="${starPath}" transform="translate(72)" />
        <path d="${starPath}" transform="translate(96)" />
      </g>

      <!-- Фіолетова заливка по масці -->
      <g mask="url(#${maskId})">
        <rect width="${percent}%" height="24" style="fill: var(--color-affair);" />
      </g>
    </svg>
  `;
}


// function generateStarSVG(rating) {
//   const percent = Math.min(100, (rating / 5) * 100); // розрахунок %

//   const maskId = `starMask-${Math.random().toString(36).substr(2, 9)}`; // унікальний ID

//   return `
//     <svg class="reviews-stars-svg" width="120" height="20" viewBox="0 0 120 20" xmlns="http://www.w3.org/2000/svg">
//       <defs>
//         <symbol id="star" viewBox="0 0 24 24">
//           <path d="M12 2l3.09 6.26L22 9.27l-5.18 5.05L17.91 22 12 18.56 6.09 22l1.18-7.68L2 9.27l6.91-1.01L12 2z" fill="white" />
//         </symbol>
//         <mask id="${maskId}">
//           <g fill="white">
//             <use href="#star" x="0" y="0" width="20" height="20" />
//             <use href="#star" x="24" y="0" width="20" height="20" />
//             <use href="#star" x="48" y="0" width="20" height="20" />
//             <use href="#star" x="72" y="0" width="20" height="20" />
//             <use href="#star" x="96" y="0" width="20" height="20" />
//           </g>
//         </mask>
//       </defs>

//       <!-- Білі зірки -->
//       <g>
//         <use href="#star" x="0" y="0" width="20" height="20" fill="#eee" />
//         <use href="#star" x="24" y="0" width="20" height="20" fill="#eee" />
//         <use href="#star" x="48" y="0" width="20" height="20" fill="#eee" />
//         <use href="#star" x="72" y="0" width="20" height="20" fill="#eee" />
//         <use href="#star" x="96" y="0" width="20" height="20" fill="#eee" />
//       </g>

//       <!-- Фіолетова заливка -->
//       <g mask="url(#${maskId})">
//         <rect width="${percent}%" height="20" fill="purple" />
//       </g>
//     </svg>
//   `;
// }



// function generateFeedbackSlidesMarkup(reviewsData) {
//   const generateStars = count =>
//     Array.from(
//       { length: Math.round(count) },
//       () => `
//       <svg class="reviews-icon-stars" width="20" height="20">
//         <use href="../assets/svg/sprite.svg#icon-stars"></use>
//       </svg>`
//     ).join('');

//   return reviewsData
//     .map(
//       ({ name, descr, rating }) => `
//       <li class="splide__slide reviews-slide">
//         <ul class="reviews-stars">${generateStars(rating)}</ul>
//         <p class="reviews-quote">"${descr}"</p>
//         <p class="reviews-author">${name}</p>
//       </li>`
//     )
//     .join('');
// }


function generateFeedbackSlidesMarkup(reviewsData) {
  return reviewsData
    .map(
      ({ name, descr, rating }) => `
      <li class="splide__slide reviews-slide">
        <div class="reviews-stars">${generateStarSVG(rating)}</div>
        <p class="reviews-quote">"${descr}"</p>
        <p class="reviews-author">${name}</p>
      </li>`
    )
    .join('');
}


function renderCustomPagination(container, totalPages) {
  if (!container) return;

  const buttonsToRender = 3;
  const buttonsMarkup = Array.from({ length: buttonsToRender }, (_, i) => {
    return `<button class="pagination-btn" data-index="${i}"></button>`;
  }).join('');

  container.innerHTML = buttonsMarkup;

  const buttons = container.querySelectorAll('.pagination-btn');
  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const slideIndex = getSlideIndexForButton(i, totalPages, splideInstance.index);
      splideInstance.go(slideIndex);
    });
  });
}

function updatePagination(currentIndex, totalPages) {
  const buttons = document.querySelectorAll('.pagination-btn');
  if (!buttons.length) return;

  let activePos;
  if (currentIndex === 0) {
    activePos = 0;
  } else if (currentIndex === totalPages - 1) {
    activePos = 2;
  } else {
    activePos = 1; // центральна кнопка
  }

  buttons.forEach((btn, i) => {
    btn.classList.toggle('active', i === activePos);
  });
}


function getSlideIndexForButton(btnIndex, totalPages, currentIndex) {
  if (currentIndex === 0) {
    // перший слайд: кнопки 0 → 0, 1 → 1, 2 → 2
    return btnIndex;
  } else if (currentIndex === totalPages - 1) {
    // останній слайд: кнопки 0 → totalPages - 3, 1 → totalPages - 2, 2 → totalPages - 1
    return totalPages - 3 + btnIndex;
  } else {
    // проміжні слайди: кнопки 0 → current - 1, 1 → current, 2 → current + 1
    return currentIndex - 1 + btnIndex;
  }
}


export function renderFeedbackSlider(reviewsData) {
  const container = document.querySelector('.splide__list');
  const paginationContainer = document.querySelector('.custom-pagination');

  if (!container) {
    console.error('Container ".splide__list" not found.');
    return;
  }

  if (splideInstance) splideInstance.destroy(true);

  container.innerHTML = generateFeedbackSlidesMarkup(reviewsData);

  requestAnimationFrame(() => {
    splideInstance = new Splide('.splide', {
      type: 'loop',
      perPage: 1,
      autoplay: false,
      arrows: false,
      pagination: false, // вимикаємо стандартну пагінацію
    });

    splideInstance.mount();

    const prev = document.getElementById('prev-arrow');
    const next = document.getElementById('next-arrow');

    if (prev && next) {
      prev.addEventListener('click', () => splideInstance.go('<'));
      next.addEventListener('click', () => splideInstance.go('>'));
    }


    renderCustomPagination(paginationContainer, reviewsData.length);

    splideInstance.on('move', (newIndex) => {
      updatePagination(newIndex, reviewsData.length);
    });

    updatePagination(0, reviewsData.length);
  });
}





// export function renderFeedbackSlider(reviewsData) {
//   const container = document.querySelector('.splide__list');
//   if (!container) {
//     console.error('Container ".splide__list" not found.');
//     return;
//   }

//   // 🔥 Знищити попередній Splide, якщо він був
//   if (splideInstance) {
//     splideInstance.destroy(true); // повне знищення
//   }

//   container.innerHTML = generateFeedbackSlidesMarkup(reviewsData);

//   requestAnimationFrame(() => {
//     splideInstance = new Splide('.splide', {
//       type: 'loop',
//       autoplay: false,
//       interval: 4000,
//       pauseOnHover: true,
//       arrows: false,
//       pagination: true,

//       speed: 800,
//     });

//     splideInstance.mount();




//     const prev = document.getElementById('prev-arrow');
//     const next = document.getElementById('next-arrow');

//     if (prev && next) {
//       prev.addEventListener('click', () => splideInstance.go('<'));
//       next.addEventListener('click', () => splideInstance.go('>'));
//     }
//   });
// }
