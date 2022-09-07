import React from "react";

function PopupWithForm(props) {

  const className = `popup popup_type_${props.name} ${props.isOpen ? 'popup_active' : ''}`;

  return (
    <div className={className}>
        <div className="popup__container">
          <button type="button" className="popup__close" aria-label="close" onClick={props.onClose}></button>
          <form className="form" name={props.name} onSubmit={props.onSubmit} noValidate>
            <h2 className="form__heading">{props.title}</h2>
              {props.children}
            <button type="submit" className="form__save-button" aria-label="save">{props.button}</button>
          </form>
        </div>
      </div>
  )
}

export default PopupWithForm;