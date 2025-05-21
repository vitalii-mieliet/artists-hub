// loader-modal.js

const loaderModal = document.querySelector('.js-loader-modal');

export function showLoader() {
  if (loaderModal) {
    loaderModal.classList.add('is-open');
  }
}

export function hideLoader() {
  if (loaderModal) {
    loaderModal.classList.remove('is-open');
  }
}
