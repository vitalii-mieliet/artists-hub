document.addEventListener('DOMContentLoaded', () => {
  const filterBtn = document.querySelector('.artist-button-filters');
  const arrowIcon = filterBtn.querySelector('.arrow-icon');
  const modalBox = document.querySelector('.artist-modal-filters-box');
  const toggleBtns = document.querySelectorAll(
    '.artist-sort-name[data-toggle-js]'
  );
  const toggleSections = document.querySelectorAll('[data-artist-modal]');
  const radioInputs = document.querySelectorAll('input[type="radio"]');
  const searchInput = document.querySelector('[data-artist-search]');
  const searchBtn = document.querySelector('.artist-search-button');

  const filterState = {
    sort: null,
    genre: null,
    search: null,
  };

  // Відкриття/закриття головного фільтра
  filterBtn.addEventListener('click', e => {
    e.stopPropagation();
    modalBox.classList.toggle('open');
    arrowIcon.classList.toggle('rotated');
  });

  // Відкриття Sorting / Genre
  toggleBtns.forEach((btn, index) => {
    const section = toggleSections[index];
    const icon = btn.querySelector('svg');

    btn.addEventListener('click', e => {
      e.stopPropagation();

      const isOpen = section.classList.contains('open');

      toggleSections.forEach(sec => sec.classList.remove('open'));
      toggleBtns.forEach(b => {
        b.classList.remove('active');
        const svg = b.querySelector('svg');
        svg?.classList.remove('rotated');
      });

      if (!isOpen) {
        section.classList.add('open');
        btn.classList.add('active');
        icon?.classList.add('rotated');
      }
    });
  });

  // Вибір радіокнопок
  radioInputs.forEach(radio => {
    radio.addEventListener('change', () => {
      const group = radio.name;
      const value = radio.parentElement.textContent.trim();

      if (value === 'Default') {
        // Скидаємо обидві групи
        radioInputs.forEach(r => {
          if (r !== radio) r.checked = false;
        });

        filterState.sort = null;
        filterState.genre = null;

        // НЕ закриваємо меню
        applyFilters(filterState);
        return;
      }

      // Звичайне вибрання
      if (group === 'sort') {
        filterState.sort = value;
      } else if (group === 'sort-genre') {
        filterState.genre = value;
      }

      closeAllMenus();
      applyFilters(filterState);
    });
  });

  // Пошук
  searchBtn.addEventListener('click', e => {
    e.stopPropagation();
    const query = searchInput.value.trim();
    if (!query) return;

    filterState.search = query;
    closeAllMenus();
    applyFilters(filterState);
  });

  // Закриття при кліку поза фільтром
  document.addEventListener('click', e => {
    const isClickInside =
      modalBox.contains(e.target) || filterBtn.contains(e.target);
    if (!isClickInside) {
      closeAllMenus();
    }
  });

  // Закриття меню та очищення стилів
  function closeAllMenus() {
    modalBox.classList.remove('open');
    arrowIcon.classList.remove('rotated');

    toggleSections.forEach(section => section.classList.remove('open'));
    toggleBtns.forEach(btn => {
      btn.classList.remove('active');
      const svg = btn.querySelector('svg');
      svg?.classList.remove('rotated');
    });
  }

  // API-запит
  function applyFilters({ sort, genre, search }) {
    const params = {};

    if (sort) params.sort = sort;
    if (genre) params.genre = genre;
    if (search) params.q = search;

    axios
      .get('/api/artists', { params })
      .then(res => {
        renderArtists(res.data);
      })
      .catch(err => {
        console.error('API Error:', err);
      });
  }

  // Рендер результатів
  function renderArtists(artists) {
    console.log('🎨 Artists:', artists);
    // TODO: вставити шаблон рендеру
  }
});
