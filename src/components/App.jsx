import React, { useState } from "react";
import Footer from './footer/Footer.jsx';
import Header from './header/Header.jsx';
import Main from './main/Main.jsx';
import PopupWithForm from "./popupWithForm/PopupWithForm.jsx";
import ImagePopup from "./imagePopup/ImagePopup.jsx";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(false)

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleDeletePlaceClick() {
    setIsDeletePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsDeletePopupOpen(false)
    setSelectedCard(false)
  }

  return (
    <div className="page">
      <Header />
      <Main 
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onDeletePlace = {handleDeletePlaceClick}
        onCardClick = {handleCardClick}
      />
      <Footer />

      <PopupWithForm 
        name='edit-profile'
        title='Редактировать профиль'
        textButton='Сохранить'
        onOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
      >
        <input
          className="form__field form__field_input_name"
          id="name-pfofile"
          type="text"
          name="nameProfile"
          placeholder="Имя"
          minLength = {2}
          maxLength = {40}
          required=""
        />
        <div className="form__error-container">
          <span id="name-pfofile-error" />
        </div>
        <input
          className="form__field form__field_input_job"
          id="job-profile"
          type="text"
          name="jobProfile"
          placeholder="Деятельность"
          minLength = {2}
          maxLength = {200}
          required=""
        />
        <div className="form__error-container">
          <span id="job-profile-error" />
        </div>
      </PopupWithForm>

      <PopupWithForm 
        name='add-item'
        title='Новое место'
        textButton='Создать'
        onOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}>
        <input
          className="form__field form__field_input_name form__field_input_title"
          id="name-img"
          type="text"
          name="name"
          placeholder="Название"
          minLength = {2}
          maxLength = {30}
          required=""
        />
        <div className="form__error-container">
          <span id="name-img-error" />
        </div>
        <input
          className="form__field form__field_input_job form__field_input_url"
          id="url-img"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required=""
        />
        <div className="form__error-container">
          <span id="url-img-error" />
        </div>
      </PopupWithForm>

      <PopupWithForm 
        name='avatar-profle'
        title='Обновить аватар'
        textButton='Сохранить'
        onOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
      >
        <input
          className="form__field form__field_change_avatar"
          id="url-avatar"
          type="url"
          name="avatarProfile"
          placeholder="Ссылка на аватар"
          required=""
        />
        <div className="form__error-container">
          <span id="url-avatar-error" />
        </div>
      </PopupWithForm>

      <PopupWithForm 
        name='delete-item'
        // тайтлы если изменить то нужно менять и в попапВитФорм, решить как уйти от этого. То же самое текстБуттон
        title='Вы уверены ?'
        textButton='Да'
        onOpen = {isDeletePopupOpen}
        onClose = {closeAllPopups}
      />

      <ImagePopup
        card = {selectedCard}
        onOpen = {selectedCard}
        onClose = {closeAllPopups}
      />
    </div>
  );
}

export default App;
