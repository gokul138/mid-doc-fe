import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const MultiSelectComponent = ({ sessionId, fileResponse, setTableResponse, setMessages }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    if (fileResponse && fileResponse.length > 0) {
      const newOptions = fileResponse.map((file) => ({
        label: file.fileName,
        options: file.sheets.map((sheet) => ({
          value: sheet,
          label: sheet,
        })),
      }));
      setOptions(newOptions);
    } else {
      setSelectedOptions([]);
    }
  }, [fileResponse]);

  const handleSelectChange = async (selected) => {
    setSelectedOptions(selected);
    if (selected.length > 0) {
      try {
        const selectedSheet = selected[selected.length - 1].value; // Get the value of the last selected sheet
        
        const payload = {
          id: sessionId,
          files: [], // Clear files array before adding new sheet
        };
  
        const fileWithSheet = fileResponse.find((file) =>
          file.sheets.includes(selectedSheet)
        );

        if (fileWithSheet) {
          payload.files.push({
            fileName: fileWithSheet.fileName,
            sheets: [selectedSheet],
          });
        }
  
        const response = await axios.post(
          `https://docgeniee.org/mid-doc/doc-genie/select-and-preview-sheets?id=${sessionId}`,
          payload
        );
        if(response?.data?.isPrime){
          navigate('/pricing');
        }
        setTableResponse(response?.data?.files);
  
        // Update messages with the response
        const currentTime = new Date().toLocaleTimeString();
        const newMessage = {
          sender: "User 2",
          type: "table",
          table: response.data.files,
          timestamp: currentTime,
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
      } catch (error) {
        console.error("Error processing payload:", error);
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
  

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "2px solid #ccc",
      borderRadius: "6px",
      boxShadow: state.isFocused
        ? "0 0 0 2px rgba(66, 153, 225, 0.5)"
        : null,
      "&:hover": {
        borderColor: "#66afe9",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#66afe9" : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: "#66afe9",
        color: "white",
      },
    }),
  };

  return (
    <div className="select-sheets">
      <Select
        className="xyz"
        options={options}
        isMulti
        value={selectedOptions}
        onChange={handleSelectChange}
        placeholder="Select Sheets"
      />
    </div>
  );
};

export default MultiSelectComponent;
