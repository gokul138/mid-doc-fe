import React from "react";
import "../forgotpassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock, faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Forgotpassword() {
  return (
    <form>
      <div className="password-container">
        <FontAwesomeIcon icon={faUnlock} className="unlock-logo" />
        <h3 className="password-heading">Enter your email below</h3>

        <input className="email-input" type="email" />
        <button className="btn-send-otp">Send OTP</button>
        <p className="re-send">
          If you didn't receive a code,<a href="#">Resend</a>
        </p>
        <p className="notification">
          We sent an email to dummy@gmail.com.Please check your email!
        </p>
        <div className="otp-verification-container">
          <h3 className="otp-message">Enter the code</h3>
          <div className="inputRow">
            <input type="text" id="1" maxlength="1" />
            <input type="text" id="2" maxlength="1" />
            <input type="text" id="3" maxlength="1" />
            <input type="text" id="4" maxlength="1" />
            <input type="text" id="5" maxlength="1" />
            <input type="text" id="6" maxlength="1" />
          </div>
          <button className="btn-reset">Reset</button>
        </div>
      </div>
    </form>
  );
}

export default Forgotpassword;
