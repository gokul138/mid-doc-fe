import React from "react";
import PricingBox from "./PricingBox";

function Pricing() {
  return (
    <div className="pricing-fonts">
      <h4 className="pricing-header">PRICING</h4>
      <br />
      <h2 className="slct-pln">Select your Plan</h2>
      <br />
      <p>
        "From active listening to strategic implementation, we redefine systems
        for {<br />} enhanced efficiency, simplified processes, and informed
        decision-making."
      </p>
      <div className="pricing-box-container">
        <PricingBox />
      </div>
    </div>
  );
}

export default Pricing;
