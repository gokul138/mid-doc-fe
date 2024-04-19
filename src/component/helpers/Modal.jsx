import React from 'react'
import "../../modal.css"

const Modal = ({ isOpen, onClose, onContinue }) => {

    const handleContinue = () => {
        // Continue logic here
      };
    
      onClose = () => {
         // Continue logic here
      };
  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div className="modal">
        <div className="modal-content">
          <p>There is already a session. Do you want to continue?</p>
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

export default Modal
