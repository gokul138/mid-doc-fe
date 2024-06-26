import React from "react";
import "../selectinteraction.css";
import PricingBox from "./PricingBox";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleClickChat = (type) => {
    console.log('YYPR', type);
    if(type === 'doc'){
      navigate("/docgeniee");
    }else if(type === 'data'){
      navigate("/datageniee");
    }else{
      // navigate("/datageniee");
    }
  };
  return (
    <div className="interaction-home-div  show-overflow">
      <div className="interaction-type">
        <h3>DataGeniee</h3>
        <p>
          Interact with our flagship language models in a conversational
          interface
        </p>
        <button 
        className="interaction-btn" 
        onClick={() => handleClickChat('data')}>
          open
        </button>
      </div>
      {/* <div className="interaction-type">
        <h3>DocGeniee</h3>
        <p>Integrate OpenAI models into your application or business</p>
        <button className="interaction-btn"
        onClick={() => handleClickChat('doc')}>
        open
        </button>
      </div> */}
    </div>
  );
}

export default Home;
