import "./Search.css";
import profileImg from "../Navbar/download.jpg";

export const Search = () => {
  return (
    <div className="search">
      <form>
        <input type="text" placeholder="Buscar usuario"/>
      </form>
      <div className="user-chat">
        <img src={profileImg} alt="Imagen usuario"/>
        <div className="user-chat-info">
          <h4>Nombre</h4>
        </div>
      </div>
    </div>
  )
}