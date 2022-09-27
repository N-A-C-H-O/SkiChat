import "./Search.css";
import profileImg from "../Navbar/download.jpg";
import { useState } from "react";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../../utils/Firebase";

export const Search = () => {

  const [username,setUsername] = useState("");
  const [user,setUser] = useState(null);
  
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
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  return (
    <div className="search">
      <div className="search-form">
        <input onChange={e => setUsername(e.target.value)} onKeyDown={handleKey} type="text" placeholder="Buscar usuario"/>
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {
        user ? 
        <div className="user-chat">
          <img src={user.photoURL} alt="Imagen usuario"/>
          <div className="user-chat-info">
            <h4>{user.name}</h4>
          </div>
        </div> :
        <span>No se encontró nada</span>
      }
    </div>
  )
}