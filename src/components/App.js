import CurrentUserContext from 'contexts/CurrentUserContext';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import api from 'utils/api';
import auth from 'utils/auth';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Main from './Main';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';

function App() {

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  function handleInfoPopup() {
    setIsInfoPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoPopupOpen(false);
  }

  function handleSignIn() {
    setLoggedIn(true)
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (localStorage.getItem('jwt')) {
      auth.checkTokenValidity(jwt)
        .then((res) => {
          if (res) {
            handleSignIn()
            setUserEmail(res.data.userEmail)
            history.push('/')
          }
        })
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function setNewUserInfo(data) {
    return { name: data.name, about: data.about, avatar: data.avatar }
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((data) => {
        setCurrentUser(setNewUserInfo(data));
        closeAllPopups()
      })
      .catch(err => {
        console.log(err);
    });
  }

  function handleUpdateAvatar(link) {
    api.editAvatar(link)
      .then((data) => {
        setCurrentUser(setNewUserInfo(data));
        closeAllPopups()
      })
      .catch(err => {
        console.log(err);
    });
  }

  function handleCardLike(data) {
    const isLiked = data.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(data, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === data._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCardDelete(data) {
    api.deleteCard(data._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== data._id ));
      })
      .catch(err => {
        console.log(err);
      });
    }

  function handleAddPlaceSubmit(item) {
    api.addNewCard(item)
      .then((item) => {
        setCards([item, ...cards]);
        closeAllPopups()
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
        })
        .catch(err => {console.log(err)});
      }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header
          email={userEmail}
          signOut={handleSignOut}
        />

        <Switch>
          <Route exact path="/">
            { loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" /> }
          </Route>

          <Route path="/sign-up">
            <Register />
          </Route>

          <Route path="/sign-in">
            <Login
              onLoggedIn={handleSignIn}
            />
          </Route>

          <ProtectedRoute
            path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>

        <Footer />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}>
        </ImagePopup>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}>
        </EditProfilePopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCard={handleAddPlaceSubmit}>
        </AddPlacePopup>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}>
        </EditAvatarPopup>

        <InfoTooltip
          loggedIn={loggedIn}
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}>
        </InfoTooltip>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
