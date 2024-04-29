import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../signup.css";
import StartToastifyInstance from "toastify-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import NewTabLoader from "./helpers/NewTabLoader";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import axiosInstance from "./axiosInstance";
import TermsAndConditionsModal from "./helpers/TermsAndCondition";

const SignUp = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [isTermsOpen, setTermsOpen] = useState(false);
  const [isTermsAccepted, setTermsAndCondition] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 1500);
    // Clean up the timeout on component unmount or when the flag is set to false
    return () => clearTimeout(timeout);
  }, [showLoader]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gst, setGst] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      const response = await axiosInstance.post(
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
            background: "linear-gradient(to right, #D32F2F, #D32F2F)",
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

  const handleTermsCheckboxChange = (event) =>{
    const value = event?.target?.value;
    console.log('Value', value);
    if(value === 'on'){
      setTermsOpen(true);
    }
  }
  const closeTermsModal = () =>{
    setTermsOpen(false);
  }
  const acceptTermsAndCondition = (value) =>{
    if(value){
      setTermsAndCondition(true);
    }else{
      setTermsAndCondition(false);
    }
  }

  return (
    <div>
      {showLoader ? (
        <NewTabLoader />
      ) : (
        <div className="signup-container">
        {isTermsOpen&&(
          <TermsAndConditionsModal isOpen={isTermsOpen} onClose={closeTermsModal} acceptTermsAndCondition={acceptTermsAndCondition} />
        )}
          <div className="header-logo login-logo"></div>
          <h2 className="create-acc-fonts">Sign Up</h2>
          <div className="new-user-container">
            <div className="name-container">
              <div className="first-name-container">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className={`input-box  ${errors.firstName && "error-border"}`}
                />
                {errors.firstName && (
                  <p className="err-msg">{errors.firstName}</p>
                )}
              </div>
              <div className="last-name-container">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                  className={`input-box  ${errors.lastName && "error-border"}`}
                />
                {errors.lastName && (
                  <p className="err-msg">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="relative-container-for-errmsg">
              <h4>Email</h4>
              <input
                className={`input-box ${errors.email && "error-border"}`}
                type="email"
                value={email}
                onChange={handleEmailChange}
                autoComplete="off"
              />
              {errors.email && <p className="err-msg">{errors.email}</p>}
            </div>

            <div className="name-container">
              <div className="first-name-container">
                <h4>Password</h4>
                <div className="rel">
                  <input
                    className={`input-box ${errors.password && "error-border"}`}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="off"
                  />
                  <button
                    className="password-toggle-btn-signup"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeSlash size={28} color="#bdbdbd" />
                    ) : (
                      <Eye size={28} color="#bdbdbd" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="err-msg">{errors.password}</p>
                )}
              </div>

              <div className="last-name-container">
                <h4>Confirm Password</h4>
                <input
                  className={`input-box ${
                    errors.confirmPassword && "error-border"
                  }`}
                  type="password"
                  value={confirmPassword}
                  id="confirm-password"
                  onChange={handleConfirmPasswordChange}
                />
                {errors.confirmPassword && (
                  <p className="err-msg">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="relative-container-for-errmsg">
              <h4>GST</h4>
              <input
                className={`input-box ${errors.gst && "error-border"}`}
                type="text"
                value={gst}
                onChange={handleGstChange}
              />
              {errors.gst && <p className="err-msg">{errors.gst}</p>}
            </div>
            <div className="terms-checkbox">
              <input
                type="checkbox"
                id="termsCheckbox"
                required
                onChange={handleTermsCheckboxChange}
                checked={isTermsAccepted}
              />
              <label htmlFor="termsCheckbox">
              By clicking on Sign Up, I accept the terms and conditions
              </label>
              
            </div>

            <button className="signup-btn" onClick={handleSubmit}>
              Sign Up
            </button>
            <p className="login-existing-user">
              Already have an account? <a href="/">Log In</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
