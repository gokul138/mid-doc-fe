import React, { useRef, useState, useEffect } from "react";
import MultiSelectComponent from "./helpers/MultiSelectDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ChatBox = ({ sessionId, fileResponse }) => {
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [inputHeight, setInputHeight] = useState("auto");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const messageText = inputRef.current.value.trim();
    if (messageText !== "") {
      const currentTime = new Date().toLocaleTimeString();
      const newMessage = {
        id: messages.length + 1,
        sender: "User 1",
        type: "user",
        text: messageText,
        timestamp: currentTime,
      };
      setMessages([...messages, newMessage]);
      inputRef.current.value = "";
      setInputHeight("auto");

      try {
        const response = await axios.post(
          "http://ec2-15-207-169-254.ap-south-1.compute.amazonaws.com:8081/conversation",
          {
            id: sessionId,
            query: messageText,
          }
        );
        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="rghtBox">
      <MultiSelectComponent sessionId={sessionId} fileResponse={fileResponse} />
      <div className="chatbox">
        <div className="messages-container" ref={messagesContainerRef}>
          {messages.map((message) => (
            <div key={message.id} className="chat-bubble">
              <div className="initial">
                <FontAwesomeIcon
                  icon={message.type === "user" ? faUser : faComputer}
                />
              </div>
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <form id="message-form" onSubmit={handleSubmit}>
          <textarea
            id="message-input"
            className="user-input"
            placeholder="Type your message..."
            ref={inputRef}
            onKeyDown={handleKeyPress}
          />
          <button type="submit" className="sendbtn">
            <img
              src="https://cdn.icon-icons.com/icons2/2783/PNG/512/send_message_chat_icon_177294.png"
              alt=""
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
