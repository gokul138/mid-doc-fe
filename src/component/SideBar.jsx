import React, { useState } from "react";
import UploadFile from "./helpers/FileDropper";

const SideBar = ({ setSession, setFileResponse }) => {
  const [isOverlayExpanded, setIsOverlayExpanded] = useState(false);
  const [isIconRight, setIsIconRight] = useState(true);


  const toggleOverlay = () => {
    setIsOverlayExpanded(!isOverlayExpanded);
    setIsIconRight(!isIconRight);
  };

  return (
    <div className="lftBox">
      <div className="interactionMode">
        <p>Choose your interaction mode:</p>
        <br />
        <a className="links" href="/datageniee">
          Chatgeniee
        </a>
        <br />
        <br />
        <a className="links" href="/docgeniee">
          Docgeniee
        </a>

        <br />
      </div>
      <div className="interactionMode">
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
          <>
            <UploadFile
              setSession={setSession}
              setFileResponse={setFileResponse}
            />
          </>
      </div>
    </div>
  );
};

export default SideBar;
