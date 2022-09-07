import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Register() {

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
      <h2 className="auth__title">Регистрация</h2>
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
        <button type="submit" className="auth__btn">Зарегистрироваться</button>
      </form>
      <NavLink className="auth__navlink" to="/sign-in">Уже зарегистрированы? Войти</NavLink>
    </div>
  )
}

export default Register;