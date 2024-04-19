import React from "react";
import profile from "../img/profile.jpg";
import Dropdown from "./helpers/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "./helpers/UserContext";
const Header = () => {
  const { userData } = useUserContext();

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-logo"></div>
        <span className="app-name">DataGeniee</span>
        <span className="subscription-days">
          Your premium subscription ends in{" "}
        </span>
      </div>
      <div className="profile-container">
        <Dropdown />
      </div>
    </div>
  );
};

export default Header;
