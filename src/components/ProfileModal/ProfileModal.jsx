import "./ProfileModal.css";
import { AiOutlineClose } from "react-icons/ai";

export const ProfileModal = ({profileImg, isOpen, toggleModal,setNewAvatar}) => {

  const handleOnChange = (e) => {
    setNewAvatar(e.target.files[0]);
    setTimeout(() => toggleModal(), 1500);
  }

  if (isOpen) {
    return (
      <div className="modal-container">
        <div className="modal-centered">
          <div className="modal">
            <div className="modal-header">
              <button onClick={toggleModal}><AiOutlineClose/></button>
            </div>
            <div className="modal-body">
              <img src={profileImg} alt="Imagen usuario" />
              <label htmlFor="changeAvatar" >
                Cambiar avatar
              </label>
              <input type="file" id="changeAvatar" onChange={handleOnChange}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}