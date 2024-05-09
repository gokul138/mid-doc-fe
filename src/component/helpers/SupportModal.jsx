import React, { useState } from "react";
import "../../termsandconditions.css";

const SuportModal = ({
  isOpen,
  onClose,
}) => {

  const handleClose = () => {
    onClose();
  };
  const email = "email@example.com";
  const subject = "Support or Suggestions";
  
  
  if (!isOpen) {
    return null; // Don't render if not open
  }

  return (
    <div className="modal-overlay">
      <div className="terms-modal">
        <div className="terms-header">
          <h2>Contact Support</h2>
        </div>
        <div className="terms-content">
          <b>For any support or suggestions, please feel free to contact our team at <a href={`mailto:${email}?subject=${encodeURIComponent(subject)}`}>{email}</a>      
</b>        
        </div>
        <div className="terms-modal-actions">
          <button className="close-button" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuportModal;
