import React, { useRef, useState, useEffect } from "react";
import MultiSelectComponent from "./helpers/MultiSelectDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComputer,
  faUser,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../../src/chatbox.css";
import Loader from "./helpers/Loader";
import { LoadingProvider } from "./helpers/LoadingContext";

function Base64Image({ base64String }) {
  return <img src={`data:image/jpeg;base64,${base64String}`} alt="Base64" />;
}

const ChatBox = ({ sessionId, fileResponse, setFileResponse }) => {
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [inputHeight, setInputHeight] = useState("auto");
  const [messages, setMessages] = useState([]);
  const [tableResponse, setTableResponse] = useState(null);

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
                {
                  "Item": "Binder",
                  "OrderDate": "Sat, 23 Jan 2021 00:00:00 GMT",
                  "Region": "Central",
                  "Rep": "Kivell",
                  "Total": 999.4999999999999,
                  "Unit Cost": 19.99,
                  "Units": 50
                },
                {
                  "Item": "Pencil",
                  "OrderDate": "Tue, 09 Feb 2021 00:00:00 GMT",
                  "Region": "Central",
                  "Rep": "Jardine",
                  "Total": 179.64000000000001,
                  "Unit Cost": 4.99,
                  "Units": 36
                },
                {
                  "Item": "Pen",
                  "OrderDate": "Fri, 26 Feb 2021 00:00:00 GMT",
                  "Region": "Central",
                  "Rep": "Gill",
                  "Total": 539.7299999999999,
                  "Unit Cost": 19.99,
                  "Units": 27
                },
                {
                  "Item": "Pencil",
                  "OrderDate": "Mon, 15 Mar 2021 00:00:00 GMT",
                  "Region": "West",
                  "Rep": "Sorvino",
                  "Total": 167.44,
                  "Unit Cost": 2.99,
                  "Units": 56
                }
              ],
              sheetName: "SalesOrders"
            }
          ]
        }
      ]
    };
    // setFileResponse(dummyFileResponse);
  }, []);
console.log('tableResponse', messages, tableResponse);
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
          "http://ec2-15-207-169-254.ap-south-1.compute.amazonaws.com:8081/conversation",
          payload
        );

        // Process API response
        console.log('response', response.data);
        processApiResponse(response.data, currentTime);
      } catch (error) {
        console.error("Error:", error);
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
    } else if(responseData.type === "dataframe"){
      const value = responseData.value;
      replyData = {
        sender: "User 2",
        type: responseData.type,
        table: value? value : [],
        timestamp: currentTime,
      };
    }
    else {
      replyData = {
        sender: "User 2",
        type: responseData.type,
        image: responseData.type === "plot" ? responseData.value : null,
        timestamp: currentTime,
      };
    }
    setMessages((prevMessages) => [...prevMessages, replyData]);
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
        {/* <div>
        <Loader />
    </div> */}
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
                        icon={message.type === "user" ? faUser : faComputer}
                      />
                    </div>
                    <div className={`message ${message.type}`}>
                      <p className="message-text">{message.text}</p>
                      {message.type === "plot" && (
                        <div className="plot-container">
                          {/* <img src={message.image} alt="Plot" /> */}
                          <Base64Image base64String={message.image}/>
                        </div>
                      )}
                      {message.type === "table" && (
                        <div className="table-container">
                          {message.table.map((file, fileIndex) => (
                            <div key={fileIndex}>
                              {/* <h3>{file.fileName}</h3> */}
                              {file.sheetData.map((sheet, sheetIndex) => (
                                <div key={sheetIndex}>
                                  {/* <h4>{sheet.sheetName}</h4> */}
                                  {sheet.data.length > 0 && (
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
                      {message.type === "dataframe" && (
                        <div className="table-container">
                          {message.table.map((item, index) => (
                            <tr key={index}>
                              <td>{item.Item}</td>
                            </tr>
                          ))}
                        </div>
                      )}
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
                  {/* <img
              src="https://cdn.icon-icons.com/icons2/2783/PNG/512/send_message_chat_icon_177294.png"
              alt=""
            /> */}
                  <FontAwesomeIcon
                    className="send-icon"
                    icon={faArrowUpRightFromSquare}
                  />
                </button>
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
