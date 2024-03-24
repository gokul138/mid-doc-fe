import React from "react";
import "../welcome.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faFile,
  faComputer,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

const Welcome = () => {
  return (
    <>
      <div className="welcomepage">
        <div className="welcome-logo">
          {/* <img src="src/img/logo.png"></img> */}
        </div>
        <h1 className="welcome-text">Welcome to DataGeniee!</h1>
        <div className="icons-container">
          <FontAwesomeIcon icon={faFile} className="file-icon" />
          <FontAwesomeIcon icon={faFileExcel} className="excel-icon" />
          <FontAwesomeIcon icon={faFile} className="file-icon" />
          <FontAwesomeIcon icon={faComputer} className="computer-icon" />
          <FontAwesomeIcon icon={faFolderOpen} className="folder-open-icon" />
          <FontAwesomeIcon icon={faFile} className="file-icon" />
        </div>
      </div>
    </>
  );
};

export default Welcome;
