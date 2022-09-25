import "./Navbar.css";
import profileImg from "./download.jpg";

export const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">SkiChat</span>
      <div className="user">
        <img src={profileImg} alt="Imagen" />
        <span>Nombre</span>
        <button>Cerrar sesión</button>
      </div>
    </div>
  )
}