import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import "./Message.css";

export const Message = ({info}) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  },[info]);

  return (
    <div ref={ref} className={`message ${info.senderId === currentUser.uid && "owner"}`}>
      <div className="message-info">
        <img src={info.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="Imagen usuario" />
        <span>Ahora</span>
      </div>
      <div className="message-content">
        {info.img && <img src={info.img} alt="" />}
        {info.text ? <p>{info.text}</p> : <br/>}
      </div>
    </div> 
  )
}