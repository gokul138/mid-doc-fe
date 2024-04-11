import React from "react";
import "../../src/paymentfail.css";
import { useNavigate } from "react-router";

const PaymentFail = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/pricing");
  };

  return (
    <div className="body-div">
      <div class="container">
        <div class="icon">&#10060;</div>
        <h1>Payment Failed</h1>
        <p>We're sorry, your payment could not be processed.</p>
        <p>Please try again later.</p>
        <button onClick={onSubmit}>Try Again</button>
      </div>
    </div>
  );
};

export default PaymentFail;
