import "./Navbar.css";
import profileImg from "./download.jpg";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/Firebase";

export const Navbar = () => {

  const salir = () => {
    signOut(auth);
  }

  return (
    <div className="navbar">
      <h2 className="logo">SkiChat</h2>
      <div className="user">
        <img src={profileImg} alt="Imagen" />
        <span>Nombre</span>
        <button onClick={salir}>Salir</button>
      </div>
    </div>
  )
}