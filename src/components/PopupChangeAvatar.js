import { PopupWithForm } from "./PopupWithForm.js";
export class PopupChangeAvatar extends PopupWithForm{
  constructor({ selectorPopup, submitForm }) {
    super({ selectorPopup, submitForm });
  }
  
  handleForm(evt){
    evt.preventDefault();
    const avatarPhoto = document.querySelector('.profile__avatar');
    avatarPhoto.src = this._selectorPopup.querySelector('#url-avatar').value;
    this.close();
  }

  open() {
    super.open();
    const avatarPhoto = document.querySelector('.profile__avatar');
    this._selectorPopup.querySelector('#url-avatar').value = avatarPhoto.src;
  }

  setEventListeners() {
    this._selectorPopup
      .querySelector(".popup__container")
      .addEventListener("submit", this.handleForm);
      
    super.setEventListeners();
  }
}