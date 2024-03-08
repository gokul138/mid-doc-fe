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
        </div>
      </div>
    </>
  );
}

export default Home