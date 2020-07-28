import { PopupWithForm } from "./PopupWithForm.js";
export class PopupChangeAvatar extends PopupWithForm{
  constructor({ selectorPopup, submitForm }) {
    super({ selectorPopup, submitForm });
  }

  open() {
    super.open();
    const avatarPhoto = document.querySelector('.profile__avatar');
    this._selectorPopup.querySelector('#url-avatar').value = avatarPhoto.src;
  }
}