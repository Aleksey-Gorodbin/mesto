export class API {
  constructor(options) {
    this._url = options.url;
    this._cohort = options.cohort;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers["Content-type"];
  }
  //загружаем данные о профиле с сервера--------------
  getInfoUser() {
    return fetch(`${this._url}/v1/${this._cohort}/users/me`, {
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
    })
      .then((result) => {
        if (result.ok) return result.json();
        else return Promise.reject(result.status);
      })
      .catch((err) => console.log(`Error ${err}`));
  }
  //загружаем начальные карточки с сервера------------------
  getInitialCards() {
    return fetch(`${this._url}/v1/${this._cohort}/cards`, {
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
    })
      .then((result) => {
        if (result.ok) return result.json();
        else return Promise.reject(result.status);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  //редактируем профиль-------------
  changeProfile(name, about) {
    return fetch(`${this._url}/v1/${this._cohort}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      }),
    })
      .then((result) => {
        if (result.ok) return result.json();
        else return Promise.reject(result.status);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  //добавляем новую карточку-------------
  addNewCard(name, link) {
    return fetch(`${this._url}/v1/${this._cohort}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((result) => {
        if (result.ok) return result.json();
        else return Promise.reject(result.status);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  //Отображение количества лайков карточки-------------
  addLikes(cardId) {
    return fetch(`${this._url}/v1/${this._cohort}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
    })
      .then((result) => {
        if (result.ok) return result.json();
        else return Promise.reject(result.status);
      })
      .catch((err) => console.log(`Error ${err}`));
  }
  //_______________________________________
  removeLikes(cardId) {
    return fetch(`${this._url}/v1/${this._cohort}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
    })
      .then((result) => {
        if (result.ok) return result.json();
        else return Promise.reject(result.status);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  //Удаление карточки-------------------------------------------------
  deleteCards(cardId) {
    return fetch(`${this._url}/v1/${this._cohort}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
    })
      .then((result) => {
        if (result.ok) return result.json();
        else return Promise.reject(result.status);
      })
      .catch((err) => console.log(`Error ${err}`));
  }
  //смена аватара-------------
  changeAvatar(link) {
    return fetch(`${this._url}/v1/${this._cohort}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
      body: JSON.stringify({
        avatar: `${link}`,
      }),
    })
      .then((result) => {
        if (result.ok) return result.json();
        else return Promise.reject(result.status);
      })
      .catch((err) => console.log(`Error ${err}`));
  }
}
