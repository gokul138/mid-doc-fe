import React, { useState } from "react";
import "../../termsandconditions.css";
import axiosInstance from "../axiosInstance";
import { TermsAndConditionText } from "./TermsAndConditionText";

const TermsAndConditionsModal = ({ isOpen, onClose, acceptTermsAndCondition }) => {
  const [scrolledToEnd, setScrolledToEnd] = useState(false);

  const handleAccept = async () => {
    if (scrolledToEnd) {
        acceptTermsAndCondition(true);
      handleClose(); // Close the modal after accepting terms
    } else {
      alert(
        "Please scroll to the end of the terms and conditions before accepting."
      );
    }
  };

  const handleClose = () => {
    acceptTermsAndCondition(false);
    onClose(); // Close the modal
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    setScrolledToEnd(bottom);
  };

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div className="terms-modal" onScroll={handleScroll}>
        <div className="terms-modal-content">
          <h2>Terms and Conditions</h2>
          <TermsAndConditionText/>
          <div className="modal-actions">
            <button
              className={`accept ${scrolledToEnd ? "" : "disabled"}`}
              onClick={handleAccept}
            >
              Accept
            </button>
            <button className="close" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsModal;
