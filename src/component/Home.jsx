import React, { useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import ChatBox from "./ChatBox";
import Welcome from "./Welcome";
import Loader from "./helpers/Loader";
import axios from "axios";
import { useUserContext } from "./helpers/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userData, setUserData } = useUserContext();
  const [sessionId, setSession] = useState("");
  const [fileResponse, setFileResponse] = useState([]);
  console.log('sessionId', sessionId);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

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
    <>
      <Header />
      <div>
        <SideBar setSession={setSession} setFileResponse={setFileResponse} />
        {!sessionId&& (<Welcome />)}
        <ChatBox sessionId={sessionId} fileResponse={fileResponse} setFileResponse={setFileResponse} />
      </div>
    </>
  );
};

export default Home;
