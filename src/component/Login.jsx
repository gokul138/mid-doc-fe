import React, { useState } from "react";
import "../login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform client-side validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // Make API call to authenticate user
      const response = await fetch("your_authentication_endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login.");
      }

      // Handle successful login
      setError(""); // Clear any previous errors
      // Redirect user to main page or perform any other action
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="create-acc-font">Login to Your Account</h2>
      {error && <p className="error-msg">{error}</p>}
      <div className="sign-up-container">
        <h4>Email</h4>
        <input
          className="inpt-box"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <h4>
          Password <a className="forgot-password"
          href="/forgot-password"
          >Forgot?</a>
        </h4>
        <input
          className="inpt-box"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
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
