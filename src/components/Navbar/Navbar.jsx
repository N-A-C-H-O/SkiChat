import "./Navbar.css";
import { signOut, updateProfile } from "firebase/auth";
import { auth, storage } from "../../utils/Firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Logo from "../../assets/images/logo_white.png";
import { Link } from "react-router-dom";
import { ImSwitch } from "react-icons/im";
import { ProfileModal } from "../ProfileModal/ProfileModal";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const Navbar = () => {
  const [modalShow, setModalShow] = useState(false); 
  const [newAvatar, setNewAvatar] = useState('');

  const {currentUser} = useContext(AuthContext);

  const changeAvatar = () => {
    const storageRef = ref(storage, currentUser.displayName);
    uploadBytesResumable(storageRef, newAvatar).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
                await updateProfile(currentUser, {
                    photoURL: downloadURL,
                });

                setNewAvatar('');

            } catch(error) {
                console.log(error);
            }
        });
    });
  }

  newAvatar && changeAvatar()

  return (
    <>
      <div className="navbar">
        <Link to="/">
          <img src={Logo} alt="Logo" className="logo-navbar" />
        </Link>
        <div className="user">
          <img src={currentUser.photoURL} alt="Imagen" onClick={() => setModalShow(true)} />
          <span>{currentUser.displayName}</span>
          <button onClick={() => signOut(auth)}><ImSwitch/></button>
        </div>
      </div>
      <ProfileModal isOpen={modalShow} toggleModal={() => setModalShow(false)} profileImg={currentUser.photoURL} setNewAvatar={setNewAvatar}/>
    </>
  )
}