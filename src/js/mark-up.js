import { ref } from './refs';

export default function renderGallery(images) {
  const renderGalleryImages = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="link" href="${largeImageURL}">
            <div class="photo-card">
            <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
            <p class="info-item"><b>Likes: </b>${likes}</p>
            <p class="info-item"><b>Views: </b>${views}</p>
            <p class="info-item"><b>Comments: </b>${comments}</p>
            <p class="info-item"><b>Downloads: </b>${downloads}</p>
            </div>
            </div>
            </a>`;
      }
    )
    .join('');

  ref.gallery.insertAdjacentHTML('beforeend', renderGalleryImages);
}
