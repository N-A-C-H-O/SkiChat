import { Link } from "react-router-dom";
import { BsBoxArrowInRight } from "react-icons/bs";

export const Login = () => {
    return(
        <div className="form-wrapper">
            <form autoComplete="off">
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
        </div>
    )
}