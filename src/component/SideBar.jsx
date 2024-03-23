import React, { useState } from "react";
import UploadFile from "./helpers/FileDropper";

const SideBar = ({setSession, setFileResponse}) => {
  const [selectedMode, setSelectedMode] = useState("dataGeniee");
  console.log("selectedMode", selectedMode);

  const handleRadio = (event) => {
    setSelectedMode(event.target.value);
    console.log("Selected Mode:", event.target.value);
  };

  return (
    <div className="lftBox">
      <div className="interactionMode">
        <p>Choose your interaction mode:</p>
        <br />
        {/* <label>
                    <input 
                        type="radio" 
                        name="interactionMode" 
                        checked={selectedMode === "chatGeniee"}
                        onChange={handleRadio}
                        value="chatGeniee" 
                    /> Chat Geniee
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        name="interactionMode" 
                        checked={selectedMode === "docGeniee"}
                        onChange={handleRadio}
                        value="docGeniee" 
                    /> Doc Geniee
                </label> 
                <br />*/}
        <label>
          <input
            type="radio"
            name="interactionMode"
            checked={selectedMode === "dataGeniee"}
            onChange={handleRadio}
            value="dataGeniee"
          />{" "}
          Data Geniee
        </label>
      </div>
      <div className="uploadFile">
        <br />
        {selectedMode === "dataGeniee" || selectedMode === "docGeniee" ? (
          <>
            <UploadFile fileTypes={selectedMode} setSession={setSession} setFileResponse={setFileResponse} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SideBar;
