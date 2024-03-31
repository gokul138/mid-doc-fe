import React, { useEffect, useState } from "react";
import axios from "axios";
import bin from "../../img/bin.png";
import * as XLSX from "xlsx";
import RemoveFileAlert from "./RemoveFileAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "toastify-js/src/toastify.css";
import StartToastifyInstance from "toastify-js";
import "../../../src/filedropper.css"

const UploadFile = ({ fileTypes, setSession, setFileResponse }) => {
  const [file, setFile] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [type, setFileType] = useState("");
  const [response, setResponse] = useState("");
  const [showRemoveAlert, setShowRemoveAlert] = useState(false);

  useEffect(() => {
    if (fileTypes) {
      fileTypes === "docGeniee"
        ? setFileType(".pdf")
        : setFileType(".xlsx, .xls");
    }
  }, [fileTypes]);

  const handleUpload = async () => {
    if (!file) {
      StartToastifyInstance({
        text: "Please select a file to upload",
        className: "info",
        // gravity: "bottom", // top or bottom
        // position: "right", // left, center or right
        style: {
          background: "linear-gradient(to right, #FFFF00, #FF0000)",
        },
      }).showToast();
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }

    try {
      const response = await axios.post(
        "http://ec2-15-207-169-254.ap-south-1.compute.amazonaws.com:8081/upload",
        formData
      );
      setFileResponse(response?.data?.files);
      setSession(response.data.sessionId);

      if (response.status === 200) {
        StartToastifyInstance({
          text: "Uploaded sucessfully",
          className: "info",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
        // Optionally, you can reset the file state after successful upload
        // setFile([]);
      } else {
        throw new Error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      StartToastifyInstance({
        text: "Failed to upload file",
        className: "info",
        style: {
          background: "linear-gradient(to right, #FFA500, #FF0000)",
        },
      }).showToast();
    }
  };

  const removeFile = () => {
    setShowRemoveAlert(true);
  };

  const confirmRemoveFile = (remove) => {
    if (remove) {
      var input = document.getElementById("file");
      input.value = "";
      setFile([]);
      setFileResponse([])
    }
    setShowRemoveAlert(false);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileList = Array.from(files);

    if (fileList.length <= 4) {
      let totalSheetCount = 0;

      const fileCheck = fileList.map(async (file) => {
        const sheetCount = await readExcelFile(file);
        totalSheetCount += sheetCount;
      });

      Promise.all(fileCheck).then(() => {
        if (totalSheetCount > 4) {
          StartToastifyInstance({
            text: "Total number of sheets across files cannot exceed 4",
            className: "info",
            style: {
              background: "linear-gradient(to right, #FFA500, #FF0000)",
            },
          }).showToast();
        } else {
          const fileNames = fileList.map((file) => file.name);
          setFile(fileList);
          setFileResponse(fileList); // Assuming setFileResponse is a function to handle file response
        }
      });
    } else {
      StartToastifyInstance({
        text: "Upload less than or equal to 4 files",
        className: "info",
        style: {
          background: "linear-gradient(to right, #FFA500, #FF0000)",
        },
      }).showToast();
    }
  };

  const readExcelFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetCount = workbook.SheetNames.length;
        resolve(sheetCount);
      };
      reader.readAsArrayBuffer(file);
    });
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
        {file.map((f, index) => (
          <p className="display-name" key={index}>
            {f.name}
          </p>
        ))}
      </div>
      <div className="button-container">
        {file.length > 0 && (
          <button className="submit-button" onClick={handleUpload}>
            Upload
          </button>
        )}
        {file.length > 0 && (
          <button className="remove-button" onClick={removeFile}>
            Remove
          </button>
        )}
        {showRemoveAlert && (
          <RemoveFileAlert onConfirmRemove={confirmRemoveFile} />
        )}
      </div>
    </div>
  );
};

export default UploadFile;
