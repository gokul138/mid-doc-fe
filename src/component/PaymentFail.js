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
      <div className="container">
        <div className="icon">&#10060;</div>
        <h1 className="heading-tag">Payment Failed</h1>
        <p className="para-tags">
          We're sorry, your payment could not be processed.
        </p>
        <p className="para-tags">Please try again later.</p>
        <button className="button-tag" onClick={onSubmit}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFail;
