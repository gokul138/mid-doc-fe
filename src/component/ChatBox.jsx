import React, { useRef } from "react";
import MultiSelectComponent from "./helpers/MultiSelectDropDown";

const ChatBox = () => {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    const message = inputRef.current.value.trim();
    if (message !== "") {
      console.log("Message sent:", message);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="rghtBox">
      <div className="searchbox">
        <MultiSelectComponent />
      </div>
      <div className="chatbox">
        <form id="message-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="message-input"
            placeholder="Type your message..."
            ref={inputRef} 
            onKeyDown={handleKeyPress}
          />
        </form>
      </div>
      <div className="">
        <button type="button" className="sendbtn" onClick={handleSubmit}>
          <img
            src="https://cdn.icon-icons.com/icons2/2783/PNG/512/send_message_chat_icon_177294.png"
            alt="send"
          ></img>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;