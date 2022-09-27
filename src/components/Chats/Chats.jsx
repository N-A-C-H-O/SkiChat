import "./Chats.css";
import profileImg from "../Navbar/download.jpg";
import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/Firebase";
import { AuthContext } from "../../context/AuthContext";

export const Chats = () => {

  const [chats,setChats] = useState([]);

  const {currentUser} = useContext(AuthContext);

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

  console.log(chats)

  return (
    Object.entries(chats)?.map((chat) => {
      return(
        <div className="user-chat" key={chat[0]}>
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