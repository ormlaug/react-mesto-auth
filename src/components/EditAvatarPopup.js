import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avaRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avaRef.current.value);
  }

  if (props.isOpen) {
    avaRef.current.value = '';
  }

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"avatar"}
      button={"Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
        <div className="form__container">
          <input
            type="url"
            id="avatar"
            name="avatar"
            className="form__item form__item_el_link"
            placeholder="Ссылка на картинку"
            ref={avaRef}
            required />
          <span className="form__error" id="avatar-error"></span>
        </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;