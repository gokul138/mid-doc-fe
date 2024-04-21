import React, { useState } from "react";
import { useUserContext } from "./UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faCrown, faSignOutAlt, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faUser,faBars } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {
  const { userData } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();


  const handleLogout = async () => {
    setIsOpen(!isOpen);
    try {
      // Get the token from cookies
      // const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
      // if (!token) {
      //   console.error("Token not found in cookies.");
      //   return;
      // }

      // Send the logout request with the token in the headers
      const response = await axios.post("https://docgeniee.org/mid-doc/doc-genie/logout");
      if(response?.data?.msg === 'success' && response?.data?.statusCode===200){
        navigate("/");
      }

      // Handle successful logout, such as redirecting to login page
    } catch (error) {
      console.error("Error occurred during logout:", error);
      // Handle error, such as displaying an error message
    }
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
      <FontAwesomeIcon icon={faBars} className="user-icon"/>  
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {/* <li>
            <FontAwesomeIcon icon={faCog} />
            Settings
          </li>
          <li>
            <FontAwesomeIcon icon={faCrown} />
            Upgrade Plans
          </li> */}
          <li > <FontAwesomeIcon icon={faUser} className="user-icon" />{userData?.name}</li>
          <li onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
