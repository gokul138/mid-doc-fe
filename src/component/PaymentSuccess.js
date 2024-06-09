import React, { useState, useEffect } from "react";
import "../../src/paymentsuccess.css";
import { useNavigate } from "react-router";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/home");
    }, countdown * 1000);

    return () => clearTimeout(timeout);
  }, [countdown, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="body-div">
      <div className="container">
        <div className="printer-top"></div>

        <div className="paper-container">
          <div className="printer-bottom"></div>

          <div className="paper">
            <div className="main-contents">
              <div className="success-icon">&#10004;</div>
              <div className="success-title">Payment Complete</div>
              <div className="success-description">
                Thank you for completing the payment! You will shortly receive
                an email of your payment.
              </div>
              <div className="order-details">
                <div className="complement">
                  You'll be redirected in {countdown} seconds.
                </div>
              </div>
            </div>
            <div className="jagged-edge"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
