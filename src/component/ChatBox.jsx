import React, { useRef, useState } from "react";
import MultiSelectComponent from "./helpers/MultiSelectDropDown";

const ChatBox = () => {
  const inputRef = useRef(null);
  const [inputHeight, setInputHeight] = useState("auto");

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
      setInputHeight("auto"); // Reset input height after sending message
    }
  };

  const handleInputChange = () => {
    const input = inputRef.current;
    if (input) {
      setInputHeight(`${input.scrollHeight}px`);
    }
  };

  const handleInputDelete = () => {
    const input = inputRef.current;
    if (input && input.value === "") {
      setInputHeight("auto");
    }
  };

  return (
    <div className="rghtBox">
      <MultiSelectComponent />
      <div className="chatbox">
        <form id="message-form" onSubmit={handleSubmit}>
          <textarea
            id="message-input"
            className="user-input"
            placeholder="Type your message..."
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            onInput={handleInputDelete}
            style={{ height: inputHeight, maxHeight: "150px" }} // Set input height dynamically with a maximum height
          />
        </form>
      </div>
      <div className="send-container">
        <button type="button" className="sendbtn" onClick={handleSubmit}>
          <img
            src="https://cdn.icon-icons.com/icons2/2783/PNG/512/send_message_chat_icon_177294.png"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
