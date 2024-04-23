import React, { useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import ChatBox from "./ChatBox";
import Welcome from "./Welcome";
import Loader from "./helpers/Loader";
import axios from "axios";
import { useUserContext } from "./helpers/UserContext";
import { useNavigate } from "react-router-dom";
import NewTabLoader from "./helpers/NewTabLoader";

const Home = () => {

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 1500);
      // Clean up the timeout on component unmount or when the flag is set to false
      return () => clearTimeout(timeout);
    }, [showLoader]);

  const { userData, setUserData } = useUserContext();
  const [sessionId, setSession] = useState("");
  const [fileResponse, setFileResponse] = useState([]);
  console.log('sessionId', sessionId);

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
        const getUser = await axios.get("https://docgeniee.org/mid-doc/doc-genie/user-info");
        console.log('/user-info', getUser);
        setUserData(getUser?.data);
        if (getUser?.data?.primeUser === false) {
          navigate("/pricing");
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
  

  return (
    <div>
    {showLoader ? <NewTabLoader /> : 
     (<>
     <Header />
      <div>
          <SideBar setSession={setSession} setFileResponse={setFileResponse} />
          {!sessionId && (<Welcome />)}
          <ChatBox sessionId={sessionId} fileResponse={fileResponse} setFileResponse={setFileResponse} />
      </div>
        </>
      )}
    </div>
  );
};

export default Home;
