import React, { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import ChatBox from "./ChatBox";
import Welcome from "./Welcome";
import Loader from "./helpers/Loader";

const Home = () => {
  const [sessionId, setSession] = useState("");
  const [fileResponse, setFileResponse] = useState([]);
  console.log('sessionId', sessionId);

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
