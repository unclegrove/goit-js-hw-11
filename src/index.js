// Module
import axios from 'axios';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Inner JS
import { ref } from './js/refs';
import { getImages, config } from './js/api-request';
import renderGallery from './js/mark-up';
import LoadButton from './js/load-btn';

let srchQuery = '';
const loadBtn = new LoadButton();
loadBtn.hideBtn();
ref.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  config.params.page = 1;
  ref.gallery.innerHTML = '';

  const value = e.currentTarget.searchQuery.value.trim();

  if (value !== '') {
    getImages(value)
      .then(({ data }) => {
        if (data.totalHits === 0) {
          loadBtn.hideBtn();
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          renderGallery(data.hits);

          const limit = Math.ceil(data.totalHits / config.params.per_page);
          console.log(config.params.page > limit);
          if (config.params.page >= limit) {
            loadBtn.hideBtn();
            Notiflix.Notify.warning(
              `We're sorry, but you've reached the end of search results.`
            );
          } else {
            loadBtn.showBtn();
          }

          //loadBtn.showBtn();
          let lightboxGallery = new SimpleLightbox('.gallery a', {
            captions: true,
            captionsData: 'alt',
            captionsDelay: '250ms',
          });
          Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
          srchQuery = value;
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        ref.form.reset();
      });
  }

  if (value.length === 0) {
    Notiflix.Notify.warning('Please enter some text.');
  }
}

ref.loadBtn.addEventListener('click', onLoadBtnClick);

function onLoadBtnClick(e) {
  config.params.page += 1;

  getImages(srchQuery)
    .then(({ data }) => {
      renderGallery(data.hits);
      let lightboxGallery = new SimpleLightbox('.gallery a', {
        captions: true,
        captionsData: 'alt',
        captionsDelay: '250ms',
      });

      const limit = Math.ceil(data.totalHits / config.params.per_page);
      console.log(config.params.page > limit);
      if (config.params.page >= limit) {
        loadBtn.hideBtn();
        Notiflix.Notify.warning(
          `We're sorry, but you've reached the end of search results.`
        );
      }
    })
    .catch(error => console.log(error));
}
