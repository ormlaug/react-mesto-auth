import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import auth from 'utils/auth';

function Login(props) {

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNewEmail(evt) {
    setEmail(evt.target.value)
  }

  function handleNewPassword(evt) {
    setPassword(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email || !password) {
      return
    }
    auth
      .signIn(password, email)
      .then((jwt) => {
        if (jwt) {
          setEmail('');
          setPassword('');
          props.onLoggedIn();
          history.push('/')
        }
      })
  }

  return(
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
        className="auth__input"
        placeholder="Email"
        onChange={handleNewEmail}
        value={email || ""}
        />
        <input
        className="auth__input"
        placeholder="Пароль"
        onChange={handleNewPassword}
        value={password || ""}
        />
        <button type="submit" className="auth__btn">Войти</button>
      </form>
    </div>
  )
}

export default Login;