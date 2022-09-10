import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import auth from 'utils/auth';

function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNewEmail(evt) {
    setEmail(evt.target.value)
  }

  function handleNewPassword(evt) {
    setPassword(evt.target.value)
  }

  function handleRegister(evt) {
    evt.preventDefault();
    setEmail('');
    setPassword('');
    auth
      .signUp(password, email)
      .then(() => { props.onRegistration(true) })
      .catch(() => { props.onRegistration(false) })
  }

  return(
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleRegister}>
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
        <button type="submit" className="auth__btn">Зарегистрироваться</button>
      </form>
      <NavLink className="auth__navlink" to="/sign-in">Уже зарегистрированы? Войти</NavLink>
    </div>
  )
}

export default Register;