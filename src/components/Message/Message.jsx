import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import "./Message.css";

export const Message = ({info}) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  return (
    <div className="message owner">
      <div className="message-info">
        <img src={s} alt="Imagen usuario" />
        <span>Ahora</span>
      </div>
      <div className="message-content">
        <img src="https://cdn.shopify.com/s/files/1/0229/0839/files/bancos_de_imagenes_gratis.jpg?v=1630420628&width=1024" alt="" />
        <p>Hola a todos!</p>
      </div>
    </div> 
  )
}