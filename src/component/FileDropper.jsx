import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";

const UploadFile = ({fileTypes}) => {
  const [file, setFile] = useState(null);
  const [type, setFileType] = useState("");

  useEffect(() => {
  if(fileTypes){
    fileTypes === "docGeniee"? setFileType('.pdf') : setFileType('.xlsx, .xls');
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
    setFile(null);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="main-container">
      <div className="uploadFile">
        <input type="file" accept={type} onChange={handleFileChange} />
        <button className="remove-button" onClick={removeFile}>
          X
        </button>
      </div>
      <div>
      {file &&
      <button 
        className="remove-button" 
        onClick={handleUpload}>
        Submit
      </button>}
      </div>
    </div>
  );
};

export default UploadFile;
