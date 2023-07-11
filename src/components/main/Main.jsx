import React, { useContext } from "react";
import Card from "../card/Card.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onDeletePlace,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  // const [userName, setUserName] = useState('')
  // const [userDescription , setUserDescription ] = useState('')
  // const [userAvatar, setUserAvatar] = useState('')

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
            src={currentUser.avatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            alt="Здесь должно быть изображение Вашего профиля"
            name="avatarProfile"
          />
        </button>

        <div className="profile__info">
          <h1 className="profile__name" id="name">
            {currentUser.name}
          </h1>
          <p className="profile__description" id="job">
            {currentUser.about}
          </p>
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
          onClick={onAddPlace}
        />
      </section>
      <section className="galery">
        {cards.map((data) => {
          return (
            <article key={data._id}>
              <Card
                cards={data}
                onCardClick={onCardClick}
                onDeletePlace={onDeletePlace}
              />
            </article>
          );
        })}
      </section>
    </main>
  );
}
