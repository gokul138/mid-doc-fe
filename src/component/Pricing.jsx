import React from "react";
import PricingBox from "./PricingBox";
import "../pricing.css";

function Pricing() {
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
        <PricingBox />
      </div>
    </div>
  );
}

export default Pricing;
