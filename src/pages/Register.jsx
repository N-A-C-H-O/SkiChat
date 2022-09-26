import { Link } from "react-router-dom";
import { BsBoxArrowInRight } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../utils/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";


export const Register = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        try {
            const res = await createUserWithEmailAndPassword(auth,email,password);
            const storageRef = ref(storage, inputName);
            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        await updateProfile(res.user, {
                            inputName,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "users", res.user.uid),{
                            uid: res.user.uid,
                            inputName,
                            email,
                            photoURL: downloadURL,
                        });
                    } catch(error) {

                    }
                });
            });

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="form-section">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" placeholder="Ingrese su usuario"/>
                </div>
                <div className="form-section">
                    <label htmlFor="nombre">Email</label>
                    <input type="email" placeholder="Ingrese su correo"/>
                </div>
                <div className="form-section">
                    <label htmlFor="nombre">Contraseña</label>
                    <input type="password" placeholder="Ingrese su contraseña"/>
                </div>
                <div className="form-section">
                    <label htmlFor="userAvatar"><BiImageAdd/> Añadir avatar</label>
                    <input type="file" id="userAvatar"/>
                </div>
                <button type="submit">Enviar</button>
                <Link to="/login" className="form-link">Ya estoy registrado <BsBoxArrowInRight/></Link>
            </form>
        </div>
    )
}