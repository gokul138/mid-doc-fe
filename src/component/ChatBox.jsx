import React, { useRef, useState, useEffect } from "react";
import MultiSelectComponent from "./helpers/MultiSelectDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComputer,
  faUser,
  faPaperPlane,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../../src/chatbox.css";
import Loader from "./helpers/Loader";
import { LoadingProvider } from "./helpers/LoadingContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import StartToastifyInstance from "toastify-js";
import InfoModal from "./helpers/InfoModal";

function Base64Image({ base64String }) {
  return <img src={`data:image/jpeg;base64,${base64String}`} alt="Base64" />;
}

const ChatBox = ({ sessionId, fileResponse, setFileResponse }) => {
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [inputHeight, setInputHeight] = useState("auto");
  const [infoMessage, setInfoMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isApiDone, setApiDone] = useState(false);
  const [tableResponse, setTableResponse] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  function handleInput() {
    const input = inputRef.current;
    input.style.height = "auto";
    input.style.height = `${Math.min(input.scrollHeight, 200)}px`;
  }

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
                  Item: "Pencil",
                  OrderDate: "Wed, 06 Jan 2021 00:00:00 GMT",
                  Region: "East",
                  Rep: "Jones",
                  Total: 189.05,
                  "Unit Cost": 1.99,
                  Units: 95,
                },
                // Add more data here if needed
              ],
              sheetName: "SalesOrders",
            },
          ],
        },
      ],
    };
    // setFileResponse(dummyFileResponse);
  }, []);

  const handleOpenConfirmModal = () => {
    setConfirmModalOpen(true);
  };
  
  const handleCloseConfirmModal = () => {
    setConfirmModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiDone(true);
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

        if (response?.data?.isPrime === false) {
          // we need to add tostify messages
          setInfoMessage('Subcription has ended, Redirecting to Subcription page');
          handleOpenConfirmModal();
          // navigate("/pricing");
        }

        // Process API response
        console.log("response", response.data);
        processApiResponse(response.data, currentTime);
        setApiDone(false);
      } catch (error) {
        console.error("Error:", error);
        setApiDone(false);
        // Check if the error response contains "Invalid session" with status code 401
        if (
          error.response &&
          error.response.data.msg === "Invalid session" &&
          error.response.status === 401
        ) {
          setInfoMessage('Invalid Session, Please Login again');
          handleOpenConfirmModal();
          // Navigate the user to "/"
          // navigate("/");
        }
      }
    }
  };

  const processApiResponse = (responseData, currentTime) => {
    let replyData;
    if (responseData.type === "other") {
      const text = Array.isArray(responseData.value)
        ? responseData.value.map((item) => item.toString()).join(", ")
        : responseData.value.toString();
      replyData = {
        sender: "User 2",
        type: responseData.type,
        table: responseData.type === "dataframe" ? responseData.value : [],
        image: responseData.type === "plot" ? responseData.value : null,
        text: text,
        timestamp: currentTime,
      };
    } else if (responseData.type === "dataframe") {
      const value = responseData.value;
      replyData = {
        sender: "User 2",
        type: responseData.type,
        table: value ? value : [],
        timestamp: currentTime,
      };
    } else if (responseData?.type === "Error") {
      const value = responseData?.value;
      StartToastifyInstance({
        text: value,
        className: "info",
        style: {
          background: "linear-gradient(to right, #D32F2F, #D32F2F)",
        },
      }).showToast();
    }else {
      replyData = {
        sender: "User 2",
        type: responseData.type,
        image: responseData.type === "plot" ? responseData.value : null,
        timestamp: currentTime,
      };
    }
    if(replyData!== undefined){
      setMessages((prevMessages) => [...prevMessages, replyData]);
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
    <LoadingProvider>
      <div className="rghtBox">
        {sessionId && (
          <div>
            <MultiSelectComponent
              sessionId={sessionId}
              fileResponse={fileResponse}
              setTableResponse={setTableResponse}
              setMessages={setMessages} // Pass setMessages to MultiSelectComponent
            />
            <div className="chatbox">
              <div className="messages-container" ref={messagesContainerRef}>
                {messages?.map((message, index) => (
                  <div key={index} className="chat-bubble">
                    <div className="initial">
                      <FontAwesomeIcon
                        icon={message?.type === "user" ? faUser : faComputer}
                      />
                    </div>
                    <div className={`message ${message?.type}`}>
                    {message?.type !== "dataframe" && message?.type !== "plot" && (
                      <p className="message-text">{message?.text}</p>
                    )}
                      {message?.type === "plot" && (
                        <div className="plot-container">
                          {/* <img src={message.image} alt="Plot" /> */}
                          <Base64Image base64String={message?.image} />
                        </div>
                      )}
                      {message?.type === "table" && (
                        <div className="table-container">
                          {message?.table.map((file, fileIndex) => (
                            <div key={fileIndex}>
                              {/* <h3>{file.fileName}</h3> */}
                              {file?.sheetData?.map((sheet, sheetIndex) => (
                                <div key={sheetIndex}>
                                  {/* <h4>{sheet.sheetName}</h4> */}
                                  {sheet?.data?.length > 0 && (
                                    <table className="scroll-table">
                                      <thead>
                                        <tr>
                                          {Object.keys(sheet.data[0]).map(
                                            (header, headerIndex) => (
                                              <th key={headerIndex}>
                                                {header}
                                              </th>
                                            )
                                          )}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {sheet.data.map((row, rowIndex) => (
                                          <tr key={rowIndex}>
                                            {Object.values(row).map(
                                              (cell, cellIndex) => (
                                                <td key={cellIndex}>{cell}</td>
                                              )
                                            )}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                      {message?.type === "dataframe" && (
                        <div className="table-container">
                          <table className="dataframe-table">
                            <thead>
                              <tr>
                                {Object.keys(message?.table[0]).map(
                                  (header, index) => (
                                    <th key={index}>{header}</th>
                                  )
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {message?.table.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  {Object.values(row).map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="Chat-input">
                <form id="message-form" 
                onSubmit={handleSubmit}
                >
                  <textarea
                    id="message-input"
                    className="user-input"
                    style={{
                      maxHeight: "200px",
                      minHeight: "40px",
                      overflowY: "auto",
                    }}
                    placeholder="Type your message..."
                    ref={inputRef}
                    onKeyDown={handleKeyPress}
                    onChange={handleInput}
                    disabled={isApiDone}
                  />
                  <button type="submit" className="sendbtn" />
                </form>
              </div>
            </div>
          </div>
        )}
        {isConfirmModalOpen && (
        <InfoModal
          isOpen={isConfirmModalOpen}
          onClose={handleCloseConfirmModal}
          message={infoMessage}
        />
      )}
      </div>
      <Loader />
    </LoadingProvider>
  );
};

export default ChatBox;
