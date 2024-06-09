import React, { useEffect, useState } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import ChatBox from './ChatBox';
import { useUserContext } from './helpers/UserContext';
import "../docgenieehome.css";
import GuidelinesModal from './helpers/GuidlinesModal';
import NewTabLoader from "./helpers/NewTabLoader";
import InfoModal from "./helpers/InfoModal";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import Welcome from './Welcome';

const DocgenieeHome = () => {
  const { userData, setUserData } = useUserContext();
  const [sessionId, setSession] = useState("");
  const [fileResponse, setFileResponse] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [openGuidelines, setOpenGuidelines] = useState(true);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 1500);
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
          "Subscription has ended, Redirecting to Subscription page"
        );
        handleOpenConfirmModal();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const closeModal = () => {
    setOpenGuidelines(false);
  };

  return (
    <div className='docg-container'>
      {showLoader ? (
        <NewTabLoader />
      ) : (
        <>
          <Header interactionType={"| Docgeniee"} />
          <div className="sidebarAndChatContainer">
            <SideBar setSession={setSession} setFileResponse={setFileResponse} />
            {!sessionId && <Welcome />}
            <ChatBox
              sessionId={sessionId}
              fileResponse={fileResponse}
              setFileResponse={setFileResponse}
            />
          </div>
          {isConfirmModalOpen && (
            <InfoModal
              isOpen={isConfirmModalOpen}
              onClose={handleCloseConfirmModal}
              message={infoMessage}
            />
          )}
          <GuidelinesModal isOpen={openGuidelines} onClose={closeModal} />
        </>
      )}
    </div>
  );
};

export default DocgenieeHome;
