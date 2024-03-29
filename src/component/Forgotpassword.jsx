import React, { useState } from "react";
import "../forgotpassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";

function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array to store OTP characters
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event, index) => {
    const val = event.target.value;

    // Perform client-side validation
    if (isNaN(val)) {
      return;
    }

    // Update the OTP array with the new value
    const updatedOtp = [...otp];
    updatedOtp[index] = val;
    setOtp(updatedOtp);

    // Move focus to the next input box if available
    if (val !== "" && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
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
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  const handleSendOtp = () => {
    // Perform client-side validation
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    // Simulating OTP generation and sending
    // For demonstration purposes, setting a dummy notification
    setNotification("OTP sent successfully. Please check your email.");
  };

  const handleResetPassword = () => {
    // Perform client-side validation
    if (otp.some((digit) => digit === "")) {
      setError("Please enter the complete OTP.");
      return;
    }

    // Simulating password reset
    setError("");
    setNotification("Password reset successfully.");
    setEmail("");
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <form>
      <div className="password-container">
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
        <div className="otp-verification-container">
          <h3 className="otp-message">Enter the code</h3>
          <div className="inputRow">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(event) => handleOtpChange(event, index)}
                onKeyUp={(event) => handleKeyUp(event, index)}
              />
            ))}
          </div>
          <button className="btn-reset" onClick={handleResetPassword}>
            Reset
          </button>
        </div>
      </div>
    </form>
  );
}

export default Forgotpassword;
