import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor({ selectorPopup, renderForm }) {
    super(selectorPopup);
    this.renderForm = renderForm;
  }

  _getInputValues() {
    this._inputList = document
      .querySelector(this._selectorPopup)
      .querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  close() {
    document
      .querySelector(this._selectorPopup)
      .querySelector(".popup__container")
      .reset();
    super.close();
  }
  setEventListeners() {
    document
      .querySelector(this._selectorPopup)
      .querySelector(".popup__container")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        this.renderForm(this._getInputValues());
        this.close();
      });
    super.setEventListeners();
  }
}
