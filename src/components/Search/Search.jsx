import "./Search.css";
import { useContext, useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from "../../utils/Firebase";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineSearch } from "react-icons/ai";

export const Search = () => {
  const [username,setUsername] = useState("");
  const [user,setUser] = useState(null);

  const {currentUser} = useContext(AuthContext)
  
  const handleSearch = async () => {
    const queryRef = query(collection(db, "users"), where("name", "==", username));
    try {
      const querySnapshot = await getDocs(queryRef);
      querySnapshot.forEach((doc) => {{
        setUser(doc.data());
      }});
    } catch (error) {
      console.log(error);
    }

    setUsername("");
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db,"chats",combinedId));
      if(!res.exists()) {
        await setDoc(doc(db,"chats",combinedId),{messages: []});

        await updateDoc(doc(db,"userChats",currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            name: user.name,
            photoURL: user.photoURL,
          }, 
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db,"userChats",user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            name: currentUser.displayName,
            photoURL: currentUser.photoURL,
          }, 
          [combinedId + ".date"]: serverTimestamp(),
        });

      }
    } catch (error) {
      console.log(error);
    }

    setUser(null);
    setUsername("");
  }

  return (
    <div className="search">
      <div className="search-form">
        <input onChange={e => setUsername(e.target.value)} onKeyDown={handleKey} type="text" value={username} placeholder="Buscar usuario"/>
        <button onClick={handleSearch}><AiOutlineSearch/></button>
      </div>
      {
        user && 
        <div className="user-chat user-search" onClick={handleSelect}>
          <img src={user.photoURL} alt="Imagen usuario"/>
          <div className="user-chat-info">
            <h4>{user.name}</h4>
          </div>
        </div>
      }
    </div>
  );
}