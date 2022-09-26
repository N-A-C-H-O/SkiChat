import "./Input.css";
import { IoMdAttach } from "react-icons/io";
import { BsFillImageFill } from "react-icons/bs";

export const Input = () => {
  return (
    <div className="input">
        <input type="text" placeholder="Escribe algo..."/>
        <div className="send">
            <span><IoMdAttach/></span>
            <label htmlFor="fileInput">
                <span><BsFillImageFill/></span>
            </label>
            <input type="file" id="fileInput"/>
            <button>Enviar</button>
        </div>
    </div>
  )
}