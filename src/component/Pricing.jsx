import React, { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance"; // Import the Axios instance
import PricingBox from "./PricingBox";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "../pricing.css";
import NewTabLoader from "./helpers/NewTabLoader";
import Header from "./Header";

const Pricing = ()=> {

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 1500);
      // Clean up the timeout on component unmount or when the flag is set to false
      return () => clearTimeout(timeout);
    }, [showLoader]);


  const [planList, setPlanList] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  const fetchPlans = async () => {
    try {
      const response = await axiosInstance.get("doc-genie/plans"); // Use the Axios instance
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
        // navigate("/");
      }
    }
  };
  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div>
    {showLoader ? <NewTabLoader /> : 
   (<div className="show-overflow">
      <Header />
      <div className="pricing-top-div">
        <h4 className="pricing-header">PRICING</h4>
        <br />
        <h2 className="slct-pln">Select your Plan</h2>
        <p>
          From active listening to strategic implementation, we redefine
          systems for enhanced efficiency, simplified processes, and
          informed decision-making.
        </p>
      </div>
      <div className="pricing-box-container">
        <PricingBox planList={planList} />
      </div>
    </div>)}
  </div>
  );
}

export default Pricing;
