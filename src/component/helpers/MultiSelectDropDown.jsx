import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const MultiSelectComponent = ({ sessionId, fileResponse }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Extract sheets from fileResponse and set as options
    const newOptions = fileResponse.map((file) => ({
      label: file.fileName,
      options: file.sheets.map((sheet) => ({
        value: sheet,
        label: sheet,
      })),
    }));
    console.log(fileResponse, "ERTE");
    setOptions(newOptions);
  }, [fileResponse]);

  const handleSelectChange = async (selected) => {
    setSelectedOptions(selected);

    try {
      const selectedSheets = selected.map((sheet) => sheet.value); // Extract selected sheet values

      const payload = {
        id: sessionId,
        files: [],
      };

      // Iterate through selected sheets to find corresponding files and create payload
      selectedSheets.forEach((selectedSheet) => {
        const fileWithSheet = fileResponse.find((file) =>
          file.sheets.includes(selectedSheet)
        );

        if (fileWithSheet) {
          const existingFileIndex = payload.files.findIndex(
            (file) => file.fileName === fileWithSheet.fileName
          );

          if (existingFileIndex === -1) {
            payload.files.push({
              fileName: fileWithSheet.fileName,
              sheets: [selectedSheet],
            });
          } else {
            payload.files[existingFileIndex].sheets.push(selectedSheet);
          }
        }
      });

      const response = await axios.post(
        `http://ec2-15-207-169-254.ap-south-1.compute.amazonaws.com:8081/select-and-preview-sheets?id=${sessionId}`,
        payload
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error processing payload:", error);
    }
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
