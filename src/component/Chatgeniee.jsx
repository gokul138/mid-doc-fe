import React from "react";
import "../chatgeniee.css";
import logo from "../img/logo.png";
import CgChatbox from "./CgChatbox";

const Chatgeniee = () => {
  return (
    <div className="cg-container">
      <div className="hero-container">
        <div className="logo">
          <img src={logo} alt="Welcome Logo" className="responsive-logo" />
        </div>
        <div className="suggestions">
          <button className="btn-random-suggestions">Write a story hahahahah</button>
          <button className="btn-random-suggestions">Write a story hahahahah</button>
          <button className="btn-random-suggestions">Write a story hahahahah</button>
          <button className="btn-random-suggestions">Write a story hahahahah</button>

        </div>
      </div>
       <div className="cg-chatbox-main">
         <CgChatbox/>
       </div>
      
    </div>
  );
};

export default Chatgeniee;
