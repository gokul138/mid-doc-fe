import React, { useState } from "react";
import axios from "axios";
import "../login.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "./helpers/UserContext";
import ConfirmModal from "./helpers/ConfirmModal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const { setUserData } = useUserContext();
  const navigate = useNavigate();
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: "" });
    setIsInvalid(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: "" });
    setIsInvalid(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleOpenConfirmModal = () => {
    setConfirmModalOpen(true);
  };
  
  const handleCloseConfirmModal = () => {
    setConfirmModalOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Client-side validation
    if (!email || !emailRegex.test(email)) {
      setErrors({ ...errors, email: "Please enter a valid email address." });
      return;
    }

    if (!password || !passwordRegex.test(password)) {
      setErrors({
        ...errors,
        password:
          "Please enter a password with at least 5 characters, including uppercase, lowercase, and numbers.",
      });
      return;
    }

    try {
      // API call to authenticate user
      const response = await axios.post(
        "https://docgeniee.org/mid-doc/doc-genie/login",
        { email, password }
      );

      if (response.status === 200) {
        handleCloseConfirmModal();
        const getUser = await axios.get(
          "https://docgeniee.org/mid-doc/doc-genie/user-info"
        );

        setUserData(getUser.data);

        if (getUser.data.primeUser) {
          navigate("/main");
        } else {
          navigate("/pricing");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        handleOpenConfirmModal();
      
      } else {
        setIsInvalid(true);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="header-logo login-logo"></div>
      <h2 className="create-acc-font">Login to Your Account</h2>
      <div className="sign-up-container">
        <h4>Email</h4>
        <input
          className={`inpt-box ${errors.email && "error-border"}`}
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        {errors.email && <p className="error-msg-email">{errors.email}</p>}
        <h4 className="password-header">Password</h4>
        <div className="password-input-container">
          <input
            className={`inpt-box ${errors.password && "error-border"}`}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
          />
          <a className="forgot-password-login" href="/forgot-password">
            Forgot?
          </a>
          <button
            className="password-toggle-btn"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="error-msg-password">{errors.password}</p>
        )}
      </div>
      <button className="btn-sign-up" onClick={handleSubmit}>
        Sign In
      </button>
      <p className="login-existing-user">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
      {isInvalid && (
        <p className="error-msg">
          Invalid email or password. Please try again.
        </p>
      )}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Login;
