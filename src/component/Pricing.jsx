import React, { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance"; // Import the Axios instance
import PricingBox from "./PricingBox";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "../pricing.css";

const Pricing = ()=> {
  const [planList, setPlanList] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  const fetchPlans = async () => {
    try {
      const response = await axiosInstance.get("/plans"); // Use the Axios instance
      const { planList } = response.data;
      setPlanList(planList);
    } catch (error) {
      console.error("Error fetching plans:", error);
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
  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="show-overflow">
      <div className="pricing-top-div">
        <h4 className="pricing-header">PRICING</h4>
        <br />
        <h2 className="slct-pln">Select your Plan</h2>
        <p>
          From active listening to strategic implementation, we redefine
          systems for {<br />} enhanced efficiency, simplified processes, and
          informed decision-making.
        </p>
      </div>
      <div className="pricing-box-container">
        <PricingBox planList={planList} />
      </div>
    </div>
  );
}

export default Pricing;
