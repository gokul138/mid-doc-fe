import React, { useState, useEffect } from "react";
import axios from "axios";
import "../login.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: "" });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: "" });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform client-side validation
    const newErrors = {};
  
    // Validate email and password (uncomment if needed)
    if (!email) {
      newErrors.email = "Please enter your email.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Please enter your password.";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Please enter a password with at least 5 characters, including uppercase, lowercase, and numbers.";
      newErrors.password =
        "Please enter a password with at least 5 characters, including uppercase, lowercase, and numbers.";
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      // Make API call to authenticate user
      const response = await axios.post(
        "https://docgeniee.org/mid-doc/doc-genie/login",
        {
          email,
          password,
        }
      );
      // Check if login was successful
      if(response.status){
        const getUser = await axios.get(
          "https://docgeniee.org/mid-doc/doc-genie/user-info");
          console.log('/user-info', getUser);
          setUserData(getUser.data);
          if (getUser.data.primeUser === true) {
            navigate("/main");
          } else {
            navigate("/pricing");
          }
      }
      setErrors({ email: "", password: "" });
       // Clear any previous errors
      // Redirect user to main page or perform any other action
    } catch (error) {
      setErrors({
        ...errors,
        email: "Invalid email or password. Please try again.",
      });
    }
  };

  const getCookieData = () => {
    const cookieData = Cookies.get("X_DOCGENIEE_AUTH_TOKEN");
    console.log("authToken", cookieData);
  };

  useEffect(() => {
    getCookieData()
  }, [userData]);
  
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
    </div>
  );
}

export default Login;
