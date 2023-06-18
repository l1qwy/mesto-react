import React, { useEffect, useState } from "react";
import api from "../../utils/Api.js";
import Card from "../card/Card.jsx";

export default function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onDeletePlace }) {
  const [userName, setUserName] = useState('')
  const [userDescription , setUserDescription ] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getUserInfoFromSrv(), api.getServerCards()])
      .then(([userInfo, cardsInfo]) => {
        setUserName(userInfo.name)
        setUserDescription(userInfo.about)
        setUserAvatar(userInfo.avatar)
        cardsInfo.forEach(item =>
          item.myId = userInfo._id)
        setCards(cardsInfo)
      })
  }, [])

  return (
    <main>
      <section className="profile">
        <button
          className="profile__avatar-button"
          type="button"
          aria-label="change-avatar"
          onClick={onEditAvatar}
        >
          <img
            className="profile__avatar"
            src={userAvatar}
            style={{ backgroundImage: `url(${userAvatar})` }}
            alt="Здесь должно быть изображение Вашего профиля"
            name="avatarProfile"
          />
        </button>

        <div className="profile__info">
          <h1 className="profile__name" id="name" >{userName}</h1>
          <p className="profile__description" id="job" >{userDescription}</p>
        </div>

        <button
          className="profile__edit-button"
          type="button"
          aria-label="edit-profile-button"
          onClick={onEditProfile}
        />
        
        <button
          className="profile__add-item-button"
          type="button"
          aria-label="add-item-galery"
          onClick = {onAddPlace}
        />
      </section>
      <section className="galery">
        {cards.map(data => {
          return(
            <article key = {data._id}>
              <Card cards = {data}
              onCardClick = {onCardClick}
              onDeletePlace = {onDeletePlace}
              />
            </article>
          )
        })}
      </section>
    </main>
  );
}