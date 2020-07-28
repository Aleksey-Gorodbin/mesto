import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor({ selectorPopup, submitForm }) {
    super(selectorPopup);
    this.submitForm = submitForm;
    this.handleForm = this.handleForm.bind(this);
  }

  _getInputValues() {
    this._inputList = this._selectorPopup
      .querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  close() {
    this._selectorPopup
      .querySelector(".popup__container")
      .reset();
    super.close();
  }

  handleForm(evt){
    evt.preventDefault();
    this.submitForm(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    this._selectorPopup
      .querySelector(".popup__container")
      .addEventListener("submit", this.handleForm);
      
    super.setEventListeners();
  }

}
