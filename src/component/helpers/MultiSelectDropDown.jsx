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
    
    try {
      const selectedSheets = selected.map(option => option.value); // Get values of all selected sheets
    
      const payload = {
        id: sessionId,
        files: [], // Clear files array before adding new sheet
      };
  
      const fileWithSheet = fileResponse.find((file) =>
        file.sheets.some(sheet => selectedSheets.includes(sheet))
      );
      if (fileWithSheet) {
        payload.files.push({
          fileName: fileWithSheet.fileName,
          sheets: selectedSheets,
        });
      }
  
      const response = await axios.post(
        `https://docgeniee.org/mid-doc/doc-genie/select-and-preview-sheets?id=${sessionId}`,
        payload
      );
  
      if(response?.data?.isPrime === false){
        // Redirect to pricing page if the user is not a prime user
        navigate('/pricing');
      }
  
      setTableResponse(response?.data?.files);
  
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
      if (
        error.response &&
        error.response.data.msg === "Invalid session" &&
        error.response.status === 401
      ) {
        // Navigate the user to "/"
        navigate("/");
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
