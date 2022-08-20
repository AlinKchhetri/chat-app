import React, { useContext } from 'react'
import UserContext from '../../../context/UserContext'
import Stack from 'react-bootstrap/Stack';
import { HiMenuAlt2 } from "react-icons/hi";

const ChatHeader = () => {
    const { group } = useContext(UserContext)
    return (
      <div className="chat-header">
        <div className="chat-member-avatar">
          {group.members.map((item) => {
            return (
              <img src={item.memberAvatar} alt="" width='30' />)
          }
          )
          }
        </div>
        <Stack gap={0}>
          <span style={{ fontWeight: 'bolder', fontSize: '0.9rem' }}>{group.groupName}</span>
          <span style={{ fontWeight: 'light', fontSize: '0.6rem' }}>last seen few minutes ago</span>
        </Stack>
        <div><HiMenuAlt2 /></div>
      </div>
    );
  }

export default ChatHeader