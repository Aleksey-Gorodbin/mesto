import { Card } from "./Card.js";
import { openForm, closeForm } from "./utils.js";
import { FormValidator } from "./FormValidator.js";
//создаем массив с данными карточки(ссылка и название)
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const popupSelector = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "error",
};
const popup = document.querySelector(".popup");
const buttonEdit = document.querySelector(".profile__button-edit");
const buttonClose = document.querySelector(".popup__button-close");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#position");
const nameText = document.querySelector(".profile__name");
const positionText = document.querySelector(".profile__position");
const formElement = document.querySelector(".popup__container");
const buttonAdd = document.querySelector(".profile__button-add");
const popupAddPhoto = document.querySelector(".popup_add-photo");
const buttonCloseAddPhoto = document.querySelector(
  ".popup__button-close_add-photo"
);
const urlPhotoValue = document.querySelector("#url-photo");
const namePlaceValue = document.querySelector("#name-place");
const popupAddCard = document.querySelector("#list-photo");
const popupOpenPhoto = document.querySelector(".popup_open-photo");
const closePhoto = document.querySelector(".popup__button-close_photo");

//Заполнение данных формы попапа с данными о пользователе
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  positionText.textContent = jobInput.value;
  closeForm(popup);
}

//Создание шаблона элемента разметки
initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item.link, item.name);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  document.querySelector(".elements").append(cardElement);
});

//Заполнение данных формы попапа добавления фото
function formSubmitHandle(evt) {
  evt.preventDefault();
  const newCard = new Card(urlPhotoValue.value, namePlaceValue.value);
  const cardEl = newCard.generateCard();
  // Добавляем в DOM
  document.querySelector(".elements").prepend(cardEl);
  closeForm(popupAddPhoto);
}

const profileFormValidator = new FormValidator(
  popupSelector,
  document.forms.edit
);
profileFormValidator.enableValidation();

const addFormValidator = new FormValidator(popupSelector, document.forms.add);
addFormValidator.enableValidation();

buttonAdd.addEventListener("click", function () {
  openForm(popupAddPhoto);
});
buttonCloseAddPhoto.addEventListener("click", function () {
  closeForm(popupAddPhoto);
});
popupAddCard.addEventListener("submit", formSubmitHandle);

buttonEdit.addEventListener("click", function () {
  nameInput.value = nameText.textContent;
  jobInput.value = positionText.textContent;
  openForm(popup);
});

buttonClose.addEventListener("click", function () {
  closeForm(popup);
});
formElement.addEventListener("submit", formSubmitHandler);
buttonAdd.addEventListener("click", function () {
  openForm(popupAddPhoto);
});
buttonCloseAddPhoto.addEventListener("click", function () {
  closeForm(popupAddPhoto);
});
popupAddCard.addEventListener("submit", formSubmitHandle);
closePhoto.addEventListener("click", function () {
  closeForm(popupOpenPhoto);
});
