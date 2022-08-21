import React, { } from 'react'
import '../Style.css';
import ChatHeader from './ChatHeader'
import ChatFooter from './ChatFooter';
import ChatBody from './ChatBody';

const MainChat = () => {
  return (
    <div className="main-section">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  )
}

export default MainChat