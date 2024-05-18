import React, { useState } from "react";
import { useUserContext } from "./UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faCrown,
  faSignOutAlt,
  faHeadphonesSimple,
} from "@fortawesome/free-solid-svg-icons";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import SuportModal from "./SupportModal";
import { useLocation } from "react-router-dom";

const Dropdown = () => {
  const { userData } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  let isPricing = location.pathname !== '/pricing/';

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
      const response = await axiosInstance.post("doc-genie/logout");
      if (response?.data?.msg === "success") {
        navigate("/");
      }

      // Handle successful logout, such as redirecting to login page
    } catch (error) {
      console.error("Error occurred during logout:", error);
      // Handle error, such as displaying an error message
    }
  };
  const handlePlans = async () => {
    setIsOpen(!isOpen);
    try {
      navigate("/pricing");
      // Handle successful logout, such as redirecting to login page
    } catch (error) {
      console.error("Error occurred during logout:", error);
      // Handle error, such as displaying an error message
    }
  };
  const handleSupportOpen = async () => {
    setIsOpen(!isOpen);
    setIsModalOpen(true);
  };
  const modalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBars} className="user-icon" />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
        {isPricing && (
         <li>
            <FontAwesomeIcon icon={faUser} className="user-icon" />
            {userData?.name}
          </li>
        )}
        {isPricing && (
          <li onClick={handlePlans}>
            <FontAwesomeIcon icon={faCrown} className="user-icon" />
            Plans
          </li>
        )}
        {isPricing && (
          <li onClick={handleSupportOpen}>
            <FontAwesomeIcon icon={faHeadphonesSimple} />
            Support
          </li>
        )}
          <li onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </li>
        </ul>
      )}
      <SuportModal isOpen={isModalOpen} onClose={modalClose} />
    </div>
  );
};

export default Dropdown;
