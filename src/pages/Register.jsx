import { Link, useNavigate } from "react-router-dom";
import { BsBoxArrowInRight } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../utils/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import Logo from "../assets/images/logo.png";
import { useState } from "react";
import { Spinner } from "../components/Spinner/Spinner";
import { ToastContainer } from "react-toastify";
import { successNotif, errorNotif} from "../utils/Toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const inputName = e.target[0].value;
        const inputEmail = e.target[1].value;
        const inputPassword = e.target[2].value;
        const inputAvatar = e.target[3].files[0];
        try {
            const res = await createUserWithEmailAndPassword(auth,inputEmail,inputPassword);
            if (inputAvatar) {
                const storageRef = ref(storage, inputName);
                await uploadBytesResumable(storageRef, inputAvatar).then(() => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        try {
                            await updateProfile(res.user, {
                                displayName: inputName,
                                photoURL: downloadURL,
                            });
                            await setDoc(doc(db, "users", res.user.uid),{
                                uid: res.user.uid,
                                name: inputName,
                                email: inputEmail,
                                photoURL: downloadURL,
                            });

                            await setDoc(doc(db, "userChats", res.user.uid), {});

                            successNotif('Cuenta creada exitosamente!');

                            setTimeout(() => navigate("/"),2000);

                        } catch(error) {
                            console.log(error);
                            errorNotif('Se produjo un error.');
                        }
                    });
                });
            } else {
                await updateProfile(res.user, {
                    displayName: inputName,
                    photoURL: "https://firebasestorage.googleapis.com/v0/b/skichat-c5669.appspot.com/o/user_default.jpg?alt=media&token=6b98067f-f334-49fb-b82e-44f0bae5ad33",
                });
                
                await setDoc(doc(db, "users", res.user.uid),{
                    uid: res.user.uid,
                    name: inputName,
                    email: inputEmail,
                    photoURL: "https://firebasestorage.googleapis.com/v0/b/skichat-c5669.appspot.com/o/user_default.jpg?alt=media&token=6b98067f-f334-49fb-b82e-44f0bae5ad33",
                });
    
                await setDoc(doc(db, "userChats", res.user.uid), {});
    
                successNotif('Cuenta creada exitosamente!');
    
                setTimeout(() => navigate("/"),2000);
            }

        } catch (error) {
            console.log(error);
            switch (error.code) {
                case "auth/invalid-email":
                    errorNotif('Ingresa un email válido.');  
                    break;
                case "auth/weak-password":
                    errorNotif('La contraseña debe tener al menos 6 caracteres.');
                    break;
                case "auth/email-already-in-use":
                    errorNotif('El email ingresado ya existe.');
                    break;
                default: 
                    errorNotif('Se produjo un error.');
            };
        }
        setLoading(false)
    }

    if (loading) {
        return <Spinner/>
    } else {
        return(
            <div className="form-wrapper register">
                <Link to="/">
                    <img src={Logo} alt="Logo" className="logo" />
                </Link>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-section">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" placeholder="Ingrese su usuario" required maxLength={15}/>
                    </div>
                    <div className="form-section">
                        <label htmlFor="nombre">Email</label>
                        <input type="email" placeholder="Ingrese su correo" required maxLength={35}/>
                    </div>
                    <div className="form-section">
                        <label htmlFor="nombre">Contraseña</label>
                        <input type="password" placeholder="Ingrese su contraseña" required/>
                    </div>
                    <div className="form-section">
                        <label htmlFor="userAvatar"><span className="avatar-icon"><BiImageAdd/></span>Añadir avatar</label>
                        <input type="file" id="userAvatar"/>
                    </div>
                    <button type="submit">Enviar</button>
                    <Link to="/login" className="form-link">Ya estoy registrado <BsBoxArrowInRight/></Link>
                </form>
                <ToastContainer/>
            </div>
        );
    }
}