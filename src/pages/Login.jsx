import { Link, useNavigate } from "react-router-dom";
import { BsBoxArrowInRight } from "react-icons/bs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebase";
import Logo from "../assets/images/logo.png";
import { Spinner } from "../components/Spinner/Spinner";

export const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputEmail = e.target[0].value;
        const inputPassword = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="form-wrapper login">
            {/* <Link to="/">
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
            </form> */}
            <Spinner/>
        </div>
    )
}