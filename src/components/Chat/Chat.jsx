import "./Chat.css";
import { BsCameraVideoFill, BsFillPersonPlusFill } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi"
import { Messages } from "../Messages/Messages";
import { Input } from "../Input/Input";

export const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-info">
        <span>Nombre</span>
        <div className="chat-icons">
          <span><BsCameraVideoFill/></span>
          <span><BsFillPersonPlusFill/></span>
          <span><FiMoreHorizontal/></span>
        </div>
      </div>
      <div className="chat-conversation">
        <Messages/>
        <Input/>
      </div>
    </div>
  )
}