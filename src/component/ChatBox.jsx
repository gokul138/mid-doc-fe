import React, { useRef, useState } from "react";
import MultiSelectComponent from "./helpers/MultiSelectDropDown";

// Define dummy chat data outside the component
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
  const [inputHeight, setInputHeight] = useState("auto");
  const [messages, setMessages] = useState(dummyChatData);

  const handleSubmit = (event) => {
    event.preventDefault();
    const messageText = inputRef.current.value.trim();
    if (messageText !== "") {
      const currentTime = new Date().toLocaleTimeString(); // Get current time
      const newMessage = {
        id: messages.length + 1,
        sender: "User 1",
        type: "user",
        text: messageText,
        timestamp: currentTime, // Add current time to the message
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

  return (
    <div className="rghtBox">
      <MultiSelectComponent />
      <div className="chatbox">
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <span className="sender">{message.sender}</span>
              <span className="timestamp">{message.timestamp}</span>
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
            style={{ height: inputHeight, maxHeight: "150px" }} // Set input height dynamically with a maximum height
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
