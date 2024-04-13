import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../signup.css";
import StartToastifyInstance from "toastify-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";



function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gst, setGst] = useState("");
  const [showPassword, setShowPassword] = useState(false) 
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gst: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setErrors({ ...errors, firstName: "" });
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setErrors({ ...errors, lastName: "" });
  };

  const togglePasswordVisibility = (event) => {
    setShowPassword(!showPassword);
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: "" });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: "" });
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setErrors({ ...errors, confirmPassword: "" });
  };

  const handleGstChange = (event) => {
    // Change handler for GST
    setGst(event.target.value);
    setErrors({ ...errors, gst: "" }); // Clear error when input changes
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    

    // Perform client-side validation
    const newErrors = {};

  if (!firstName) {
    newErrors.firstName = "Please enter your first name.";
  }

  if (!lastName) {
    newErrors.lastName = "Please enter your last name.";
  }

  if (!email) {
    newErrors.email = "Please enter your email.";
  } else if (!emailRegex.test(email)) {
    newErrors.email = "Please enter a valid email address.";
  }

  if (!password) {
    newErrors.password = "Please enter your password.";
  } else if (!passwordRegex.test(password)) {
    newErrors.password =
      "Please enter a password with at least 8 characters, including uppercase, lowercase, and numbers.";
  }

  if (!confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password.";
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match.";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  // If all validations pass, make API call to sign up
  try {
    const response = await axios.post(
      "https://docgeniee.org/mid-doc/doc-genie/signup",
      {
        firstName,
        lastName,
        email,
        password,
        gst,
      }
    );

    if (response.data.msg === "success") {
      navigate("/");
    }

    if (!response.data.success) {
      throw new Error(response.data.message);
    } else {
      StartToastifyInstance({
        text: "SignUp failed",
        className: "info",
        style: {
          background: "linear-gradient(to right, #FFFF00, #FF0000)",
        },
      }).showToast();
    }

    // Handle successful sign up
    console.log("User signed up successfully", response);
  } catch (error) {
    console.error("Error signing up:", error);
    // Handle error here, e.g., display error message to user
  }
  };

  return (
    <div className="login-container">
       <div className="header-logo login-logo"></div>
      <h2 className="create-acc-font">Sign Up</h2>
      <div className="new-user-container">
        <label htmlFor="firstName">First Name</label>
        <div className="relative-container-for-errmsg">
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            className={`input-box  ${errors.firstName && "error-border"}`}
          />
          {errors.firstName && <p className="err-msg">{errors.firstName}</p>}
        </div>
        <label htmlFor="lastName">Last Name</label>
        <div className="relative-container-for-errmsg">
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            className={`input-box  ${errors.lastName && "error-border"}`}
          />
          {errors.lastName && <p className="err-msg">{errors.lastName}</p>}
        </div>
        <h4>Email</h4>
        <div className="relative-container-for-errmsg">
          <input
            className={`input-box ${errors.email && "error-border"}`}
            type="email"
            value={email}
            onChange={handleEmailChange}
            autoComplete="off"
          />
          {errors.email && <p className="err-msg">{errors.email}</p>}
        </div>
        <h4>Password</h4>
        <div className="relative-container-for-errmsg password-container-signup">
          <input
            className={`input-box ${errors.password && "error-border"}`}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            autoComplete="off"
          />
          <button
            className="password-toggle-btn-signup"
            onClick={togglePasswordVisibility}
          >{showPassword ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}</button>
          {errors.password && <p className="err-msg">{errors.password}</p>}
        </div>
        <h4>Confirm Password</h4>
        <div className="relative-container-for-errmsg">
          <input
            className={`input-box ${errors.confirmPassword && "error-border"}`}
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {errors.confirmPassword && (
            <p className="err-msg">{errors.confirmPassword}</p>
          )}
        </div>
        <h4>GST</h4>
        <div className="relative-container-for-errmsg">
          <input
            className={`input-box ${errors.gst && "error-border"}`}
            type="text"
            value={gst}
            onChange={handleGstChange}
          />
          {errors.gst && <p className="err-msg">{errors.gst}</p>}
        </div>
      </div>
      <button className="btn-sign-up" onClick={handleSubmit}>
        Sign Up
      </button>
      <p className="login-existing-user">
        Already have an account? <a href="/">Log In</a>
      </p>
    </div>
  );
}

export default SignUp;
