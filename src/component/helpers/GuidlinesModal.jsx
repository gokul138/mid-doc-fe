import React, { useState } from "react";
import "../../termsandconditions.css";
import { TermsAndConditionText } from "./TermsAndConditionText"; // Content of the terms

const GuidelinesModal = ({
  isOpen,
  onClose,
}) => {

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null; // Don't render if not open
  }

  return (
    <div className="modal-overlay">
      <div className="terms-modal">
        <div className="terms-header">
          <h2>Datageniee Guidelines</h2>
        </div>
        <div className="terms-content">
          <b>1. Structured Format Required:</b> Ensure all sheets contain only table-like data with rows, columns, and headers.<br/>
          <br/>
          <b>2. No Extraneous Data:</b> Do not include data outside the table (before, above, or after).<br/>
          <br/>
          <b>3. Mandatory Column Headers:</b> All columns must have headers.<br/>
          <br/>
          <b>4. Error-Free Data:</b> Avoid common Excel errors (e.g., #DIV/0!, #NUM!,#VALUE!, #N/A, #NAME?, #REF!, #NULL!).<br/>
          <br/>
          <b>5. Valid Date Fields:</b> Date fields must not be null or contain errors or multi date formats.<br/>
          <br/>
          <b>6. Compliance:</b> Sheets that do not meet these criteria will be excluded from selection.
          
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

export default GuidelinesModal;
