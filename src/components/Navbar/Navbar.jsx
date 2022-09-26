import "./Navbar.css";
import profileImg from "./download.jpg";

export const Navbar = () => {
  return (
    <div className="navbar">
      <h2 className="logo">SkiChat</h2>
      <div className="user">
        <img src={profileImg} alt="Imagen" />
        <span>Nombre</span>
        <button>Salir</button>
      </div>
    </div>
  )
}