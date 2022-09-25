import { Link } from "react-router-dom";
import { BsBoxArrowInRight } from "react-icons/bs";


export const Register = () => {
    return(
        <div className="form-wrapper">
            <form autoComplete="off">
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
                <button type="submit">Enviar</button>
                <Link to="/login" className="form-link">Ya estoy registrado <BsBoxArrowInRight/></Link>
            </form>
        </div>
    )
}