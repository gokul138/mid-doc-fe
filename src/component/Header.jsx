import React from 'react'
import profile from '../img/profile.jpg'
const Header = () => {
  return (
    <div className='header'>
        {/* <div> */}
            <span className=''>DocGeniee</span>
            <div>
                <div className='profileImage'>
                    <img className='pic' src={profile} alt='' />
                </div>
                <div className='profilename'>vaisakh</div>
            </div>
        {/* </div> */}
    </div>
  )
}

export default Header