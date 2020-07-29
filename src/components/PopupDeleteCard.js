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
