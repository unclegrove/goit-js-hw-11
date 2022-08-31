import { ref } from './refs';

export default class LoadButton {
  constructor() {
    this.btn = ref.loadBtn;
  }

  showBtn() {
    this.btn.classList.remove('is-hidden');
  }

  hideBtn() {
    this.btn.classList.add('is-hidden');
  }
}
