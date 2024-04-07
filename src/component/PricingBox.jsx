// PricingBox.jsx

import React from "react";
import axiosInstance from "./axiosInstance"; // Import the Axios instance
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function PricingBox({ planList }) {
  const handleGetStarted = async (planId) => {
    try {
      const response = await axiosInstance.get(`/mid-doc/doc-genie/checkout?planId=${planId}`); // Use the Axios instance
      console.log("API call response:", response.data);
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
            <h3>{`Price: ₹${plan.price}`}</h3>
          </div>
          <div className="features">
            <p>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span> </span>
              An Item
            </p>
            {/* Other features */}
          </div>
          <button className="btn-getstarted" onClick={() => handleGetStarted(plan.planId)}>
            Get Started
          </button>
        </div>
      ))}
    </>
  );
}

export default PricingBox;
