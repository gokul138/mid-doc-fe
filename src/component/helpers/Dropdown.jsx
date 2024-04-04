import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faCrown, faSignOutAlt, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      // Get the token from cookies
      // const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
      // if (!token) {
      //   console.error("Token not found in cookies.");
      //   return;
      // }

      // Set the token in the request headers
      const config = {
        headers: {
          X_DOCGENIEE_AUTH_TOKEN: `d3038ff2-e8e0-4101-ba8a-0c`
        }
      };

      // Send the logout request with the token in the headers
      const response = await axios.post("https://docgeniee.org/mid-doc/doc-genie/logout", null, config);
      console.log("Logout response:", response);

      // Handle successful logout, such as redirecting to login page
    } catch (error) {
      console.error("Error occurred during logout:", error);
      // Handle error, such as displaying an error message
    }
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faAngleDown} />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li>
            <FontAwesomeIcon icon={faCog} />
            Settings
          </li>
          <li>
            <FontAwesomeIcon icon={faCrown} />
            Upgrade Plans
          </li>
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
