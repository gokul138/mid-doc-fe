import React from "react";
import * as XLSX from "xlsx";
import { FileArrowDown } from "@phosphor-icons/react";

const downloadExcel = (data) => {
    if(data?.type === 'dataframe'){
        const tableData = data?.table;
        // Create a new workbook
        const workbook = XLSX.utils.book_new();
      
        // Convert the data array to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(tableData);
      
        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      
        // Convert the workbook to a binary string
        const excelBinary = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
      
        // Convert the binary string to a Blob object
        const excelBlob = new Blob([s2ab(excelBinary)], { type: "application/octet-stream" });
      
        // Create a temporary link element
        const link = document.createElement("a");
      
        // Set the link's attributes
        link.href = window.URL.createObjectURL(excelBlob);
        link.download = "table_data.xlsx";
      
        // Append the link to the document body and click it programmatically
        document.body.appendChild(link);
        link.click();
      
        // Clean up by removing the temporary link
        document.body.removeChild(link);
    }
};

// Utility function to convert a string to an ArrayBuffer
function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

const ExcelDownloader = ({ data }) => {
  return (
    <button  onClick={() => downloadExcel(data)}><FileArrowDown size={30} /></button>
  );
};

export default ExcelDownloader;
