// Pricing.jsx

import React, { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance"; // Import the Axios instance
import PricingBox from "./PricingBox";
import "../pricing.css";

function Pricing() {
  const [planList, setPlanList] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axiosInstance.get("/doc-genie/plans"); // Use the Axios instance
        const { planList } = response.data;
        setPlanList(planList);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div>
      <div className="pricing-top-div">
        <h4 className="pricing-header">PRICING</h4>
        <br />
        <h2 className="slct-pln">Select your Plan</h2>
       
        <p>
          "From active listening to strategic implementation, we redefine
          systems for {<br />} enhanced efficiency, simplified processes, and
          informed decision-making."
        </p>
      </div>
      <div className="pricing-box-container">
        <PricingBox planList={planList} />
      </div>
    </div>
  );
}

export default Pricing;
