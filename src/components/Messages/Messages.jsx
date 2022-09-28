import "./Messages.css";
import { Message } from "../Message/Message";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/Firebase";

export const Messages = () => {

  const [messages,setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db,"chats",data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unsub();
    }
  },[data.chatId]);

  return (
    <div className="messages">
      {
        messages.map(message => <Message info={message} key={message.id}/>)
      }
    </div>
  );
}