import React from "react";
import "../loader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faFile,
  faComputer,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

const Loader = () => {
  return (
    <>
      <div className="loader">
        <div className="loader-boxes">
          <div className="box1"></div>
          <div className="box2"></div>
          <div className="box3"></div>
          <div className="box4"></div>
          <div className="box5"></div>
          <div className="box6"></div>
          <div className="box7"></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
