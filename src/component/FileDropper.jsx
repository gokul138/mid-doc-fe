import axios from "axios";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

const UploadFile = () => {
  const [file, setFile] = useState(null);

  const handleUpload = (acceptedFiles) => {
    console.log("logging drop/selected file", acceptedFiles[0].size);
    // fake request to upload file
    const url = "https://api.escuelajs.co/api/v1/files/upload";
    const formData = new FormData();

    formData.append("file", acceptedFiles[0]); // Assuming you only accept one file

    axios
      .post(url, formData)
      .then((response) => {
        console.log(response, "sfsd");
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

  return (
    <div className="main-container">
      <Dropzone
        onDrop={handleUpload}
        accept="image/*"
        minSize={1024}
        maxSize={200000000}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
          const additionalClass = isDragAccept ? "accept" : isDragReject ? "reject" : "";

          return (
            <div
              {...getRootProps({
                className: `dropzone ${additionalClass}`,
              })}
            >
              <input {...getInputProps()} />
              <p>Drag and drop images here, or click to select files</p>
            </div>
          );
        }}
      </Dropzone>
      {file && (
        <div className="file-preview">
          <button className="remove-button" onClick={removeFile}>
            X
          </button>
          <h4>File Uploaded Successfully !!</h4>
          <img src={URL.createObjectURL(file)} className="img-container" alt="Uploaded file" />
        </div>
      )}
    </div>
  );
};

export default UploadFile;
