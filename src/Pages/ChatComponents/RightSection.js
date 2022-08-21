import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'
import MessageData from '../../data/MessageData'

const RightSection = () => {
  const { logOut } = useContext(UserContext)
  return (
    <div className="right-section">
      <div>
        <button onClick={logOut}>logout</button>
        <MessageData />
      </div>
    </div>
  )
}

export default RightSection