import React from "react";
import profile from "../img/profile.jpg";
import Dropdown from "./helpers/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "./helpers/UserContext";
const Header = ({interactionType}) => {
  const { userData } = useUserContext();

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-logo"></div>
        <span className="app-name">Finsight<span className="seperator"></span> {interactionType}</span>
        <span className="subscription-days">
          {userData?.primeValidity && `Subscription expires in ${userData?.primeValidity}`}
        </span>
      </div>
      <div className="profile-container">
        <Dropdown />
      </div>
    </div>
  );
};

export default Header;
