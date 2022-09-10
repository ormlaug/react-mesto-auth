import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {

  let location = useLocation();

  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип"
        className="header__logo"
      />
      <div className="navbar">
        {
        location.pathname === '/sign-up' &&
        <Link className="navbar__link" to="/sign-in">Войти</Link>
        } {
        location.pathname === '/sign-in' &&
        <Link className="navbar__link" to="/sign-up">Регистрация</Link>
        } {
        location.pathname === '/' &&
        <p className="navbar__link">{props.email}</p>
        } {
        location.pathname === '/' &&
        <div className="navbar__link" onClick={props.signOut}>Выйти</div>
        }
      </div>
    </header>
  )
}

export default Header;