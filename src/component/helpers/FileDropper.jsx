import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import RemoveFileAlert from "./RemoveFileAlert"; // Import the RemoveFileAlert component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const UploadFile = ({ fileTypes }) => {
  const [file, setFile] = useState(null);
  const [type, setFileType] = useState("");
  const [showRemoveAlert, setShowRemoveAlert] = useState(false); // State to manage whether the alert is shown or not

  useEffect(() => {
    if (fileTypes) {
      fileTypes === "docGeniee"
        ? setFileType(".pdf")
        : setFileType(".xlsx, .xls");
    }
  }, [fileTypes]);

  const handleUpload = (acceptedFiles) => {
    console.log("logging drop/selected file", acceptedFiles[0].size);
    const url = "https://api.escuelajs.co/api/v1/files/upload";
    const formData = new FormData();

    formData.append("file", acceptedFiles[0]); // Assuming you only accept one file

    axios
      .post(url, formData)
      .then((response) => {
        if (response.status === 201) {
          // File uploaded successfully
          setFile(acceptedFiles[0]);
        } else {
          // File upload failed
          console.error(response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeFile = () => {
    setShowRemoveAlert(true); // Show the alert when the Remove button is clicked
  };

  const confirmRemoveFile = (remove) => {
    if (remove) {
      var input = document.getElementById("file");
      input.value = "";
      setFile(null);
    }
    setShowRemoveAlert(false); // Hide the alert after confirming the removal
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("FRILS", file);
    setFile(file);
  };

  return (
    <div className="main-container">
      <div className="uploadFileBox">
        <FontAwesomeIcon
          icon={faArrowUpFromBracket}
          style={{ marginTop: "5%" }}
        />
        <label htmlFor="file">
          {"Drag & drop your file here Or browse file from device"}
        </label>
        <input
          id="file"
          className="select-file"
          name="fileUploader"
          type="file"
          accept={type}
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {file && (
          <button className="remove-button" onClick={removeFile}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
      {showRemoveAlert && (
        <RemoveFileAlert onConfirmRemove={confirmRemoveFile} />
      )}
      {file && (
        <button className="submit-button" onClick={handleUpload}>
          Upload
        </button>
      )}
    </div>
  );
};

export default UploadFile;
