import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { ArrowCircleUp } from "@phosphor-icons/react";

const CgChatbox = () => {
  return (
    <div className="cg-chatbox">
      <div className="cg-message-container"></div>
      <div className="cg-user-input">
        <input
          type="text"
          placeholder="Type your message..."
          className="cg-input-box"
        />
        <button className="cg-send-button">
          <FontAwesomeIcon
            className="custom-icon-size"
            icon={faCircleArrowUp}
            size="2x"
            color="#d7d7d7"
          />
        </button>
      </div>
    </div>
  );
};

export default CgChatbox;
