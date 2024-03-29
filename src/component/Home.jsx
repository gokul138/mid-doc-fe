import React, { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import ChatBox from "./ChatBox";
import Welcome from "./Welcome";
import Loader from "./Loader";

const Home = () => {
  const [sessionId, setSession] = useState("");
  const [fileResponse, setFileResponse] = useState([]);

  return (
    <>
      <Header />
      <div>
        <SideBar setSession={setSession} setFileResponse={setFileResponse} />
        <ChatBox sessionId={sessionId} fileResponse={fileResponse} setFileResponse={setFileResponse} />
        {/* <Welcome /> */}
        {/* <Loader /> */}
      </div>
    </>
  );
};

export default Home;
