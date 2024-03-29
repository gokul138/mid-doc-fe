// MultiSelectComponent.js

import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const MultiSelectComponent = ({ sessionId, fileResponse, setTableResponse, setMessages }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);

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
    console.log('selected', selected);
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
          `http://ec2-15-207-169-254.ap-south-1.compute.amazonaws.com:8081/select-and-preview-sheets?id=${sessionId}`,
          payload
        );
        setTableResponse(response.data.files);
  
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
