import "./Chats.css";
import profileImg from "../Navbar/download.jpg";

export const Chats = () => {
  return (
    <div className="user-chat">
        <img src={profileImg} alt="Imagen usuario"/>
        <div className="user-chat-info">
            <h4>Nombre</h4>
            <p>Mensaje</p>
        </div>
    </div>
  )
}