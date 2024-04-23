import React, { useEffect } from "react";
import "../../modal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InfoModal = ({ isOpen, onClose, message }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        if (
          message === "Subcription has ended, Redirecting to Subcription page"
        ) {
          navigate("/pricing");
        } else {
          navigate("/");
        }
        onClose();
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, onClose, navigate]);

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div className="modal">
        <div className="modal-content">
          <p>{message}</p>
          <div className="modal-actions">
            {/* <button className="yes" onClick={handleContinue}>
              Okay
            </button> */}
            {/* <button className="no" onClick={onClose}>
              No
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
