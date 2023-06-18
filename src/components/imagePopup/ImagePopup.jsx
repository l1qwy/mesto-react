import React from "react";
export default function ImagePopup({ card, onOpen, onClose }) {
  return (
    <section className={`popup popup_scale-img ${onOpen && 'popup_open'}`}>
      <figure className="popup__scale-container">
        <button className="popup__close"
          type="button"
          aria-label="close-popup"
          onClick = {onClose}/>
        <img className="popup__scale-img"
          src = {card.link}
          alt = {`Увеличенное изображение ${card.name}`} />
        <figcaption className="popup__title-img">{card.name}</figcaption>
      </figure>
    </section>
  );
}