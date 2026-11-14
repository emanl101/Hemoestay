const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');
const caption = lightbox.querySelector('#caption');

document.querySelectorAll('[data-caption]').forEach(button => {
  button.addEventListener('click', () => {
    const photo = button.querySelector('img');
    lightboxImage.src = photo.src.split('?')[0];
    lightboxImage.alt = photo.alt;
    caption.textContent = button.dataset.caption;
    lightbox.showModal();
  });
});

