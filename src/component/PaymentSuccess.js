import React from "react";
import "../../src/paymentsuccess.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/main");
    }, 7000);
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
                <div className="complement">Thank You!</div>
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
