import React from "react";
import axiosInstance from "./axiosInstance"; // Import the Axios instance
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function PricingBox({ planList }) {
  const handleGetStarted = async (planId) => {
    try {
      const response = await axiosInstance.get(`/checkout?planId=${planId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      }); 
      const url = response?.data?.sessionId; 
        if (url) {
          window.location.href = url;
        }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {planList.map((plan, index) => (
        <div key={index} className="Pricing-box">
          <h4>{plan.planName}</h4>
          <div className="price-container">
            <h3>{`Price: ₹${plan?.price || 0}`}</h3>
          </div>
          <div className="features">
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span> {feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <button className="btn-getstarted" onClick={() => handleGetStarted(plan.planId)}>
            Subscribe
          </button>
        </div>
      ))}
    </>
  );
}

export default PricingBox;
