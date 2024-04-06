import React, { useState, useRef } from "react";
import "../forgotpassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [showOtp, setShowOtp] = useState(false); // State to toggle OTP input visibility
  const [showPasswordFields, setShowPasswordFields] = useState(false); // State to toggle new password fields visibility
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false); // State
  const inputRefs = useRef(Array(6).fill(null)); // Refs to store input field references
  const [showPassword, setShowPassword] = useState(false)

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendOtp = (event) => {
    event.preventDefault(); // Prevent default form submission
    // Simulate OTP sending
    setNotification("OTP sent successfully. Please check your email.");
    setShowOtp(true); // Show OTP input boxes after sending OTP
    setOtpSent(true);
  };

  const handleOtpChange = (event, index) => {
    const val = event.target.value;
    const updatedOtp = [...otp];
    updatedOtp[index] = val;
    setOtp(updatedOtp);

    // Move focus to the next input box if available
    if (val !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleResetPassword = (event) => {
    event.preventDefault(); // Prevent default form submission
    // Validate OTP
    if (otp.join("") !== "123456") {
      setError("Incorrect OTP. Please enter the correct OTP.");
      return;
    }

    // Hide OTP input and show new password fields
    setShowOtp(false);
    setShowPasswordFields(true);
  };

  const handleKeyUp = (event, index) => {
    const key = event.key.toLowerCase();

    // Handle backspace or delete key
    if (key === "backspace" || key === "delete") {
      // Clear the current input box
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);

      // Move focus to the previous input box if available
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleResetOTP = () => {
    // Reset OTP input
    setOtp(Array(6).fill(""));
    setError("");
    setShowPasswordFields(false);
    setShowOtp(true);
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
        <button className="btn-send-otp" onClick={handleSendOtp}>
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
                  onChange={(event) => handleOtpChange(event, index)}
                  onKeyUp={(event) => handleKeyUp(event, index)}
                  ref={(input) => (inputRefs.current[index] = input)} // Assign reference to input element
                />
              ))}
            </div>
            <button className="btn-reset" onClick={handleResetPassword}>
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
            <button className="btn-reset" onClick={handleResetOTP}>
              Reset
            </button>
          </>
        )}
      </div>
    </form>
  );
}

export default Forgotpassword;
