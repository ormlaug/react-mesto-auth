import React from "react";

function InfoTooltip(props) {

  const className = `
    popup
    popup_type_picture
    ${props.card ? 'popup_success' : 'popup_fail'}
    ${props.isOpen ? 'popup_active' : ''}
    `;

  return (
    <div className={className}>
      <div className="popup__container popup__container_reg-result">
        <button type="button" className="popup__close" aria-label="close" onClick={props.onClose}></button>
        <img className="popup__reg-image"
          src={}
          alt="Статус регистрации"
        />
        <p className="popup__subtitle"></p>
      </div>
    </div>
  )
}

export default InfoTooltip;