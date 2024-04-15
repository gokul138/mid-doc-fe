import React from "react";
import axiosInstance from "./axiosInstance"; // Import the Axios instance
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

function PricingBox({ planList }) {
  const navigate = useNavigate(); // Initialize navigate function

  const handleGetStarted = async (planId) => {
    try {
      const response = await axiosInstance.get(`/checkout?planId=${planId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      }); 
      const url = response?.data?.sessionId; 
      const primeUser = response?.data?.isPrime;
      if(primeUser){
        navigate('/main');
      }
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error:", error);
      // Check if the error response contains "Invalid session" with status code 401
      if (
        error.response &&
        error.response.data.msg === "Invalid session" &&
        error.response.status === 401
      ) {
        // Navigate the user to "/"
        navigate("/");
      }
    }
  };

  return (
    <>
      {planList.map((plan, index) => (
        <div key={index} className="Pricing-box">
          <h4>{plan.planName}</h4>
          <h3 className="original-price">{plan.originalPrice}</h3>
          <div className="price-container">
            <h3>{`Price: ${plan?.price || 0}`}</h3>
          </div>
          <div className="features">
            {/* Use inline styles to remove bullet points */}
            <ul style={{ listStyleType: "none" }}>
              {/* Map through plan.features if it exists */}
              {plan.features && plan.features.map((feature, index) => (
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
