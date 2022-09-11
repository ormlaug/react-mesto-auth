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
  const [isRegistered, setRegistered] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  //Register
  function handleNewEmail(evt) {
    setEmail(evt.target.value)
  }

  function handleNewPassword(evt) {
    setPassword(evt.target.value)
  }

  function handleInfoPopup(isRegistrationSuccess) {
    setRegistered(isRegistrationSuccess);
    setIsInfoPopupOpen(true);
  }

  function handleRegister(evt) {
    evt.preventDefault();
    setEmail('');
    setPassword('');
    auth
      .signUp(password, email)
      .then(() => { handleInfoPopup(true) })
      .catch(() => { handleInfoPopup(false) })
  }

  //Login
  function handleLogin(evt) {
    evt.preventDefault();
    if (!email || !password) {
      return
    }
    auth
      .signIn(password, email)
      .then((jwt) => {
        if (jwt) {
          setEmail('');
          setPassword('');
          handleTokenCheck();
          history.push('/')
        }
      })
      .catch(err => {console.log(err)});
  }

  //cards
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
            setUserEmail(res.data.email)
            history.push('/')
          }
        })
        .catch(err => {console.log(err)});
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
      .catch(err => {console.log(err)});
  }

  function handleUpdateAvatar(link) {
    api.editAvatar(link)
      .then((data) => {
        setCurrentUser(setNewUserInfo(data));
        closeAllPopups()
      })
      .catch(err => {console.log(err)});
  }

  function handleCardLike(data) {
    const isLiked = data.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(data, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === data._id ? newCard : c));
      })
      .catch(err => {console.log(err)});
  }

  function handleCardDelete(data) {
    api.deleteCard(data._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== data._id ));
      })
      .catch(err => {console.log(err)});
    }

  function handleAddPlaceSubmit(item) {
    api.addNewCard(item)
      .then((item) => {
        setCards([item, ...cards]);
        closeAllPopups()
      })
      .catch(err => {console.log(err)});
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
          <Route path="/sign-up">
            <Register
              onRegistration={handleRegister}
              email={email}
              password={password}
              handleNewEmail={handleNewEmail}
              handleNewPassword={handleNewPassword}
            />
          </Route>

          <Route path="/sign-in">
            <Login
              handleLogin={handleLogin}
              handleNewEmail={handleNewEmail}
              handleNewPassword={handleNewPassword}
              email={email}
              password={password}
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
          isSuccess={isRegistered}
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}>
        </InfoTooltip>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
