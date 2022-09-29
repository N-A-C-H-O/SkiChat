import "./Input.css";
import { IoMdAttach, IoMdSend } from "react-icons/io";
import { BsFillImageFill } from "react-icons/bs";
import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../utils/Firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const Input = () => {
  
  const [text,setText] = useState("");
  const [img,setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSubmit = async () => {
    if(img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateDoc(doc(db,"chats",data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      )
    } else {
      await updateDoc(doc(db,"chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      })
    }

    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp(),
    })

    setText("");
    setImg(null);
  }

  return (
    <div className="input-container">
        <input type="text" placeholder="Escribe algo..." onChange={e => setText(e.target.value)} value={text}/>
        <div className="input-send">
            <span><IoMdAttach/></span>
            <label htmlFor="fileInput">
                <span><BsFillImageFill/></span>
            </label>
            <input type="file" id="fileInput" onChange={e => setImg(e.target.files[0])}/>
            <span onClick={handleSubmit}><IoMdSend/></span>
        </div>
    </div>
  )
}