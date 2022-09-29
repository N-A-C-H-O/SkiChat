import { Link, useNavigate } from "react-router-dom";
import { BsBoxArrowInRight } from "react-icons/bs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebase";
import Logo from "../assets/images/logo.png";
import { Spinner } from "../components/Spinner/Spinner";
import { useState } from "react";

export const Login = () => {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const inputEmail = e.target[0].value;
        const inputPassword = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
            navigate("/");
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found": 
                    setError('Los datos ingresados son incorrectos.');
                    break;
                case "invalid-password":
                    setError('Contraseña incorrecta');
                    break;
                default: setError('Se produjo un error');
            }
        }
        setLoading(false);
    }

    if (loading) {
        return <Spinner/>
    } else {
        return(
            <div className="form-wrapper login">
                <Link to="/">
                    <img src={Logo} alt="Logo" className="logo" />
                </Link>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-section">
                        <label htmlFor="nombre">Email</label>
                        <input id="nombre" type="email" placeholder="Ingrese su correo"/>
                    </div>
                    <div className="form-section">
                        <label htmlFor="nombre">Contraseña</label>
                        <input type="password" placeholder="Ingrese su contraseña"/>
                    </div>
                    <button type="submit">Enviar</button>
                    <Link to="/register" className="form-link">Aún no tengo cuenta <BsBoxArrowInRight/></Link>
                </form>
                {error && <span>{error}</span>}
            </div>
        );
    }
}