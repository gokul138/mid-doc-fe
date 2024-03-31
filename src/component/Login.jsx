import React, { useState } from "react";
import axios from "axios";
import "../login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: "" });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Perform client-side validation
    const newErrors = {};

    // if (!email) {
    //   newErrors.email = "Please enter your email.";
    // } else if (!emailRegex.test(email)) {
    //   newErrors.email = "Please enter a valid email address.";
    // }

    // if (!password) {
    //   newErrors.password = "Please enter your password.";
    // } else if (!passwordRegex.test(password)) {
    //   newErrors.password = "Please enter a password with at least 8 characters, including uppercase, lowercase, and numbers.";
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Make API call to authenticate user
      const response = await axios.post("https://docgeniee.org/mid-doc/doc-genie/login", {
        email,
        password
      });

      // Handle successful login
      setErrors({ email: "", password: "" }); // Clear any previous errors
      // Redirect user to main page or perform any other action
    } catch (error) {
      setErrors({ ...errors, email: "Invalid email or password. Please try again." });
    }
  };

  return (
    <div className="login-container">
      <h2 className="create-acc-font">Login to Your Account</h2>
      <div className="sign-up-container">
        <h4>Email</h4>
        <input
          className={`inpt-box ${errors.email && "error-border"}`}
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        {errors.email && <p className="error-msg">{errors.email}</p>}
        <h4>
          Password
        </h4>
        <input
          className={`inpt-box ${errors.password && "error-border"}`}
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {errors.password && <p className="error-msg">{errors.password}</p>}
      </div>
      <h4 className="forgot-password" href="/forgot-password">Forgot?</h4>
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
