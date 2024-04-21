import React from 'react'
import "../../modal.css"
import axios from 'axios';

const ConfirmModal = ({ isOpen, onClose, mail, message, handleSubmit}) => {

    const handleContinue = async() => {
      if(mail){
        const alreadyLogin = await axios.delete(
        `https://docgeniee.org/mid-doc/doc-genie/delete-session?mail=${mail}`
      );
      if (alreadyLogin?.data === "success") {
        handleSubmit(); // Retry login after deleting session
      }
    }
      };
    
  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div className="modal">
        <div className="modal-content">
          <p>{message}</p>
          <div className="modal-actions">
            <button className="yes" onClick={handleContinue}>
              Yes
            </button>
            <button className="no" onClick={onClose}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal
