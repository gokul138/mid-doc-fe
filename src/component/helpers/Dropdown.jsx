import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faCrown,
  faSignOutAlt,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
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
