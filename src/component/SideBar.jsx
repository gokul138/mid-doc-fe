import React, { useState } from "react";
import UploadFile from "./helpers/FileDropper";
import { CaretDoubleRight, CaretDoubleLeft } from "@phosphor-icons/react";

const SideBar = ({ setSession, setFileResponse }) => {
  const [selectedMode, setSelectedMode] = useState("dataGeniee");
  const [isOverlayExpanded, setIsOverlayExpanded] = useState(false);
  const [isIconRight, setIsIconRight] = useState(true);

  const handleRadio = (event) => {
    setSelectedMode(event.target.value);
  };

  const toggleOverlay = () => {
    setIsOverlayExpanded(!isOverlayExpanded);
    setIsIconRight(!isIconRight);
  };

  return (
    <div className="lftBox">
      <div className={`overlay ${isOverlayExpanded ? "expanded" : ""}`}>
        <div className="arrow-icon" onClick={toggleOverlay}>
          {isIconRight ? (
            <CaretDoubleRight size={25} color="#673ab7" />
          ) : (
            <CaretDoubleLeft size={26} color="#673ab7" />
          )}
        </div>
        <p>Choose your interaction mode:</p>
        <br />
        <a className="links" href="/main">
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
      </div>
      <div className="uploadFile">
        <br />
        {selectedMode === "dataGeniee" || selectedMode === "docGeniee" ? (
          <>
            <UploadFile
              fileTypes={selectedMode}
              setSession={setSession}
              setFileResponse={setFileResponse}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SideBar;
