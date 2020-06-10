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
const elements = document.querySelector(".elements");
const urlPhotoValue = document.querySelector("#url-photo");
const namePlaceValue = document.querySelector("#name-place");
const popupAddCard = document.querySelector("#list-photo");
const popupOpenPhoto = document.querySelector(".popup_open-photo");
const popupImage = document.querySelector(".popup__image");
const popupTitleImage = document.querySelector(".popup__title_open-photo");
const closePhoto = document.querySelector(".popup__button-close_photo");
const elementsTemplate = document.querySelector("#elements-template").content;

function pressOverlay(e) {
  if (e.target.classList.contains("popup_opened")) {
    e.target.classList.remove("popup_opened");
  }
}

function pressEsc(evt) {
  if (evt.keyCode === 27) {
    const openedPopup = document.querySelector(".popup_opened");
    closeForm(openedPopup);
  }
}

//Открытие и закрытие попапа с данными о пользователе
function openForm(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", pressEsc);
  document.addEventListener("click", pressOverlay);
}

function closeForm(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", pressEsc);
  document.removeEventListener("click", pressOverlay);
}
//Заполнение данных формы попапа с данными о пользователе
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  positionText.textContent = jobInput.value;
  closeForm(popup);
}
//Создание шаблона элемента разметки
function getCard(name, link) {
  const elementsCard = elementsTemplate.cloneNode(true);
  const cardImage = elementsCard.querySelector(".card__image");
  const cardCaption = elementsCard.querySelector(".card__caption");
  const deleteButton = elementsCard.querySelector(".card__button-delete");
  cardImage.src = link;
  cardImage.alt = `Изображение ${name} не загрузилось`;
  cardCaption.textContent = name;
  //лайки
  elementsCard
    .querySelector(".card__button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__button_active");
    });
  //удаление элемента
  deleteButton.addEventListener("click", function () {
    const listItem = deleteButton.closest(".card");
    listItem.remove();
  });
  //открытие попапа с фото
  cardImage.addEventListener("click", function () {
    popupImage.src = link;
    popupImage.alt = `Изображение ${name} не загрузилось`;
    popupTitleImage.textContent = name;
    openForm(popupOpenPhoto);
  });
  return elementsCard;
}
//вставка шаблона в разметку
function addCard(name, link) {
  const card = getCard(name, link);
  elements.prepend(card);
}
//заполнение карточек
initialCards.forEach((item) => {
  const link = item.link;
  const name = item.name;
  addCard(name, link);
});
//Заполнение данных формы попапа добавления фото
function formSubmitHandle(evt) {
  evt.preventDefault();
  const name = namePlaceValue.value;
  const link = urlPhotoValue.value;
  addCard(name, link);
  closeForm(popupAddPhoto);
}

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
