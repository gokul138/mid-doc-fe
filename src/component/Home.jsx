import React, { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import ChatBox from "./ChatBox";
import Welcome from "./Welcome";

const Home = () => {
  const [sessionId, setSession] = useState("");
  const [fileResponse, setFileResponse] = useState([]);

  return (
    <>
      <Header />
      <div>
        <SideBar setSession={setSession} setFileResponse={setFileResponse} />
        <ChatBox sessionId={sessionId} fileResponse={fileResponse} />
        {/* <Welcome /> */}
      </div>
    </>
  );
};

export default Home;
