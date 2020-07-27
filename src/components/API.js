export class API {
  constructor(options) {
    this._url = options.url;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers["Content-type"];
  }
  //загружаем данные о профиле с сервера--------------
  getInfoUser() {
    return fetch(`${this._url}/v1/cohort-13/users/me`, {
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
    return fetch(`${this._url}/v1/cohort-13/cards`, {
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
    return fetch(`${this._url}/v1/cohort-13/users/me`, {
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
    /*.then(res => res.json())
  .then((result) => {
    console.log(result);})*/


    .then((result) => {
      if (result.ok) return result.json();
      else return Promise.reject(result.status);
    })
    .catch((err) => console.log(`Error ${err}`));
  }


//добавляем новую карточку-------------
  addNewCard(name, link){
    return fetch(`${this._url}/v1/cohort-13/cards`, {
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
  showNumberLikes(){

  }

//Удаление карточки-------------------------------------------------
  deleteCards(cardId){
    return fetch(`${this._url}/v1/cohort-13/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      }
    })
    .then((result) => {
      if (result.ok) return result.json();
      else return Promise.reject(result.status);
    })
    .catch((err) => console.log(`Error ${err}`));

  }
  //смена аватара-------------
changeAvatar(link, avatarElement){
  return fetch(`${this._url}/v1/cohort-13/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: this._authorization,
      "Content-type": `${this._contentType}`,
    },
    body: JSON.stringify({
      avatar: link
    }),
  })

  .then((result) => {
    if (result.ok) return result.json();
    else return Promise.reject(result.status);
  })
  .then(result => {
    avatarElement.src = result.avatar;
  })
  .catch((err) => console.log(`Error ${err}`));
}

}
