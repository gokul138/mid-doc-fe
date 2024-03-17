import React, { useState } from "react";
import Select from "react-select";

const MultiSelectComponent = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "1", label: "Sheet_1" },
    { value: "2", label: "Sheet_2" },
    { value: "3", label: "Sheet_3" },
    { value: "4", label: "Sheet_4" },
    { value: "5", label: "Sheet_5" },
  ];

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #ccc",
      borderRadius: "6px",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(66, 153, 225, 0.5)" : null,
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
        className="selection"
        options={options}
        isMulti
        value={selectedOptions}
        onChange={handleSelectChange}
        placeholder="Select Sheets"
        styles={customStyles}
      />
      <div></div>
    </div>
  );
};

export default MultiSelectComponent;
