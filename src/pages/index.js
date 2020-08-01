import "./index.css";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PicturePopup } from "../components/PicturePopup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupDeleteCard } from "../components/PopupDeleteCard.js";
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
const avatarProfile = document.querySelector(".profile__avatar");
const buttonCreate = document.querySelector("#button-create");
const buttonProfile = document.querySelector(".popup__button_profile");
const buttonAvatarChange = document.querySelector("#change-avatar-button");
const urlAvatar = document.querySelector("#url-avatar");

//создание экземпляра API______________________________________________________
const optUserInfo = {
  url: "https://mesto.nomoreparties.co",
  cohort: "cohort-13",
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
  avatarProfile.src = result.avatar;
});

//Получение карточек c сервера______________________________________________________
api.getInitialCards().then((result) => {
  const creationSection = new Section(
    {
      items: result,
      renderer: (item) => {
        const readyCard = getCard(item, api);
        const cardEl = readyCard.generateCard();
        document.querySelector(".elements").append(cardEl);
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
    buttonProfile.textContent = "Сохранение...";
    api
      .changeProfile(nameInput.value, jobInput.value)
      .then((result) => {
        userInfo.setUserInfo({
          newName: result.name,
          newLink: result.about,
        });
        buttonProfile.textContent = "Сохранить";
      })
      .finally(() => editPop.close());
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
    buttonCreate.textContent = "Сохранение...";
    api
      .addNewCard(namePlaceValue.value, urlPhotoValue.value)
      .then((result) => {
        const readyCard = getCard(result, api);
        const cardEl = readyCard.generateCard();
        document.querySelector(".elements").prepend(cardEl);
        buttonCreate.textContent = "Сохранить";
      })
      .finally(() => {
        addPopupWithForm.close();
      });
  },
});
buttonAdd.addEventListener("click", function () {
  addFormValidator.resetValidation();
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

//создание экземпляра с формой попапа со сменой аватара______________________________________________________
const avatarPop = new PopupWithForm({
  selectorPopup: ".popup_change-avatar",
  submitForm: () => {
    buttonAvatarChange.textContent = "Сохранение...";
    api
      .changeAvatar(urlAvatar.value)
      .then((result) => {
        avatarProfile.src = result.avatar;
        buttonAvatarChange.textContent = "Сохранить";
      })
      .finally(() => avatarPop.close());
  },
});
avatarPop.setEventListeners();
document.querySelector(".profile__avatar-pen").addEventListener("click", () => {
  urlAvatar.value = avatarProfile.src;
  avatarPop.open();
});
//создание экземпляра карточки______________________________________________________
function getCard(result, api) {
  const newCard = new Card(
    result.owner._id,
    result.link,
    result.name,
    result.likes,
    result._id,
    api,

    {
      handleButtonLike: (evt) => {
        const likeButton = evt.target;
        const likesCount = likeButton
          .closest(".card__like")
          .querySelector(".card__like-counter");
        likeButton.classList.toggle("card__button_active");
        if (likeButton.classList.contains("card__button_active")) {
          api
            .addLikes(result._id)
            .then(({likes}) => {
              likesCount.textContent = likes.length;
              console.log({likes})
            });
        } else {
          api
            .removeLikes(result._id)
            .then(({likes}) => {
              likesCount.textContent = likes.length;
            });
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
  return newCard;
}


