import "./Navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/Firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Logo from "../../assets/images/logo_white.png";
import { Link } from "react-router-dom";
import { ImSwitch } from "react-icons/im";

export const Navbar = () => {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className="navbar">
      <Link to="/">
        <img src={Logo} alt="Logo" className="logo-navbar" />
      </Link>
      <div className="user">
        <img src={currentUser.photoURL} alt="Imagen" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}><ImSwitch/></button>
      </div>
    </div>
  )
}