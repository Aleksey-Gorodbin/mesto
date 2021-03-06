
class Card {
  //constructor(idOwner, link, name, { handleCardClick }, {confirmDelete})
  constructor(idOwner, link, name, likes, _id, api, {handleButtonLike}, { handleCardClick }, {confirmDelete}) {
    this._name = name;
    this._link = link;
    this._idOwner = idOwner;
    this._likes = likes;
    this._id = _id;
    this._api = api;
    this._handleButtonLike = handleButtonLike;
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
    this._elementCard.querySelector(".card__like-counter").textContent = this._likes.length;
    //this._likes.some(({ _id }) => this._idOwner === _id)
    if(this._likes.some(({ _id }) => this._idOwner === _id)){
      this._elementCard.querySelector(".card__button").classList.add('card__button_active');
    } else {
      this._elementCard.querySelector(".card__button").classList.remove('card__button_active');
    }
    //this._handleButtonLike();
    this._addIcon();
    this._setEventListeners();
    // Вернём элемент наружу
    return this._elementCard;
  }

  _setEventListeners() {
    //лайки
    this._elementCard
      .querySelector(".card__button")
      .addEventListener("click", this._handleButtonLike);
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
    if(this._idOwner == "40472d24d917f056d42d3629") {
    const icon = this._elementCard.querySelector(".card__button-delete");
    icon.style.display = 'block';
    }
  }

  deleteCard(){
    if(this._idOwner == "40472d24d917f056d42d3629") {
      this._elementCard.remove();
      } else {
        console.log('fuck')
      }
  }
}

export { Card };




/*class Card {
  //constructor(idOwner, link, name, { handleCardClick }, {confirmDelete})
  constructor(idOwner, link, name, likes, _id, api, {handleButtonLike}, { handleCardClick }, {confirmDelete}) {
    this._name = name;
    this._link = link;
    this._idOwner = idOwner;
    this._likes = likes;
    this._id = _id;
    this._api = api;
    this._handleButtonLike = handleButtonLike;
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
      .addEventListener("click", this._handleButtonLike);
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
    if(this._idOwner == "40472d24d917f056d42d3629") {
    const icon = this._elementCard.querySelector(".card__button-delete");
    icon.style.display = 'block';
    }
  }

  deleteCard(){
    if(this._idOwner == "40472d24d917f056d42d3629") {
      this._elementCard.remove();
      } else {
        console.log('fuck')
      }
  }
}

export { Card }; */
