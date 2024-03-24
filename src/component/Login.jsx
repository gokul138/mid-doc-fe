import React from "react";
import "../login.css";

function Login() {
  return (
    <div className="login-container">
      {/* <h3 className="docgeniee-font">Welcome to DataGeniee!</h3> */}
      <h2 className="create-acc-font">Create Your Account</h2>
      <button className="Sign-up-google">
        <div className="google-logo"></div>
        Sign up with Google
      </button>
      <p className="sign-up-email">or sign up with email</p>
      <div className="sign-up-container">
        <h4>Email</h4>

        <input className="inpt-box" type="email" />
        <h4>
          Password <a className="forgot-password">Forgot?</a>
        </h4>
        <input className="inpt-box" type="password" name="" id="" />
      </div>
      <button className="btn-sign-up">Sign up</button>
      <p className="login-existing-user">
        Already have an account? <a href="#">Login</a>
      </p>
    </div>
  );
}

export default Login;
