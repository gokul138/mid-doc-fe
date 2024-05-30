import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import RemoveFileAlert from "./RemoveFileAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket, faTrash } from "@fortawesome/free-solid-svg-icons";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import "../../../src/filedropper.css";
import { useNavigate } from "react-router-dom";
import InfoModal from "./InfoModal";
import axiosInstance from "../axiosInstance";
import UploadLoader from "./UploadLoader";

const UploadFile = ({ fileTypes, setSession, setFileResponse }) => {
  const [file, setFile] = useState([]);
  const [type, setFileType] = useState("");
  const [loader, setLoader] = useState(false);
  const [preType, setLoaderType] = useState('upload');
  const [showRemoveAlert, setShowRemoveAlert] = useState(false);
  const navigate = useNavigate();
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  useEffect(() => {
    setFileType(fileTypes === "docGeniee" ? ".pdf" : ".xlsx, .xls, .xlsm, .xlsb, .csv");
  }, [fileTypes]);

  const showToast = (message, type) => {
    Toastify({
      text: message,
      className: "info",
      style: {
        background: type === "success" 
          ? "linear-gradient(to right, #00b09b, #96c93d)" 
          : "linear-gradient(to right, #D32F2F, #D32F2F)",
      },
    }).showToast();
  };

  const handleUpload = async () => {
    setLoaderType('upload');
    setLoader(true);
    if (!file.length) {
      showToast("Please select a file to upload", "error");
      setLoader(false);
      return;
    }

    const formData = new FormData();
    file.forEach(f => formData.append("file", f));

    try {
      const response = await axiosInstance.post("doc-genie/upload", formData);
      setFileResponse(response?.data?.files);
      setSession(response.data.sessionId);
      setLoader(false);

      if (response?.data?.isPrime === false) {
        navigate("/pricing");
      }

      if (response.status === 200 && response?.data?.message === "SUCCESS") {
        showToast("Uploaded successfully", "success");
      } else {
        showToast("Failed to upload file", "error");
      }
    } catch (error) {
      setLoader(false);
      console.error("Error uploading file:", error);
      showToast("Failed to upload file", "error");
      if (error.response?.status === 401 && error.response.data.msg === "Invalid session") {
        handleOpenConfirmModal();
      }
    }
  };

  const removeFile = () => setShowRemoveAlert(true);

  const confirmRemoveFile = (remove) => {
    if (remove) {
      document.getElementById("file").value = "";
      setFile([]);
      setFileResponse([]);
    }
    setShowRemoveAlert(false);
  };

  const handleFileChange = async (event) => {
    setLoader(true);
    setLoaderType('select');
    const files = Array.from(event.target.files);

    const hasUnsupportedFiles = files.some(file => {
      const extension = file.name.split('.').pop().toLowerCase();
      return !type.includes(`.${extension}`);
    });

    if (hasUnsupportedFiles) {
      showToast("Unsupported file type. Please upload files with the accepted extensions.", "error");
      setLoader(false);
      return;
    }

    if (files.length > 4) {
      showToast("Upload less than or equal to 4 files", "error");
      setLoader(false);
      return;
    }

    const xlsbFiles = files.filter(file => file.name.split('.').pop().toLowerCase() === 'xlsb');
    const otherFiles = files.filter(file => file.name.split('.').pop().toLowerCase() !== 'xlsb');

    let totalSheetCount = 0;

    for (const file of otherFiles) {
      totalSheetCount += await readExcelFile(file);
    }

    if (totalSheetCount > 10) {
      showToast("Total number of sheets across files cannot exceed 10", "error");
      setLoader(false);
    } else {
      setFile([...xlsbFiles, ...otherFiles]);
      setFileResponse([]);
      setLoader(false);
    }
  };

  const handleOpenConfirmModal = () => setConfirmModalOpen(true);
  const handleCloseConfirmModal = () => setConfirmModalOpen(false);

  const readExcelFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        resolve(workbook.SheetNames.length);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div className="main-container">
      <div className="uploadFileBox">
        {loader ? (
          <UploadLoader type={preType} />
        ) : (
          <>
            <FontAwesomeIcon className="upload-icon" icon={faArrowUpFromBracket} style={{ marginTop: "10%" }} />
            <label htmlFor="file">Browse files from device</label>
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
          </>
        )}
      </div>
      <div className="button-container">
        {file.length > 0 && (
          <>
            <button className="submit-button" onClick={handleUpload}>
              Upload
            </button>
            <button className="remove-button" onClick={removeFile}>
              Remove
            </button>
          </>
        )}
        {showRemoveAlert && <RemoveFileAlert onConfirmRemove={confirmRemoveFile} />}
      </div>
      {isConfirmModalOpen && (
        <InfoModal
          isOpen={isConfirmModalOpen}
          onClose={handleCloseConfirmModal}
          message={"Invalid Session, Please Login again"}
        />
      )}
    </div>
  );
};

export default UploadFile;
