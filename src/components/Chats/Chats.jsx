import "./Chats.css";
import profileImg from "../Navbar/download.jpg";
import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/Firebase";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

export const Chats = () => {

  const [chats,setChats] = useState([]);

  const {currentUser} = useContext(AuthContext);

  const {dispatch} = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });  
  
      return () => {
        unsub();
      }
    }

    currentUser.uid && getChats();

  },[currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({type: "CHANGE_USER", payload: user})
  }

  return (
    Object.entries(chats)?.map((chat) => {
      return(
        <div className="user-chat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt="Imagen usuario"/>
          <div className="user-chat-info">
            <h4>{chat[1].userInfo.name}</h4>
            <p>{chat[1].userInfo.lastMessage?.text}</p>
          </div>
        </div>
      );
    })
  )
}