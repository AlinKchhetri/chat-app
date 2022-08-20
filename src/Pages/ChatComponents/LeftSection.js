import React, {useContext} from 'react'
import UserContext from '../../context/UserContext'
import MessageData from '../../data/MessageData'
import './Style.css'

const LeftSection = () => {
  const {user} = useContext(UserContext)
  return (
    <div className="left-section">
      <img src={user.image} alt ="" width="50"/>
      {/* <MessageData /> */}
    </div>
  )
}

export default LeftSection