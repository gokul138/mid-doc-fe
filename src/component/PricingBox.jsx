import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function PricingBox() {
  const plans = [
    {
      title: "Free",
      price: "₹ 0",
      planId: "FREE_PLAN_ID",
    },
    {
      title: "Basic",
      price: "₹ 149/day",
      planId: "BASIC_PLAN_ID",
    },
    {
      title: "Professional",
      price: "₹ 999/week",
      planId: "PROFESSIONAL_PLAN_ID",
    },
    {
      title: "Advanced",
      price: "₹ 3499/month",
      planId: "ADVANCED_PLAN_ID",
    },
  ];

  const handleGetStarted = async (planId) => {
    try {
      const response = await axios.get(`https://docgeniee.org/mid-doc/doc-genie/checkout?planId=TEST_LIVE`);
      console.log("API call response:", response.data);
      // Handle response if needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error if needed
    }
  };

  return (
    <>
      {plans.map((plan, index) => (
        <div key={index} className="Pricing-box">
          <h4>{plan.title}</h4>
          <div className="price-container">
            <h3>{plan.price}</h3>
          </div>
          <div className="features">
            <p>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span> </span>
              An Item
            </p>
            <p>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span> </span>Second Item
            </p>
            <p>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span> </span>Third Item
            </p>
            <p>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span> </span>Fourth Item
            </p>
            <p>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span> </span>And a Fifth One
            </p>
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
