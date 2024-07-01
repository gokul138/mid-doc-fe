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
      <div className="contact-modal">
        <div className="terms-header">
          <h2>Contact Support</h2>
        </div>
        <div className="terms-content">
          For any support or suggestions, please feel free to contact our team at <span ><b>support@finsightanalytics.org</b></span>      
        
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
