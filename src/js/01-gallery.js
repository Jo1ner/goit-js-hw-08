// Add imports above this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
let instance;
function createGalleryMarkup(galleryItems) {
    const markup = galleryItems.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    }).join("");
    return markup;
}

function openModal(event) {
  event.preventDefault();
  
  if (event.target.nodeName !== 'IMG') return;
  
  const imageSrc = event.target.getAttribute('src');
  const imageAlt = event.target.getAttribute('alt');
  
  const instance = basicLightbox.create(
    `<div class="modal">
    <img src="${imageSrc}" alt="${imageAlt}">
    </div>`);
  
    instance.show();
    document.addEventListener('keydown', closeModalPressEscape);
};

function closeModalPressEscape(event) {
  if (event.code === 'Escape') {

    instance.close();
    document.removeEventListener('keydown', closeModalPressEscape);
  }
};

galleryContainer.addEventListener('click', openModal);
