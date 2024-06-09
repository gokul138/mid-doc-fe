import React, { useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import ChatBox from "./ChatBox";
import Welcome from "./Welcome";
import Loader from "./helpers/Loader";
import { useUserContext } from "./helpers/UserContext";
import { useNavigate } from "react-router-dom";
import NewTabLoader from "./helpers/NewTabLoader";
import axiosInstance from "./axiosInstance";
import InfoModal from "./helpers/InfoModal";
import GuidelinesModal from "./helpers/GuidlinesModal";

const DataGeniee = () => {

  const { userData, setUserData } = useUserContext();
  const [sessionId, setSession] = useState("");
  const [fileResponse, setFileResponse] = useState([]);
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(true);
  const [openGuidelines, setOpenGuidelines] = useState(true);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 1500);
      // Clean up the timeout on component unmount or when the flag is set to false
      return () => clearTimeout(timeout);
    }, [showLoader]);
    const handleOpenConfirmModal = () => {
      setConfirmModalOpen(true);
    };
  
    const handleCloseConfirmModal = () => {
      setConfirmModalOpen(false);
    };
  
    const fetchUserData = async () => {
      try {
          const getUser = await axiosInstance.get("doc-genie/user-info");
          setUserData(getUser?.data);
          if (getUser?.data?.primeUser === false) {
            setInfoMessage(
              "Subcription has ended, Redirecting to Subcription page"
            );
            handleOpenConfirmModal();
            // navigate("/pricing");
          }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Check if the error response contains "Invalid session" with status code 401
        if (
          error.response &&
          error.response.status === 401
        ) {
          // Navigate the user to "/"
          navigate("/");
        }
      }
    };

  useEffect(() => {
    fetchUserData();
    if (!userData?.verifiedUser) {
      navigate("/confirm-mail");
    }
  }, []);

  const closeModal = () =>{
    setOpenGuidelines(false);
  }
  

  return (
    <div >
    {showLoader ? <NewTabLoader /> : 
     (<>
     <Header interactionType={"| Datageniee"} />
      <div>
          <SideBar setSession={setSession} setFileResponse={setFileResponse} />
          {!sessionId && (<Welcome />)}
          <ChatBox sessionId={sessionId} fileResponse={fileResponse} setFileResponse={setFileResponse} />
      </div>
      {isConfirmModalOpen && (
          <InfoModal
            isOpen={isConfirmModalOpen}
            onClose={handleCloseConfirmModal}
            message={infoMessage}
          />
        )}
      <GuidelinesModal isOpen={openGuidelines} onClose={closeModal}/>
        </>
      )}
    </div>
  );
};

export default DataGeniee;
