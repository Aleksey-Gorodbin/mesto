export class FormValidator {
  constructor(popupSelector, validFormClass) {//Со скобками форматирует IDE \^_^/
    this._inputSelector = popupSelector.inputSelector,
    this._formSelector = popupSelector.formSelector,
    this._submitButtonSelector = popupSelector.submitButtonSelector,
    this._inactiveButtonClass = popupSelector.inactiveButtonClass,
    this._inputErrorClass = popupSelector.inputErrorClass,
    this._errorClass = popupSelector.errorClass,
    this._validFormClass = validFormClass;
  }

  //проверка на валидность всей формы и добавление/удаление активности кнопки
  _handleFormInput(formElement, submitButton, inactiveButtonClass) {
    const hasErrors = !formElement.checkValidity();
    if (hasErrors === true) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.setAttribute("disabled", true);
    } else {
      submitButton.classList.remove(inactiveButtonClass);
      submitButton.removeAttribute("disabled");
    }
  }
  //проверка на валидность каждого поля формы и добавление/удаление сообщения об ошибке
  _handleInput(evt, errCls) {
    const input = evt.target;
    const error = document.querySelector(`#${input.id}-error`);
    const isInputValid = input.checkValidity();
    if (isInputValid === true) {
      input.classList.remove(errCls);
      error.textContent = "";
    } else {
      input.classList.add(errCls);
      error.textContent = input.validationMessage;
    }
  }

  enableValidation() {
    const inputElements = Array.from(
      this._validFormClass.querySelectorAll(this._inputSelector)
    );

    inputElements.forEach((input) => {
      input.addEventListener("input", (e) =>
        this._handleInput(e, this._inputErrorClass)
      );
    });
    this._validFormClass.addEventListener("input", () =>
      this._handleFormInput(this._validFormClass, this._validFormClass.querySelector(
        this._submitButtonSelector
      ), this._inactiveButtonClass)
    );
    this._validFormClass.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  resetValidation(){
    this._handleFormInput(this._validFormClass, this._validFormClass.querySelector(
      this._submitButtonSelector
    ), this._inactiveButtonClass)
  }
}


