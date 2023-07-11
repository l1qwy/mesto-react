import React, { useCallback, useEffect, useState } from "react";
import Footer from "./footer/Footer.jsx";
import Header from "./header/Header.jsx";
import Main from "./main/Main.jsx";
import EditProfilePopup from "./editProfilePopup/EditprofilePopup.jsx";
import PopupWithForm from "./popupWithForm/PopupWithForm.jsx";
import ImagePopup from "./imagePopup/ImagePopup.jsx";
import CurrentUserContext from "./contexts/CurrentUserContext.js";
import api from "../utils/Api.js";
import EditAvatarPopup from "./editAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./addPlacePopup/AddPlacePopup.jsx";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isScaleImage, setIsScaleImage] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [cards, setCards] = useState([]);
  const [deleteCard, setDeleteCard] = useState("");

  const closeAllPopups = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsScaleImage(false);
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    eventListenerForEsc();
  }

  function handleEditProfileClick() {
    eventListenerForEsc();
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    eventListenerForEsc();
    setIsAddPlacePopupOpen(true);
  }

  function handleDeletePlaceClick(cardId) {
    eventListenerForEsc();
    setDeleteCard(cardId);
    setIsDeletePlacePopupOpen(true);
  }

  function handleCardClick(card) {
    eventListenerForEsc();
    setSelectedCard(card);
    setIsScaleImage(true);
  }

  useEffect(() => {
    Promise.all([api.getUserInfoFromSrv(), api.getServerCards()])
      .then(([userInfo, cardsInfo]) => {
        setCurrentUser(userInfo);
        setCards(cardsInfo);
      })
      .catch((error) =>
        console.error("Ошибка при формировании страницы " + error)
      );
  }, []);

  function handleUpdateUser(input, reset) {
    api
      .setUserInfoToSrv(input)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) =>
        console.error("Ошибка сохранения введенных данных" + error)
      )
      .finally(() => reset(false));
  }

  function handleUpdateAvatar(input, reset) {
    api
      .changeAvatar(input)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) => console.error("Ошибка обновления аватара " + error))
      .finally(() => reset(false));
  }

  function handleCardDelete(event) {
    event.preventDefault();
    api
      .deleteCardFromSrv(deleteCard)
      .then(() => {
        setCards(
          cards.filter((item) => {
            return item._id !== deleteCard;
          })
        );
        closeAllPopups();
      })
      .catch((error) => console.error("Ошибка удаления карточки " + error));
  }

  function handleAddPlace(input, reset) {
    api
      .addCardToSrv(input)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((error) => console.error("Ошибка добавления карточки " + error))
      .finally(() => reset(false));
  }

  const closePopupByEsc = useCallback(
    (event) => {
      if (event.key === "Escape") {
        closeAllPopups();
        document.removeEventListener("keydown", closePopupByEsc);
      }
    },
    [closeAllPopups]
  );

  const closePopupByOverlay = useCallback(() => {
    closeAllPopups();
    document.removeEventListener("keydown", closePopupByEsc);
  }, [closeAllPopups, closePopupByEsc]);

  function eventListenerForEsc() {
    document.addEventListener("keydown", closePopupByEsc);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onDeletePlace={handleDeletePlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
        />
        <Footer />

        <EditProfilePopup
          onOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closePopupByOverlay}
        />

        <AddPlacePopup
          onOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlace}
          onClose={closePopupByOverlay}
        />

        <EditAvatarPopup
          onOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closePopupByOverlay}
        />

        <PopupWithForm
          name="delete-item"
          // тайтлы если изменить то нужно менять и в попапВитФорм, решить как уйти от этого. То же самое текстБуттон
          title="Вы уверены ?"
          textButton="Да"
          onOpen={isDeletePlacePopupOpen}
          isValid={true}
          onClose={closePopupByOverlay}
          onSubmit={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          onOpen={isScaleImage}
          onClose={closePopupByOverlay}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
