import { PopupWithForm } from "./PopupWithForm.js";
export class PopupDeleteCard extends PopupWithForm {
  constructor({ selectorPopup, submitForm }) {
    super({ selectorPopup, submitForm });
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  setEventListeners() {
    this._selectorPopup
      .querySelector(".popup__container")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        this.handleConfirmForm(evt);
      });
    this.buttonClose = this._selectorPopup.querySelector(
      ".popup__button-close"
    );
    this.buttonClose.addEventListener("click", () => {
      this.close();
    });
  }

  submit(handleConfirmForm) {
    this.handleConfirmForm = handleConfirmForm;
  }
}











    
    evt => {
      const likeButton = evt.target;
      const likesCount = likeButton.closest('.element__likes').querySelector('.element__like-count');
      likeButton.classList.toggle('element__like_liked');
      if (likeButton.classList.contains('element__like_liked')) {
        item.likes.push(item.owner);
        api.likeCard(item._id)
          .then(() => likesCount.textContent = item.likes.length);
      } else {
        item.likes.pop(item.owner);
        api.unlikeCard(item._id)
          .then(() => likesCount.textContent = item.likes.length);
      }
    }