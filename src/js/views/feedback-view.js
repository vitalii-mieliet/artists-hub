import { Splide } from '../libs';

let splideInstance = null;
let paginationBaseIndex = 0;

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

  // Визначаємо базовий індекс кнопок
  paginationBaseIndex = 0;

  const buttonsMarkup = Array.from({ length: buttonsToRender }, (_, i) => {
    return `<button class="pagination-btn" data-index="${i}"></button>`;
  }).join('');

  container.innerHTML = buttonsMarkup;

  const buttons = container.querySelectorAll('.pagination-btn');
  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const slideIndex = paginationBaseIndex + i;
      splideInstance.go(slideIndex);
    });
  });
}


// function renderCustomPagination(container, totalPages) {
//   if (!container) return;

//   const buttonsToRender = 3;

//   const buttonsMarkup = Array.from({ length: buttonsToRender }, (_, i) => {
//     return `<button class="pagination-btn" data-index="${i}"></button>`;
//   }).join('');

//   container.innerHTML = buttonsMarkup;

//   const buttons = container.querySelectorAll('.pagination-btn');
//   buttons.forEach((btn, i) => {
//     btn.addEventListener('click', () => {
//       const slideIndex = getSlideIndexForButton(
//         i,
//         totalPages,
//         splideInstance.index
//       );
//       splideInstance.go(slideIndex);
//     });
//   });
// }


function updatePagination(currentIndex, totalPages) {
  const buttons = document.querySelectorAll('.pagination-btn');
  if (!buttons.length) return;

  if (currentIndex === 0) {
    paginationBaseIndex = 0;
  } else if (currentIndex === totalPages - 1) {
    paginationBaseIndex = totalPages - 3;
  } else {
    paginationBaseIndex = currentIndex - 1;
  }

  const activePos = currentIndex - paginationBaseIndex;

  buttons.forEach((btn, i) => {
    btn.classList.toggle('active', i === activePos);
  });
}

// function updatePagination(currentIndex, totalPages) {
//   const buttons = document.querySelectorAll('.pagination-btn');
//   if (!buttons.length) return;

//   let activePos;
//   if (currentIndex === 0) {
//     activePos = 0;
//   } else if (currentIndex === totalPages - 1) {
//     activePos = 2;
//   } else {
//     activePos = 1; // центральна кнопка
//   }

//   buttons.forEach((btn, i) => {
//     btn.classList.toggle('active', i === activePos);
//   });
// }

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

function updateArrowState(currentIndex, totalSlides) {
  const prev = document.getElementById('prev-arrow');
  const next = document.getElementById('next-arrow');
  if (!prev || !next || !splideInstance) return;

  const isAtStart = currentIndex === 0;
  // const isAtEnd = currentIndex === totalSlides - 1;
  const isAtEnd = currentIndex === splideInstance.Components.Controller.getEnd();

  prev.disabled = isAtStart;
  next.disabled = isAtEnd;
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
      type: 'slide',
      perPage: 1,
      autoplay: false,
      arrows: false,
      pagination: false,
    });

    splideInstance.mount();

    const prev = document.getElementById('prev-arrow');
    const next = document.getElementById('next-arrow');

    // Клік по стрілках
    if (prev && next) {
      prev.addEventListener('click', () => splideInstance.go('<'));
      next.addEventListener('click', () => splideInstance.go('>'));
    }

    // Подія при зміні слайду
    splideInstance.on('mounted move', newIndex => {
      updatePagination(newIndex, reviewsData.length);
      updateArrowState(newIndex, reviewsData.length); // ← додано
    });

    // Початковий стан стрілок
    updateArrowState(0, reviewsData.length); // ← додано

    renderCustomPagination(paginationContainer, reviewsData.length);
    updatePagination(0, reviewsData.length);

    // if (prev && next) {
    //   prev.addEventListener('click', () => splideInstance.go('<'));
    //   next.addEventListener('click', () => splideInstance.go('>'));
    // }

    // renderCustomPagination(paginationContainer, reviewsData.length);

    splideInstance.on('move', newIndex => {
      updatePagination(newIndex, reviewsData.length);
    });

    updatePagination(0, reviewsData.length);
  });
}
