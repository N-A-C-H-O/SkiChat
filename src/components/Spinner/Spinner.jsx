import "./Spinner.css";
import Icon from "../../assets/images/logo_icon.png";

export const Spinner = () => {
    return(
        <div className="loader">
            <img src={Icon} alt="Loading" />
            <p>Cargando...</p>
        </div>
    );
}