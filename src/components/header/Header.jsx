import Image from '../../images/logo.png';
export default function Header() {
  return (
    <header className="header">
    <img
      className="header__logo"
      src={Image}
      alt="Здесь должено быть лого страницы 'Места'"
    />
    </header>
  );
}