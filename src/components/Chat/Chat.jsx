import "./Chat.css";
import { BsCameraVideoFill, BsFillPersonPlusFill } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi"
import { Messages } from "../Messages/Messages";
import { Input } from "../Input/Input";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

export const Chat = () => {

  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chat-info">
        <h5>{data.user?.name}</h5>
        <div className="chat-icons">
          <span><BsCameraVideoFill/></span>
          <span><BsFillPersonPlusFill/></span>
          <span><FiMoreHorizontal/></span>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}