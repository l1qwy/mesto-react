import React from "react";
export default function PopupWithForm({ title, name, textButton, children, onOpen, onClose }) {
  return (
    <section className={`popup popup_type_${name} ${onOpen && 'popup_open'}`}>
      <div className={`popup__container ${name === 'delete-item' && 'popup__container_delete'}`}>
        <button className="popup__close"
          type="button" aria-label="close-popup"
          onClick = {onClose}/>
        <form
          name = {name}
          noValidate="">
          <h3 className={`form__title ${title === 'Вы уверены ?' && 'form__title_delete'}`}>{title}</h3>
          {children}
          <button className="submit"
            type="submit"
            aria-label="save-form">
            {textButton}
          </button>
        </form>
      </div>
    </section>
  );
}