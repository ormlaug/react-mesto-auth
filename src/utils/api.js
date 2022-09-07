class Api {
    constructor(baseUrl) {
      this._url = baseUrl;
      this._headers = {
          authorization: '365d1fcf-c146-4ff9-b926-f9497a7fa8e2',
          'Content-Type': 'application/json'
      };
    }

    _returnResOK(res) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Вот незадача, ошибка: ${res.status}`);
      }
    }
  
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: this._headers
      })
      .then(this._returnResOK);
    }
  
    // другие методы работы с API
    setUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(this._returnResOK)
    }

    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers
      })
        .then(this._returnResOK);
    }

    //cards

    addNewCard(item) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: item.name,
          link: item.link
        })
      })
        .then(this._returnResOK);
    }

    likeCard(data) {
      return fetch(`${this._url}/cards/${data._id}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._returnResOK);
    }

    removeLike(data) {
      return fetch(`${this._url}/cards/${data._id}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then(this._returnResOK);
    }

    changeLikeCardStatus(data, like) {
      if (like) {
        return this.removeLike(data)
      } else {
        return this.likeCard(data)
      }
    }

    deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then(this._returnResOK);
    }

    editAvatar(link) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: `${link}`
        })
      })
      .then(this._returnResOK);
    }

  }

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-45');

export default api;