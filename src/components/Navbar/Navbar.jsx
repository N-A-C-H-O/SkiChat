import "./Navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/Firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Navbar = () => {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className="navbar">
      <h2 className="logo">SkiChat</h2>
      <div className="user">
        <img src={currentUser.photoURL} alt="Imagen" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Salir</button>
      </div>
    </div>
  )
}