const mobileMenu = document.querySelector('.mobile-menu');
const btnOpenMenu = document.querySelector('.js-mobile-menu');
const btnCloseMenu = document.querySelector('.js-menu-close');

function openMenu() {
  mobileMenu.classList.add('is-open');
}

function closeMenu() {
  mobileMenu.classList.remove('is-open');
}

btnOpenMenu.onclick = openMenu;
btnCloseMenu.onclick = closeMenu;

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

mobileMenu.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.onclick = closeMenu;
});
