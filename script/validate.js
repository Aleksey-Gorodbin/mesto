const popupSelector = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "error",
};

function enableValidation(popupSelector) {
  const formElements = Array.from(document.querySelectorAll(popupSelector.formSelector));
  formElements.forEach((formElement) => {
    const inputElements = Array.from(
      formElement.querySelectorAll(popupSelector.inputSelector)
    );
    const submitButton = formElement.querySelector(popupSelector.submitButtonSelector);
    inputElements.forEach((input) => {
      input.addEventListener("input", (e) =>
        handleInput(e, obj.inputErrorClass)
      );
    });
    formElement.addEventListener("input", () =>
      handleFormInput(formElement, submitButton, popupSelector.inactiveButtonClass)
    );
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  });
}

function handleFormInput(formElement, submitButton, inactiveButtonClass) {
  const hasErrors = !formElement.checkValidity();
  if (hasErrors === true) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute("disabled", true);
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute("disabled");
  }
}

function handleInput(evt, errCls) {
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

enableValidation(popupSelector);
