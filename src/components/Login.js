import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNewEmail(evt) {
    setEmail(evt.target.value)
  }

  function handleNewPassword(evt) {
    setPassword(evt.target.value)
  }

  

  return(
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form">
        <input
        className="auth__input"
        placeholder="Email"
        onChange={handleNewEmail}
        />
        <input
        className="auth__input"
        placeholder="Пароль"
        onChange={handleNewPassword}
        />
        <button type="submit" className="auth__btn">Войти</button>
      </form>
    </div>
  )
}

export default Login;