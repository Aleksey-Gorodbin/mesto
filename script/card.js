import { openForm } from "./utils.js";

class Card {
  constructor(link, name) {
    this._link = link;
    this._name = name;
    this._elementsTemplate = document.querySelector(
      "#elements-template"
    ).content;
  }
  _getTemplate() {
    const cardElement = this._elementsTemplate.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._elementCard = this._getTemplate();
    const cardPhoto = this._elementCard.querySelector(".card__image");
    // Добавим данные
    cardPhoto.src = this._link;
    cardPhoto.alt = `Изображение ${this._name} не загрузилось`;
    this._elementCard.querySelector(".card__caption").textContent = this._name;

    this._setEventListeners();
    // Вернём элемент наружу
    return this._elementCard;
  }

  _setEventListeners() {
    //лайки
    this._elementCard
      .querySelector(".card__button")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__button_active");
      });
    //удаление элемента
    this._elementCard
      .querySelector(".card__button-delete")
      .addEventListener("click", function (e) {
        e.target.closest(".card").remove();
      });
    //открытие попапа с фото
    this._elementCard
      .querySelector(".card__image")
      .addEventListener("click", () => {
        const popupPhoto = document.querySelector(".popup__image");
        popupPhoto.src = this._link;
        popupPhoto.alt = `Изображение ${this._name} не загрузилось`;
        document.querySelector(
          ".popup__title_open-photo"
        ).textContent = this._name;
        openForm(document.querySelector(".popup_open-photo"));
      });
  }
}

export { Card };
