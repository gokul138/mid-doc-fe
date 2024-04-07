import React, { useState, useRef } from "react";
import "../forgotpassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { resetPassword, sendOTP, verifyOTP } from "./services/ForgotPasswordAPI"; // Import API functions
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false); // State
  const inputRefs = useRef(Array(6).fill(null));
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [showPassword, setShowPassword] = useState(false)

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendOTP = async (event) => {
    event.preventDefault();
    try {
      const response = await sendOTP(email);
      console.log('responseforOTP', response);
      // Check response data if needed
      if(response === 'success'){
        setNotification("OTP sent successfully. Please check your email.");
        setShowOtp(true);
        setOtpSent(true);
      }
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
    }
  };
  

  const handleOTPChange = (event, index) => {
    event.preventDefault();
    const val = event.target.value;
    const updatedOtp = [...otp];
    updatedOtp[index] = val;
    setOtp(updatedOtp);
    if (val !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  

  const handleNewPasswordChange = (event) => {
    event.preventDefault();
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    event.preventDefault();
    setConfirmNewPassword(event.target.value);
  };

  const handleResetPassword = (event) => {
    event.preventDefault();
    if (otp.join("") !== "123456") {
      setError("Incorrect OTP. Please enter the correct OTP.");
      return;
    }
    setShowOtp(false);
    setShowPasswordFields(true);
  };

  const handleKeyUp = (event, index) => {
    const key = event.key.toLowerCase();
    if (key === "backspace" || key === "delete") {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match. Please make sure both passwords are the same.");
      return;
    }
    try {
      const response = await resetPassword(email, confirmNewPassword);
      // Handle response data if needed
      if(response === 'success'){
        setNotification("Password reset successfully.");
        navigate("/"); // Navigate to main page
      }
      console.log('responseforReset', response);
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    }
  };  

  const handleVerifyOTP = async (event) => {
    event.preventDefault();
    try {
      const response = await verifyOTP(email, otp.join(""));
      console.log('responseVarifyOTP', response);
      if(response === 'success'){
        setShowOtp(false);
        setShowPasswordFields(true);
      }
      if(response === 'expired'){

      }
    } catch (error) {
      setError("Incorrect OTP. Please enter the correct OTP.");
    }
  };
  const togglePasswordVisibility = (event) => {
    setShowPassword(!showPassword);
    event.preventDefault();
    
  };
  

  return (
    <form>
      <div className="password-container">
        {!otpSent&&<div className="email-container">
        <FontAwesomeIcon icon={faUnlock} className="unlock-logo" />
        <h3 className="password-heading">Enter your email below</h3>

        <input
          className="email-input"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />
        <button className="btn-send-otp" onClick={handleSendOTP}>
          Send OTP
        </button>
        {error && <p className="error-msg">{error}</p>}
        {notification && <p className="notification-msg">{notification}</p>}
        </div>}
        {showOtp && (
          <div className="otp-verification-container">
          {notification && <p className="notification-msg">{notification}</p>}
            <h3 className="otp-message">Enter the code</h3>
            <div className="inputRow">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  className="otp-box"
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(event) => handleOTPChange(event, index)}
                  onKeyUp={(event) => handleKeyUp(event, index)}
                  ref={(input) => (inputRefs.current[index] = input)}
                />
              ))}
            </div>
            <button className="btn-reset" onClick={handleVerifyOTP}>
              Submit OTP
            </button>
          </div>
        )}
        {showPasswordFields && (
          <>
            <h3 className="password-heading">Enter new password</h3>
            <div className="new-password-input-container">
            <input
              className="password-input"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="New Password"
            />
            <button
            className="password-toggle-btn-forgot"
            onClick={(event) => togglePasswordVisibility(event)}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button></div>
            <input
              className="password-input"
              type="password"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              placeholder="Confirm New Password"
            />
           <button className="btn-reset" onClick={handlePasswordReset}>
              Reset
            </button>
          </>
        )}
      </div>
    </form>
  );
}

export default Forgotpassword;
