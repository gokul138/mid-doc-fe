import React, { useRef, useState, useEffect } from "react";
import MultiSelectComponent from "./helpers/MultiSelectDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer, faUser, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../../src/chatbox.css";
import Loader from "./helpers/Loader";
import { LoadingProvider } from "./helpers/LoadingContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

function Base64Image({ base64String }) {
  return <img src={`data:image/jpeg;base64,${base64String}`} alt="Base64" />;
}

const ChatBox = ({ sessionId, fileResponse, setFileResponse }) => {
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [inputHeight, setInputHeight] = useState("auto");
  const [messages, setMessages] = useState([]);
  const [tableResponse, setTableResponse] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  const updateMessages = (newMessages) => {
    // Append the new messages to the existing messages state
    setMessages((prevMessages) => [...prevMessages, ...newMessages]);
  };

  useEffect(() => {
    // Dummy file response data
    const dummyFileResponse = {
      files: [
        {
          fileName: "SampleData.xlsx",
          sheetData: [
            {
              data: [
                {
                  "Item": "Pencil",
                  "OrderDate": "Wed, 06 Jan 2021 00:00:00 GMT",
                  "Region": "East",
                  "Rep": "Jones",
                  "Total": 189.05,
                  "Unit Cost": 1.99,
                  "Units": 95
                },
                // Add more data here if needed
              ],
              sheetName: "SalesOrders"
            }
          ]
        }
      ]
    };
    // setFileResponse(dummyFileResponse);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const messageText = inputRef.current.value.trim();
    if (messageText !== "") {
      const currentTime = new Date().toLocaleTimeString();
      const newMessage = {
        sender: "User 1",
        type: "user",
        text: messageText,
        timestamp: currentTime,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      inputRef.current.value = "";
      setInputHeight("auto");

      try {
        // Construct payload with session ID and message query
        const payload = {
          id: sessionId,
          query: messageText,
        };

        // Make POST request to API
        const response = await axios.post(
          "https://docgeniee.org/mid-doc/doc-genie/interaction",
          payload
        );

        if(!response?.data?.isPrime){
          navigate('/pricing');
        };
        
        // Process API response
        console.log('response', response.data);
        processApiResponse(response.data, currentTime);
      } catch (error) {
        console.error("Error:", error);
        // Check if the error response contains "Invalid session" with status code 401
        if (
          error.response &&
          error.response.data.msg === "Invalid session" &&
          error.response.status === 401
        ) {
          // Navigate the user to "/"
          navigate("/");
        }
      }
    }
  };

  const processApiResponse = (responseData, currentTime) => {
    // Process the response data here as before
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <LoadingProvider>
      <div className="rghtBox">
        {sessionId && (
          <div>
            <MultiSelectComponent
              sessionId={sessionId}
              fileResponse={fileResponse}
              setTableResponse={setTableResponse}
              setMessages={setMessages}
            />
            <div className="chatbox">
              <div className="messages-container" ref={messagesContainerRef}>
                {messages?.map((message, index) => (
                  <div key={index} className="chat-bubble">
                    {/* Render chat bubbles here */}
                  </div>
                ))}
              </div>
              <form id="message-form" onSubmit={handleSubmit}>
                {/* Render the message input form here */}
              </form>
            </div>
          </div>
        )}
      </div>
      <Loader />
    </LoadingProvider>
  );
};

export default ChatBox;
