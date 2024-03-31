import React, { useState } from "react";
import axios from "axios";
import "../login.css";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setErrors({ ...errors, firstName: "" });
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setErrors({ ...errors, lastName: "" });
  };

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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If all validations pass, make API call to sign up
    try {
      const response = await axios.post("https://docgeniee.org/mid-doc/doc-genie/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
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
      <h2 className="create-acc-font">Sign Up</h2>
      <div className="sign-up-container">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
          className={`first-name ${errors.firstName && "error-border"}`}
        />
        {errors.firstName && <p className="error-msg">{errors.firstName}</p>}
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastNameChange}
          className={`first-name ${errors.lastName && "error-border"}`}
        />
        {errors.lastName && <p className="error-msg">{errors.lastName}</p>}
        <h4>Email</h4>
        <input
          className={`inpt-box ${errors.email && "error-border"}`}
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        {errors.email && <p className="error-msg">{errors.email}</p>}
        <h4>
          Password{" "}
          <a className="forgot-password" href="/forgot-password">
            Forgot?
          </a>
        </h4>
        <input
          className={`inpt-box ${errors.password && "error-border"}`}
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {errors.password && <p className="error-msg">{errors.password}</p>}
      </div>
      <button className="btn-sign-up" onClick={handleSubmit}>
        Sign Up
      </button>
      <p className="login-existing-user">
        Already have an account? <a href="/login">Log In</a>
      </p>
    </div>
  );
}

export default SignUp;
