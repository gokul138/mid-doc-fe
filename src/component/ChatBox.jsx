import React from 'react'
import MultiSelectComponent from './helpers/MultiSelectDropDown'

const ChatBox = () => {
  return (
    <div className="rghtBox">
        <div className="searchbox">
        <MultiSelectComponent/>
        </div>
          <div className="chatbox">
            <p className="msg-txt">ggggg</p>
          </div>
          <div className="">
            <button type="submit" className="sendbtn">
              <img
                src="https://cdn.icon-icons.com/icons2/2783/PNG/512/send_message_chat_icon_177294.png"
                alt="send"
              ></img>
            </button>
          </div>
        </div>
  )
}

export default ChatBox