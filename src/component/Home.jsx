import React from 'react'
import Header from './Header'
import SideBar from './SideBar';
import profile from '../img/profile.jpg'

const Home = () => {
  return (
    <>
      <Header />
      <div>
        <SideBar/>
        <div className="rghtBox">
          <div className='chatbox'>
          <p className='msg-txt'>ggggg</p>
        </div>
        <div className=''>
          <button type='submit' className='sendbtn'>
            <img src='https://cdn.icon-icons.com/icons2/2783/PNG/512/send_message_chat_icon_177294.png' alt='send'></img>
          </button>
        </div>
        </div>
      </div>
    </>
  );
}

export default Home