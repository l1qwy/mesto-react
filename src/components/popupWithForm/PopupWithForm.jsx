import React from "react";

export default function PopupWithForm({
  title,
  name,
  textButton,
  children,
  onOpen,
  onClose,
  onSubmit,
  isValid,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${onOpen && "popup_open"}`}
      onClick={onClose}
    >
      <div
        className={`popup__container ${
          name === "delete-item" && "popup__container_delete"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="popup__close"
          type="button"
          aria-label="close-popup"
          onClick={onClose}
        />
        <form
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          <h3
            className={`form__title ${
              title === "Вы уверены ?" && "form__title_delete"
            }`}
          >
            {title}
          </h3>
          {children}
          <button
            className={`submit ${isValid ? "" : "submit_disabled"}`}
            type="submit"
            aria-label="save-form"
            disabled={isValid ? false : true}
          >
            {textButton}
          </button>
        </form>
      </div>
    </section>
  );
}
