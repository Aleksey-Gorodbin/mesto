import "./index.css";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PicturePopup } from "../components/PicturePopup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupDeleteCard } from "../components/PopupDeleteCard.js";
import { PopupChangeAvatar } from "../components/PopupChangeAvatar.js";
import { API } from "../components/API.js";
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

//создание экземпляра API______________________________________________________
const optUserInfo = {
  url: "https://mesto.nomoreparties.co",
  headers: {
    authorization: "c953f0b4-8498-4223-9bb1-f908f25220bf",
    "Content-type": "application/json",
  },
};
const api = new API(optUserInfo);
//Получение инфы профиля с сервера______________________________________________________
api.getInfoUser().then((result) => {
  document.querySelector(".profile__name").textContent = result.name;
  document.querySelector(".profile__position").textContent = result.about;
  document.querySelector(".profile__avatar").src = result.avatar;
});
//Получение карточек c сервера______________________________________________________
api.getInitialCards().then((result) => {
  const creationSection = new Section(
    {
      items: result,
      renderer: (item) => {
        const card = new Card(
          item.owner._id,
          item.link,
          item.name,
          item.likes,
          api,
          {
            handleButtonLike: (evt) => {
              evt.target.classList.toggle("card__button_active");
              if (evt.target.classList.contains("card__button_active")) {
                item.likes.push(item.owner._id);
                api.addLikes(item._id).then(() => {
                  document
                    .querySelector(".card__button")
                    .classList.add("card__button_active");
                });
              } else {
                item.likes.pop(item.owner._id);
                api.removeLikes(item._id).then(() => {
                  document
                    .querySelector(".card__button")
                    .classList.remove("card__button_active");
                });
              }
              if (item.likes.length > 0) {
                document.querySelector(
                  ".card__like-counter"
                ).textContent = item.likes.length;
              } else {
                document.querySelector(
                  ".card__like-counter"
                ).textContent = "";
              }
            },
          },
          {
            handleCardClick: () => {
              //открытие попапа с фото
              PreviewPopup.open(item);
              PreviewPopup.setEventListeners();
            },
          },
          {
            confirmDelete: () => {
              popupDeleteCard.open();
              popupDeleteCard.submit((evt) => {
                evt.preventDefault();
                api.deleteCards(item._id).then(() => {
                  card.deleteCard();
                });
                popupDeleteCard.close();
              });
            },
          }
        );
        const cardElement = card.generateCard();
        creationSection.addItem(cardElement);
      },
    },
    ".elements"
  );
  creationSection.renderItems();
});
//отправка данных профиля на сервер_____________________________________________________________
const userInfo = new UserInfo({
  selectorName: ".profile__name",
  selectorPosition: ".profile__position",
});

const editPop = new PopupWithForm({
  selectorPopup: ".popup",
  submitForm: () => {
    document.querySelector(".popup__button_profile").textContent =
      "Сохранение...";
    api.changeProfile(nameInput.value, jobInput.value).then((result) => {
      userInfo.setUserInfo({
        newName: result.name,
        newLink: result.about,
      });
      document.querySelector(".popup__button_profile").textContent =
        "Сохранить";
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

//добавление новой карточки через сервер_____________________________________________________________
//создаем экземпляр попапа с формой добавления фото_______________________________________________________________________________
const addPopupWithForm = new PopupWithForm({
  selectorPopup: ".popup_add-photo",
  submitForm: () => {
    document.querySelector("#button-create").textContent = "Сохранение...";
    api.addNewCard(namePlaceValue.value, urlPhotoValue.value).then((result) => {
      const newCard = new Card(
        result.owner._id,
        result.link,
        result.name,
        result.likes,
        api,
        {
          handleButtonLike: (evt, ) => {
            evt.target.classList.toggle("card__button_active");
            if (document
              .querySelector(".card__button").classList.contains("card__button_active")) {
              result.likes.push(result.owner._id);
              api.addLikes(result._id).then(() => {
                document
                  .querySelector(".card__button")
                  .classList.add("card__button_active");
              });
            } else {
              result.likes.pop(result.owner._id);
              api.removeLikes(result._id).then(() => {
                document
                  .querySelector(".card__button")
                  .classList.remove("card__button_active");
              });
            }
            if (result.likes.length > 0) {
              document.querySelector(
                ".card__like-counter"
              ).textContent = result.likes.length;
            } else {
              document.querySelector(
                ".card__like-counter"
              ).textContent = "";
            }
          },
        },
        {
          handleCardClick: () => {
            PreviewPopup.open({
              name: result.name,
              link: result.link,
            });
            PreviewPopup.setEventListeners();
          },
        },
        {
          confirmDelete: () => {
            popupDeleteCard.open();
            popupDeleteCard.submit((evt) => {
              evt.preventDefault();
              api.deleteCards(result._id).then(() => {
                newCard.deleteCard();
              });
              popupDeleteCard.close();
            });
          },
        }
      );
      const cardEl = newCard.generateCard();
      console.log(result)
      document.querySelector(".elements").prepend(cardEl);
      document.querySelector("#button-create").textContent = "Сохранить";
    });
  },
});
buttonAdd.addEventListener("click", function () {
  addPopupWithForm.open();
  addPopupWithForm.setEventListeners();
});

//создаем экземпляр класса для вставки элемента в разметку_____________________________________________________________
const PreviewPopup = new PicturePopup(".popup_open-photo");

//создаем экземпляр валидации формы с редактированием профиля____________________________________________________________________
const profileFormValidator = new FormValidator(
  popupSelector,
  document.forms.edit
);
profileFormValidator.enableValidation();
//создаем экземпляр валидации формы с добавлением карточки________________________________________________________________________
const addFormValidator = new FormValidator(popupSelector, document.forms.add);
addFormValidator.enableValidation();
//создаем экземпляр валидации формы с обновлением аватара________________________________________________________________________
const changeFormValidator = new FormValidator(
  popupSelector,
  document.forms.change
);
changeFormValidator.enableValidation();

//создание экземпляра с формой попапа с плдтверждением об удалении карточки______________________________________________________
const popupDeleteCard = new PopupDeleteCard({
  selectorPopup: ".popup_delete-card",
  submitForm: "#confirmation",
});
popupDeleteCard.submit(() => {});
popupDeleteCard.setEventListeners();

//создание экземпляра с формой попапа со сменой карточки______________________________________________________
const avatarPop = new PopupChangeAvatar({
  selectorPopup: ".popup_change-avatar",
  submitForm: (data) => {
    api.changeAvatar(data.avatar).then((result) => {
      document.querySelector(".profile__avatar").src = result.avatar;
    });
  },
});

document.querySelector(".profile__avatar-pen").addEventListener("click", () => {
  avatarPop.open();
  avatarPop.setEventListeners();
});
//api.removeLikes('5f1fb4ef8b2c57001f1490ca')