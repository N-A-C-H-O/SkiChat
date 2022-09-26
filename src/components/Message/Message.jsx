import "./Message.css";
import profileImg from "../Navbar/download.jpg";

export const Message = () => {
  return (
    <div className="message">
      <div className="message-info">
        <img src={profileImg} alt="Imagen usuario" />
        <span>Ahora</span>
      </div>
      <div className="message-content">
        {/* <img src="https://cdn.shopify.com/s/files/1/0229/0839/files/bancos_de_imagenes_gratis.jpg?v=1630420628&width=1024" alt="" /> */}
        <p>Hola mundo</p>
      </div>
    </div>
  )
}