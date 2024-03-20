import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function PricingBox() {
  const props = [
    {
      title: "Free",
      price: "₹ 0",
    },
    {
      title: "Basic",
      price: "₹ 149/day",
    },
    {
      title: "Professional",
      price: "₹ 999/week",
    },
    {
      title: "Advanced",
      price: "₹ 3499/month",
    },
  ];
  return (
    <>
      {props.map((item, index) => (
        <div key={index} className="Pricing-box">
          <h4>{item.title}</h4>
          <div className="price-container">
            <h3>{item.price}</h3>
          </div>
          <div className="features">
            <p>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span> </span>
              An Item
            </p>
            <p>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span> </span>An Second Item
            </p>
            <p>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span> </span>An Third Item
            </p>
            <p>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span> </span>An Fourth Item
            </p>
            <p>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span> </span>And a Fifth One
            </p>
          </div>
          <button key={index} className="btn-getstarted">
            Get Started
          </button>
        </div>
      ))}
    </>
  );
}

export default PricingBox;
