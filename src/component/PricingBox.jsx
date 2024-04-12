import React from "react";
import axiosInstance from "./axiosInstance"; // Import the Axios instance
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function PricingBox() {
  const plans = [
    {
      title: "Free",
      price: "₹ 0",
      originalPrice: "₹5000",
      planId: "FREE_PLAN_ID",
    },
    {
      title: "Basic",
      price: "₹ 149/day",
      originalPrice: "₹5000",
      planId: "BASIC_PLAN_ID",
    },
    {
      title: "Professional",
      price: "₹ 999/week",
      originalPrice: "₹5000",
      planId: "PROFESSIONAL_PLAN_ID",
    },
    {
      title: "Advanced",
      price: "₹ 3499/month",
      originalPrice: "₹5000",
      planId: "ADVANCED_PLAN_ID",
    },
  ];

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
          <h3 className="original-price">{plan.originalPrice}</h3>
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
