const starRating = document.getElementById('starRating');
const starsCount = 5;

for (let i = 1; i <= starsCount; i++) {
    const span = document.createElement('span');
    span.className = 'reviews-star';
    span.dataset.value = i;

    span.innerHTML = `
  <svg class="reviews-feedback-star" width="24" height="24" viewBox="0 0 24 24">
    <defs>
      <mask id="star-mask-${i}">
        <rect x="0" y="0" width="0%" height="100%" fill="white" />
      </mask>
    </defs>
    <use href="../assets/svg/sprite.svg#icon-stars" fill="var(--color-scheme-1-text)"></use>
    <use href="../assets/svg/sprite.svg#icon-stars" fill="var(--color-affair)" mask="url(#star-mask-${i})"></use>
  </svg>
`;

    starRating.appendChild(span);
}

// зірки у процентах
const stars = document.querySelectorAll('.reviews-star');
const ratingInput = document.getElementById('ratingValue');

stars.forEach((star, i) => {
    const svg = star.querySelector('svg');

    star.addEventListener('mousemove', e => {
        const rect = star.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        let percent = (offsetX / rect.width) * 100;

        if (percent < 0) percent = 0;
        if (percent > 100) percent = 100;

        updateMasks(i, percent);
    });

    star.addEventListener('mouseleave', () => {
        applyStoredRating();
    });

    star.addEventListener('click', e => {
        const rect = star.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        let percent = offsetX / rect.width;

        if (percent < 0) percent = 0;
        if (percent > 1) percent = 1;

        const finalValue = i + percent;

        ratingInput.value = finalValue.toFixed(2);
    });
});

function updateMasks(index, percent) {
    stars.forEach((star, i) => {
        const svg = star.querySelector('svg');
        const maskRect = svg.querySelector('mask rect');

        if (i < index) {
            maskRect.setAttribute('width', '100%');
        } else if (i === index) {
            maskRect.setAttribute('width', `${percent}%`);
        } else {
            maskRect.setAttribute('width', '0%');
        }
    });
}

function applyStoredRating() {
    const value = parseFloat(ratingInput.value);
    const full = Math.floor(value);
    const fraction = value - full;

    stars.forEach((star, i) => {
        const svg = star.querySelector('svg');
        const maskRect = svg.querySelector('mask rect');

        if (i < full) {
            maskRect.setAttribute('width', '100%');
        } else if (i === full) {
            maskRect.setAttribute('width', `${fraction * 100}%`);
        } else {
            maskRect.setAttribute('width', '0%');
        }
    });
}

// Запускаємо при першому завантаженні, щоб відобразити початковий рейтинг (0)
applyStoredRating();

// Відкриття та закриття модального вікна
const openBtn = document.getElementById('addFeedbackBtn');
const modal = document.querySelector('.reviews-modal');
const closeBtn = document.querySelector('.reviews-modal-close');

openBtn.addEventListener('click', () => {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // блокує прокрутку фону
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // розблокує прокрутку
});

// Додатково: закриття при кліку поза вікном
modal.addEventListener('click', e => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
});