import CurrentUserContext from "contexts/CurrentUserContext";
import React, { useContext, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleUserName(evt) {
    setName(evt.target.value)
  }

  function handleUserDescription(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    })
  } 

  React.useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit"}
      button={"Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
        <div className="form__container">
            <input
              minLength={2}
              maxLength={40}
              id="name"
              name="name"
              type="text"
              className="form__item form__item_el_name"
              placeholder="Имя"
              value={ name || '' }
              onChange={handleUserName}
              required
            />
            <span className="form__error" id="name-error"></span>
          </div>
          <div className="form__container">
            <input
              minLength={2}
              maxLength={200}
              id="about"
              name="about"
              type="text"
              className="form__item form__item_el_text"
              placeholder="О себе"
              value={ description || '' }
              onChange={handleUserDescription}
              required
            />
            <span className="form__error" id="about-error"></span>
          </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;