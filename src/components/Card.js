import CurrentUserContext from "contexts/CurrentUserContext";
import React, { useContext } from "react";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `cards__delete-button ${isOwn ? 'cards__delete-button' : 'cards__delete-button_inactive'}`
  );

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `cards__like-button ${isLiked ? 'cards__like-button_active' : ''}`; 


  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="cards__item">
      <img className="cards__photo"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="delete"></button>
      <div className="cards__info">
        <h2 className="cards__title">{props.card.name}</h2>
        <div>
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="like"></button>
          <p className="cards__likes-number">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;