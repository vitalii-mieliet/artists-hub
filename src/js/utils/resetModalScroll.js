export function resetModalScroll() {
  const selectors = [
    '.modal-backdrop',
    '.artist-modal',
    '.js-modal-artist-detail-info',
  ];

  selectors.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) el.scrollTop = 0;
  });
}
