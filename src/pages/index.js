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
const avatarLink = document.querySelector("#url-avatar");

//создание экземпляра API______________________________________________________
const optUserInfo = {
  url: 'https://mesto.nomoreparties.co',
  headers: {
    authorization: 'c953f0b4-8498-4223-9bb1-f908f25220bf',
    'Content-type': 'application/json'
  }
}
const api = new API(optUserInfo);
//Получение инфы профиля с сервера______________________________________________________
api.getInfoUser()
.then(result => {
  document.querySelector('.profile__name').textContent = result.name;
  document.querySelector('.profile__position').textContent = result.about;
  document.querySelector('.profile__avatar').src = result.avatar;
});
//Получение карточек c сервера______________________________________________________
api.getInitialCards()
.then((result) => {const creationSection = new Section(
  {
    items: result,
    renderer: (item) => {
      const card = new Card(
        item.owner._id,
        item.link,
        item.name,
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
            //console.log(result.owner._id)
            popupDeleteCard.submit((evt) => {
              evt.preventDefault();
              api.deleteCards(item._id)
              .then(() => {
                card.deleteCard();
              });
              popupDeleteCard.close();
            });
            //popupDeleteCard.submit(()=>{});
            popupDeleteCard.setEventListeners();
          },
        }
      );
      const cardElement = card.generateCard();
      console.log(result);
      console.log(item)
      creationSection.addItem(cardElement);
    },
    
  },
  ".elements"
);
creationSection.renderItems()});
//отправка данных профиля на сервер_____________________________________________________________
const userInfo = new UserInfo({
  selectorName: ".profile__name",
  selectorPosition: ".profile__position",
});

const editPop = new PopupWithForm({
  selectorPopup: ".popup",
  submitForm: () => api.changeProfile(nameInput.value, jobInput.value)
  .then((result) => { 
    userInfo.setUserInfo({
      newName: result.name,
      newLink: result.about,
    });
    
  }),
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
  submitForm: () => api.addNewCard(namePlaceValue.value, urlPhotoValue.value)
  .then((result) => {
    const newCard = new Card(
      result.owner._id,
      result.link,
      result.name,
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
          //console.log(result.owner._id)
          popupDeleteCard.submit((evt) => {
            evt.preventDefault();
            api.deleteCards(result._id)
            .then(() => {
              card.deleteCard();
            });
            popupDeleteCard.close();
          });
          popupDeleteCard.setEventListeners();
        },
      }
    );
    const cardEl = newCard.generateCard();
    document.querySelector(".elements").prepend(cardEl);
      
  }),
});
//popupDeleteCard.setEventListeners();
buttonAdd.addEventListener("click", function () {
  addPopupWithForm.open();
  addPopupWithForm.setEventListeners();
});


//api.deleteCards('5f1d5e188b2c57001f148e1f')


/*{
  confirmDelete: () => api.deleteCards(cardId)
  .then((result) => {
    const cardId = result._id;
    popupDeleteCard.open();
    popupDeleteCard.submit((evt) => {
      evt.preventDefault();
      cardEl.remove();
      popupDeleteCard.close();
    });
    popupDeleteCard.setEventListeners();
  }),
}*/







//создаем экземпляр класса для вставки элемента в разметку_____________________________________________________________
const PreviewPopup = new PicturePopup(".popup_open-photo");
/*const creationSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item.link,
        item.name,
        {
          handleCardClick: () => {
            //открытие попапа с фото
            PreviewPopup.open(item);
            PreviewPopup.setEventListeners();
          },
        },
        {
          confirmDelete: () => {},
        }
      );
      const cardElement = card.generateCard();
      creationSection.addItem(cardElement);
    },
  },
  ".elements"
);
creationSection.renderItems();*/
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
const changeFormValidator = new FormValidator(popupSelector, document.forms.change);
changeFormValidator.enableValidation();






//создаем экземпляр попапа с формой добавления фото_______________________________________________________________________________
/*const addPopupWithForm = new PopupWithForm({
  selectorPopup: ".popup_add-photo",
  submitForm: (data) => {
    const newCard = new Card(
      urlPhotoValue.value,
      namePlaceValue.value,
      {
        handleCardClick: () => {//во сюда надо впиздюрить
          //открытие попапа с фото
          PreviewPopup.open({
            name: data.place,
            link: data.newLink,
          });
          PreviewPopup.setEventListeners();
          
        },
      },
      {
        confirmDelete: () => {
          popupDeleteCard.open();
          popupDeleteCard.submit((evt) => {
            evt.preventDefault();
            cardEl.remove();
            popupDeleteCard.close();
          });
          popupDeleteCard.setEventListeners();
        },
      }
    );
    const cardEl = newCard.generateCard();
    newCard.addIcon();
    document.querySelector(".elements").prepend(cardEl);
  },
});
buttonAdd.addEventListener("click", function () {
  addPopupWithForm.open();
  addPopupWithForm.setEventListeners();
});*/








//создание экземпляра с формой попапа с данными о пользователе____________________________________________________________________
//создание экземпляра класса UserInfo
/*const userInfo = new UserInfo({
  selectorName: ".profile__name",
  selectorPosition: ".profile__position",
});
//создание экземпляра класса PopupWithForm
const editPop = new PopupWithForm({
  selectorPopup: ".popup",
  submitForm: (data) => {
    userInfo.setUserInfo({
      newName: data.name,
      newLink: data.position,
    });
  },
});
editPop.setEventListeners();*/



//создание экземпляра с формой попапа с плдтверждением об удалении карточки______________________________________________________
const popupDeleteCard = new PopupDeleteCard({
  selectorPopup: ".popup_delete-card",
  submitForm: "#confirmation",
});
popupDeleteCard.submit(()=>{});
popupDeleteCard.setEventListeners();

//создание экземпляра с формой попапа со сменой карточки______________________________________________________
const avatarPop = new PopupChangeAvatar({
  selectorPopup: ".popup_change-avatar",
  submitForm: () => api.changeAvatar(avatarLink.value, document.querySelector('.profile__avatar')),
});

document.querySelector('.profile__avatar-pen').addEventListener("click", () => {
  avatarPop.open();
  //api.changeAvatar(avatarLink.value)
  //.then(() => avatarPop.setEventListeners())
  avatarPop.setEventListeners();
  //api.changeAvatar(avatarLink.value, document.querySelector('.profile__avatar'))
});

//api.changeAvatar('https://files.slack.com/files-pri/TPV9DP0N4-F01856VUF8R/___________________________118_.png')
