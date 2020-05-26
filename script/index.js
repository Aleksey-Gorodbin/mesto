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
const urlPhoto = document.querySelector("#url-photo");
const elements = document.querySelector(".elements");
const urlPhotoValue = document.querySelector("#url-photo");
const namePlaceValue = document.querySelector("#name-place");
const popupAddCard = document.querySelector("#list-photo");
const popupOpenPhoto = document.querySelector(".popup_open-photo");
const popupImage = document.querySelector(".popup__image");
const popupTitleImage = document.querySelector(".popup__title_open-photo");
//Открытие и закрытие попапа с данными о пользователе
function openForm() {
  popup.classList.add("popup_opened");
  nameInput.value = nameText.textContent;
  jobInput.value = positionText.textContent;
}
function closeForm() {
  popup.classList.remove("popup_opened");
}
//Заполнение данных формы попапа с данными о пользователе
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  positionText.textContent = jobInput.value;
  closeForm();
}
//открытие и закрытие попапа добавления фото
function openFormAdd() {
  popupAddPhoto.classList.add("popup_opened");
}
function closeFormAdd() {
  popupAddPhoto.classList.remove("popup_opened");
}
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
//создаем цикл, чтобы отобразить массив в документе
initialCards.forEach(function renderItem(item) {
  //создаем шаблон карточки и копируем его для работы с ним
  const elementsTemplate = document.querySelector("#elements-template").content;
  const elementsCard = elementsTemplate.cloneNode(true);
  elementsCard.querySelector(".elements__image").src = item.link;
  elementsCard.querySelector(".elements__caption").textContent = item.name;
  //делаем кнопку лайка активной
  elementsCard
    .querySelector(".elements__button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__button_active");
    });
  //создаем кнопку удаления элемента
  const deleteButton = elementsCard.querySelector(".elements__button-delete");
  deleteButton.addEventListener("click", function () {
    const listItem = deleteButton.closest(".elements__card");
    listItem.remove();
  });
  //открытие и закрытие попапа с фото
  const imageElement = elementsCard.querySelector(".elements__image");
  imageElement.addEventListener("click", function () {
    popupOpenPhoto.classList.add("popup_opened");
    popupImage.src = item.link;
    popupTitleImage.textContent = item.name;
  });
  const closePhoto = document.querySelector(".popup__button-close_photo");
  closePhoto.addEventListener("click", function () {
    popupOpenPhoto.classList.remove("popup_opened");
  });
  //добавление карточки элемента в разметку
  elements.prepend(elementsCard);
});

//создаем функцию создания нового элемента и добавления его в разметку через форму попапа с добавлением фото
//делается аналогично циклу с добавлением в начеле обработчика
function formSubmitHandle(evt) {
  evt.preventDefault();
  let copyItem = {
    name: "",
    link: "",
  };
  copyItem.name = namePlaceValue.value;
  copyItem.link = urlPhotoValue.value;
  initialCards.unshift(copyItem);
  const elementsTemplate = document.querySelector("#elements-template").content;
  const elementsCard = elementsTemplate.cloneNode(true);
  elementsCard.querySelector(".elements__image").src = initialCards[0].link;
  elementsCard.querySelector(".elements__caption").textContent =
    initialCards[0].name;
  elementsCard
    .querySelector(".elements__button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__button_active");
    });
  const deleteButton = elementsCard.querySelector(".elements__button-delete");
  deleteButton.addEventListener("click", function () {
    const listItem = deleteButton.closest(".elements__card");
    listItem.remove();
  });
  const imageElement = elementsCard.querySelector(".elements__image");
  imageElement.addEventListener("click", function () {
    popupOpenPhoto.classList.add("popup_opened");
    popupImage.src = initialCards[0].link;
    popupTitleImage.textContent = initialCards[0].name;
  });
  const closePhoto = document.querySelector(".popup__button-close_photo");
  closePhoto.addEventListener("click", function () {
    popupOpenPhoto.classList.remove("popup_opened");
  });
  elements.prepend(elementsCard);
  closeFormAdd();
}

formElement.addEventListener("submit", formSubmitHandler);
buttonClose.addEventListener("click", closeForm);
buttonEdit.addEventListener("click", openForm);
popupAddCard.addEventListener("submit", formSubmitHandle);
buttonCloseAddPhoto.addEventListener("click", closeFormAdd);
buttonAdd.addEventListener("click", openFormAdd);

//сделать кнопку лайк активной
