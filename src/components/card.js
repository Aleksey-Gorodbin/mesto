
class Card {
  constructor(idOwner, link, name, { handleCardClick }, {confirmDelete}) {
    this._link = link;
    this.idOwner = idOwner;
    this._name = name;
    this._handleCardClick = handleCardClick;
    this._confirmDelete = confirmDelete;
    this._elementsTemplate = document.querySelector(
      "#elements-template"
    ).content.children[0];
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
    this._addIcon();
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
    //открытие попапа
    this._elementCard
      .querySelector(".card__button-delete")
      .addEventListener("click",  this._confirmDelete)

    this._elementCard
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  _addIcon(){
    if(this.idOwner == "40472d24d917f056d42d3629") {
    const icon = this._elementCard.querySelector(".card__button-delete");
    icon.style.display = 'block';
    } else {
      console.log('fuck')
    }
  }

  deleteCard(){
    if(this.idOwner == "40472d24d917f056d42d3629") {
      this._elementCard.remove();
      //this._elementCard = null;
      } else {
        console.log('fuck')
      }
  }
}

export { Card };
