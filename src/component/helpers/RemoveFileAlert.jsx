import React from "react";

const RemoveFileAlert = ({ onConfirmRemove }) => {
  const handleConfirm = () => {
    onConfirmRemove(true);
  };

  const handleCancel = () => {
    onConfirmRemove(false);
  };

  return (
    <div className="remove-file-alert-overlay">
      <div className="remove-file-alert">
        <p>Are you sure you want to remove the file?</p>
        <div className="alert-buttons">
          <button className="confirm-button" onClick={handleConfirm}>Yes</button>
          <button className="cancel-button" onClick={handleCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default RemoveFileAlert;
