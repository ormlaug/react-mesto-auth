import React, { useState } from "react";
import successStatus from "../images/success.svg";
import failStatus from "../images/fail.svg";

function InfoTooltip(props) {

  const className = `
    popup
    popup_type_reg-sesult
    ${props.isSuccess ? 'popup_success' : 'popup_fail'}
    ${props.isOpen ? 'popup_active' : ''}
    `;

  return (
    <div className={className}>
      <div className="popup__container popup__container_reg-result">
        <button type="button" className="popup__close" aria-label="close" onClick={props.onClose}></button>
        <img className="popup__reg-image"
          src={ props.isSuccess ? `${successStatus}` : `${failStatus}` }
          alt="Статус регистрации"
        />
        <p className="popup__subtitle popup__subtitle_reg-result"></p>
      </div>
    </div>
  )
}

export default InfoTooltip;