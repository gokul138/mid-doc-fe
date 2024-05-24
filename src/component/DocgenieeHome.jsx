import React, { useState } from 'react'
import Header from './Header'
import SideBar from "./SideBar";
import { useUserContext } from "./helpers/UserContext";
import "../docgenieehome.css"

const DocgenieeHome = () => {
    const { userData, setUserData } = useUserContext();
    const [sessionId, setSession] = useState("");
    const [fileResponse, setFileResponse] = useState([]);


  return (
    <div className='docg-container'>
      <Header interactionType={"| Docgeniee"}/>
      <div className="sidebarAndChatContainer">
      <SideBar setSession={setSession} setFileResponse={setFileResponse} />
      </div>

      
    </div>
  )
}

export default DocgenieeHome
