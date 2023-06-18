export default function Card({ cards, onCardClick, onDeletePlace }) {
  return (
    <div className="galery__item">
      <img
        className="galery__img"
        src = {cards.link}
        onClick = {() => onCardClick(cards)}
        alt = {`Изображение ${cards.name}`}
      />
      <div className="galery__item-description">
        <h2 className="galery__item-title">{cards.name}</h2>
        <div>
          <button
            className="galery__item-emotion"
            type="button"
            aria-label="galery-emotion"
          />
          <span className="galery__counter">{cards.likes.length}</span>
        </div>
      </div>
      <button
        className="galery__delete"
        type="button"
        aria-label="delete-galery-item"
        onClick = {onDeletePlace}
      ></button>
    </div>
  )
}