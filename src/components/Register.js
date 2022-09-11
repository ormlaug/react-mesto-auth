import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Register(props) {

  return(
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={props.onRegistration}>
        <input
        className="auth__input"
        placeholder="Email"
        onChange={props.handleNewEmail}
        value={props.email || ""}
        />
        <input
        className="auth__input"
        placeholder="Пароль"
        onChange={props.handleNewPassword}
        value={props.password || ""}
        />
        <button type="submit" className="auth__btn">Зарегистрироваться</button>
      </form>
      <NavLink className="auth__navlink" to="/sign-in">Уже зарегистрированы? Войти</NavLink>
    </div>
  )
}

export default Register;