import './index.css';

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PicturePopup } from "../components/PicturePopup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
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

const buttonEdit = document.querySelector(".profile__button-edit");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#position");
const buttonAdd = document.querySelector(".profile__button-add");
const urlPhotoValue = document.querySelector("#url-photo");
const namePlaceValue = document.querySelector("#name-place");

//создаем экземпляр класса для вставки элемента в разметку_____________________________________________________________
const PreviewPopup = new PicturePopup(".popup_open-photo");
const creationSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.link, item.name, {
        handleCardClick: () => {
          //открытие попапа с фото
          PreviewPopup.open(item);
          PreviewPopup.setEventListeners();
        },
      });
      const cardElement = card.generateCard();
      creationSection.addItem(cardElement);
    },
  },
  ".elements"
);
creationSection.renderItems();
//создаем экземпляр валидации формы с редактированием профиля____________________________________________________________________
const profileFormValidator = new FormValidator(
  popupSelector,
  document.forms.edit
);
profileFormValidator.enableValidation();
//создаем экземпляр валидации формы с добавлением карточки________________________________________________________________________
const addFormValidator = new FormValidator(popupSelector, document.forms.add);
addFormValidator.enableValidation();

//создаем экземпляр попапа с формой добавления фото_______________________________________________________________________________
const addPopupWithForm = new PopupWithForm({
  selectorPopup: ".popup_add-photo",
  submitForm: (data) => {
    const newCard = new Card(urlPhotoValue.value, namePlaceValue.value, {
      handleCardClick: () => {
        //открытие попапа с фото
        PreviewPopup.open({
          name: data.place,
          link: data.newLink
        });
        PreviewPopup.setEventListeners()
      },
    });
    const cardEl = newCard.generateCard();
    // Добавляем в DOM
    document.querySelector(".elements").prepend(cardEl);
  },
});
buttonAdd.addEventListener("click", function () {
  addPopupWithForm.open();
  addPopupWithForm.setEventListeners();
});

//создание экземпляра с формой попапа с данными о пользователе____________________________________________________________________
//создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  selectorName: ".profile__name",
  selectorPosition: ".profile__position",
});
//создание экземпляра класса PopupWithForm
const editPop = new PopupWithForm({
  selectorPopup: ".popup",
  submitForm: (data) => {
    userInfo.setUserInfo({
      newName: data.name,
      newLink: data.position
    });
  },
});
editPop.setEventListeners();

buttonEdit.addEventListener("click", () => {
  const editInfo = userInfo.getUserInfo();
  nameInput.value = editInfo.name;
  jobInput.value = editInfo.position;
  editPop.open();
});
