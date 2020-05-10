const POPUP = document.querySelector(".popup");
let buttonEdit = document.querySelector(".profile__button-edit");
let buttonClose = document.querySelector(".popup__button-close");
let nameInput = document.querySelector("#name");
let jobInput = document.querySelector("#position");
let nameText = document.querySelector(".profile__name");
let positionText = document.querySelector(".profile__position");
let formElement = document.querySelector(".popup__container");

function openForm() {
  POPUP.classList.add("popup_opened");
  nameInput.value = nameText.textContent;
  jobInput.value = positionText.textContent;
}

function closeForm() {
  POPUP.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  positionText.textContent = jobInput.value;
  closeForm();
}

formElement.addEventListener("submit", formSubmitHandler);
buttonClose.addEventListener("click", closeForm);
buttonEdit.addEventListener("click", openForm);
