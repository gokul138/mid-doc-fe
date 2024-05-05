import React, { useState } from "react";
import "../../termsandconditions.css";
import { TermsAndConditionText } from "./TermsAndConditionText"; // Content of the terms

const TermsAndConditionsModal = ({ isOpen, onClose, acceptTermsAndCondition }) => {
  const [scrolledToEnd, setScrolledToEnd] = useState(false);

  const handleAccept = () => {
    if (scrolledToEnd) {
      acceptTermsAndCondition(true);
      handleClose(); // Close the modal after accepting terms
    } else {
      alert("Please scroll to the end before accepting.");
    }
  };

  const handleClose = () => {
    // acceptTermsAndCondition(false);
    onClose(); // Close the modal
  };

  const handleScroll = (e) => {
    console.log('SDssdssfdsd', e.target.clientHeight);
    const scrollHeight = e.target.scrollHeight - e.target.scrollTop;
    const totalHeight = e.target.clientHeight;
    const tolerance = 2; // Define your tolerance range here
    const atBottom = Math.abs(scrollHeight - totalHeight) <= tolerance;
    setScrolledToEnd(atBottom);
  };
  

  if (!isOpen) {
    return null; // Don't render if not open
  }

  return (
    <div className="modal-overlay">
      <div className="terms-modal">
        <div className="terms-header">
          <h2>Terms and Conditions</h2> {/* Fixed Header */}
        </div>
        <div className="terms-content" onScroll={handleScroll}>
          <TermsAndConditionText /> {/* Scrollable Content */}
        </div>
        <div className="terms-modal-actions">
          <button
            className={`accept-button ${scrolledToEnd ? "" : "disabled"}`}
            onClick={handleAccept}
            disabled={!scrolledToEnd}
          >
            Accept
          </button>
          <button className="close-button" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsModal;
