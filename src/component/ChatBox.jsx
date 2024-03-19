import React, { useRef, useState, useEffect } from "react";
import MultiSelectComponent from "./helpers/MultiSelectDropDown";

const dummyChatData = [
  {
    id: 1,
    sender: "User 2",
    type: "response",
    text: "Hello, how are you?",
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    sender: "User 1",
    type: "user",
    text: "I'm doing great, thanks!",
    timestamp: "10:05 AM",
  },
  {
    id: 3,
    sender: "User 2",
    type: "response",
    text: "Can you send me the sales report?",
    timestamp: "10:10 AM",
  },
  {
    id: 4,
    sender: "User 1",
    type: "user",
    text: "Sure, here is the table:",
    table: {
      headers: ["Product", "Quantity"],
      rows: [
        ["Product A", 10],
        ["Product B", 20],
        ["Product C", 15],
      ],
    },
    timestamp: "10:15 AM",
  },
  {
    id: 5,
    sender: "User 2",
    type: "response",
    text: "And here is an image:",
    image: "https://via.placeholder.com/150",
    timestamp: "10:20 AM",
  },
];

const ChatBox = () => {
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [inputHeight, setInputHeight] = useState("auto");
  const [messages, setMessages] = useState(dummyChatData);

  const handleSubmit = (event) => {
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
      <MultiSelectComponent />
      <div className="chatbox">
        <div className="messages-container" ref={messagesContainerRef}>
          {messages.map((message) => (
            <div className={`message ${message.type}`}>
              <div className="message-header">
                <div className="sender">{message.sender}</div>
                <div className="timestamp">{message.timestamp}</div>
              </div>
              <div className="text">{message.text}</div>
              {message.table && (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        {message.table.headers.map((header, index) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {message.table.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {message.image && <img src={message.image} alt="Image" />}
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
            style={{
              height: inputHeight,
              maxHeight: "150px",
            }}
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
