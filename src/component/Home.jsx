import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import ChatBox from "./ChatBox";

const Home = () => {
  return (
    <>
      <Header />
      <div>
        <SideBar />
        <ChatBox/>        
      </div>
    </>
  );
};

export default Home;
