import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import NewTabLoader from "./helpers/NewTabLoader";
import { useLocation, useNavigate } from "react-router-dom";
import { sendOTP, verifyOTP } from "./services/ForgotPasswordAPI";
import UploadLoader from "./helpers/UploadLoader";
import  '../buttonLoader.css'

const ConfirmMail = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [isOtpRequest, setOtpRequest] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [notification, setNotification] = useState("");
  const [buttonName, setButtonName] = useState('Submit');
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef(Array(6).fill(null));
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (location.state && location.state.userMail) {
      setEmail(location.state.userMail);
    } else {
      console.log('NO mail');
      navigate('/');
    }
  }, [location.state, navigate]);

  const handleSendOTP = async (event) => {
    event?.preventDefault();
    try {
      const response = await sendOTP(email, 'EMAIL');
      // Check response data if needed
      console.log('response', response);
      if(response === 'success'){
        setError("OTP sent successfully. Please check your email.");
      }else if(response === 'invalid'){
        setError("This email doesn't exist, please try again.");
      }
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
    }
    setOtpRequest(false);
  };

  useEffect(() => {
    console.log('EMAIL rendwer', email);
    if(email){
      handleSendOTP();
    }
  }, [email]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (buttonName === 'Verified') {
      const timeout = setTimeout(() => {
        navigate('/');
      }, 2000);
  
      return () => clearTimeout(timeout);
    }
  }, [ buttonName ,navigate]);

  const atIndex = email?.indexOf('@');
  const maskedEmail =
    email?.substring(0, 3) +
    email?.substring(3, atIndex).replace(/./g, "*") +
    email?.substring(atIndex);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOTPChange = (event, index) => {
    const val = event.target.value;
    const updatedOtp = [...otp];
    updatedOtp[index] = val;
    setOtp(updatedOtp);
    if (val !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
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

  const handleVerifyMail = async (event) => {
    event.preventDefault();
    setbuttonLoader(true);
    try {
      const response = await verifyOTP(email, otp.join(""), "EMAIL");
      if (response === "success") {
        // alert("OTP VERIFIED");
        setButtonName('Verified');
        setbuttonLoader(false);

      }
      if (response === "expired") {
        setError("OTP expired. Please request a new one.");
        setOtpRequest(true);
        setbuttonLoader(false);
      }
    } catch (error) {
      setError("Incorrect OTP. Please enter the correct OTP.");
      setbuttonLoader(false);
    }
  };

  return (
    <div>
      {showLoader ? (
        <NewTabLoader />
      ) : (
        <form>
          <div className="password-container">
            <div className="email-container">
              <FontAwesomeIcon icon={faUnlock} className="unlock-logo" />
              <h3 className="password-heading">Please confirm your email for using this application</h3>
              <input
                className="email-input"
                type="email"
                value={maskedEmail}
                onChange={handleEmailChange}
                disabled={true}
              />
              {buttonName === 'Varified' && <FontAwesomeIcon icon={faUserCheck}/>}
              {notification && (
                <p className="notification-msg">{notification}</p>
              )}
            </div> 
            <div className="otp-verification-container">
              {notification && (
                <p className="notification-msg">{notification}</p>
              )}
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
              {isOtpRequest ?
                <button className="btn-reset" onClick={handleSendOTP}>
                Request OTP
              </button> :
              <button className="btn-reset" onClick={handleVerifyMail}>
                {buttonLoader ? <div className="button-loader"></div> 
                : buttonName}
              </button>
              }
              {error && <p className="error-msg">{error}</p>}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ConfirmMail;
