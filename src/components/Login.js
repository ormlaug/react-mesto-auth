import React from 'react';

function Login(props) {

  return(
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={props.handleLogin}>
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
        <button type="submit" className="auth__btn">Войти</button>
      </form>
    </div>
  )
}

export default Login;