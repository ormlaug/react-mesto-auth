class Auth {

  _returnResOK(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Вот незадача, ошибка: ${res.status}`);
    }
  }

  signUp(password, email) {
    return fetch('https://auth.nomoreparties.co/signup', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        password,
        email,
      })
    })
    .then(this._returnResOK);
  }

  signIn(password, email) {
    return fetch('https://auth.nomoreparties.co/signin', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        password,
        email,
      })
    })
    .then(this._returnResOK);
  }

  checkTokenValidity(token) {
    return fetch('https://auth.nomoreparties.co/users/me', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._returnResOK);
  }

}

const auth = new Auth();

export default auth;