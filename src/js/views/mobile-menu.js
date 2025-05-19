const mobileMenu = document.querySelector('.mobile-menu');
const btnBurger = document.querySelector('.js-mobile-menu');
const burgerSpan = btnBurger.querySelector('span.burger');
const overlay = document.querySelector('.js-menu-overlay');

function toggleMenu() {
  const isOpen = mobileMenu.classList.toggle('is-open');
  overlay.classList.toggle('is-active', isOpen);
  burgerSpan.classList.toggle('is-closed', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
}

btnBurger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
    toggleMenu();
  }
});

mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', toggleMenu);
});
