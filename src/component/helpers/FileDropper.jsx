import React, { useEffect, useState } from "react";
import bin from "../../img/bin.png";
import * as XLSX from "xlsx";
import RemoveFileAlert from "./RemoveFileAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "toastify-js/src/toastify.css";
import StartToastifyInstance from "toastify-js";
import "../../../src/filedropper.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import InfoModal from "./InfoModal";
import axiosInstance from "../axiosInstance";
import UploadLoader from "./UploadLoader";

const UploadFile = ({ fileTypes, setSession, setFileResponse }) => {
  const [file, setFile] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [type, setFileType] = useState("");
  const [loader, setLoader] = useState(false);
  const [response, setResponse] = useState("");
  const [showRemoveAlert, setShowRemoveAlert] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  useEffect(() => {
    if (fileTypes) {
      fileTypes === "docGeniee"
        ? setFileType(".pdf")
        : setFileType(".xlsx, .xls, .xlsb");
    }
  }, [fileTypes]);

  const handleUpload = async () => {
    setLoader(true);
    if (!file) {
      StartToastifyInstance({
        text: "Please select a file to upload",
        className: "info",
        duration: 1500,
        style: {
          background: "linear-gradient(to right, #D32F2F, #D32F2F)",
        },
      }).showToast();
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }

    try {
      const response = await axiosInstance.post("doc-genie/upload", formData);
      setFileResponse(response?.data?.files);
      setSession(response.data.sessionId);
      if (response?.data?.isPrime === false) {
        // we need to add tostify messages
        navigate("/pricing");
      }
      if (response.status === 200 && response?.data?.message === "SUCCESS") {
        setLoader(false);
        StartToastifyInstance({
          text: "Uploaded sucessfully",
          className: "info",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
        // Optionally, you can reset the file state after successful upload
        // setFile([]);
      } else if (response?.data?.type === "Error") {
        setLoader(false);
        StartToastifyInstance({
          text: "Failed to upload file",
          className: "info",
          style: {
            background: "linear-gradient(to right, #D32F2F, #D32F2F)",
          },
        }).showToast();
      } else {
        throw new Error("Failed to upload file");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data.msg === "Invalid session" &&
        error.response.status === 401
      ) {
        handleOpenConfirmModal();
        // navigate("/");
      }
      console.error("Error uploading file:", error);
      StartToastifyInstance({
        text: "Failed to upload file",
        className: "info",
        style: {
          background: "linear-gradient(to right, #D32F2F, #D32F2F)",
        },
      }).showToast();
      // Check if the error response contains "Invalid session" with status code 401
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
      setFileResponse([]);
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
        if (totalSheetCount > 10) {
          StartToastifyInstance({
            text: "Total number of sheets across files cannot exceed 10",
            className: "info",
            style: {
              background: "linear-gradient(to right, #D32F2F, #D32F2F)",
            },
          }).showToast();
        } else {
          const fileNames = fileList.map((file) => file.name);
          setFile(fileList);
          setFileResponse([]);
        }
      });
    } else {
      StartToastifyInstance({
        text: "Upload less than or equal to 4 files",
        className: "info",
        style: {
          background: "linear-gradient(to right, #D32F2F, #D32F2F)",
        },
      }).showToast();
    }
  };
  const handleOpenConfirmModal = () => {
    setConfirmModalOpen(true);
  };
  const handleCloseConfirmModal = () => {
    setConfirmModalOpen(false);
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
        {loader ? (
          <UploadLoader />
        ) : (
          <>
            <FontAwesomeIcon
              className="upload-icon"
              icon={faArrowUpFromBracket}
              style={{ marginTop: "10%" }}
            />
            <label htmlFor="file">
              {"Browse files from device"}
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
          </>
        )}
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
