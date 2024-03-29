import React from "react";
import profile from "../img/profile.jpg";
import Dropdown from "./helpers/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <div className="header-logo"></div>
        <span className="app-name">DataGeniee</span>
      </div>
      <div className="profile-container">
        <FontAwesomeIcon icon={faUser} className="user-icon" />
        <div className="profilename">
          Vaisakh
          <Dropdown />
        </div>
      </div>
    </div>
  );
};

export default Header;
