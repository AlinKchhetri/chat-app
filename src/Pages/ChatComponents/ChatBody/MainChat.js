import React, { useContext, useState, useRef, useEffect } from 'react'
import UserContext from '../../../context/UserContext'
import '../Style.css';
import read from '../../../assets/images/read.png'
// import {ChatHeader} from './'
import Stack from 'react-bootstrap/Stack';
import RightSection from '../RightSection';
import { HiMenuAlt2 } from "react-icons/hi";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ChatFooter from './ChatFooter';
import ChatBody from './ChatBody';

const today = new Date();
const time = today.getHours() + ':' + today.getMinutes();

function OffCanvasExample() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
        < HiMenuAlt2 onClick={toggleShow} cursor= "pointer"/>

      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <RightSection />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}



const MainChat = () => {
  const { group, user } = useContext(UserContext)
  const [item, setItem] = useState("");
  const [tasks, setTasks] = useState([]);

  const scrollBottom = useRef(null)

  useEffect(() => {
    scrollBottom.current?.scrollIntoView();

  }, [tasks])

  console.log(user.name);
  

  const itemEvent = (event) => {
    setItem(event.target.value);
  }

  const itemTask = (e) => {
    e.preventDefault();
    setTasks((oldTasks) => {
      return [...oldTasks, item]
    });
    setItem("");
  }


  function ChatHeader() {
    return (
      <div className="chat-header">
        <div className="chat-member-avatar">
          {group.members.map((member, index) => {
            return (
              <img key = {index} src={member.memberAvatar} alt="" width='20' />)
          }
          )
          }
        </div>
        <Stack gap={0}>
          <span style={{ fontWeight: 'bolder', fontSize: '0.9rem' }}>{group.groupName}</span>
          <span style={{ fontWeight: 'light', fontSize: '0.6rem' }}>last seen few minutes ago</span>
        </Stack>
        <div><OffCanvasExample /></div>
      </div>
    );
  }

  // function ChatBody() {
  //   return (
  //     <div className="chat-body">
  //         {
  //           tasks.map((b, index) => {
  //             return (
  //               <div className={user.name === "Alin Khatri"? "user-message-body" : "other-message-body"}>
  //               <img src={user.image} alt= "" width = '25'/>
  //               <div key={index} className={user.name === "Alin Khatri"? "user-message-box" : "other-message-box"} >
  //                 <span style={{ justifyContent: 'flex-start', alignSelf: 'flex-start'}}>{b}</span>
  //                 <div style={{fontSize: 10, justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
  //                 <span >{time}</span>
  //                 <img src={read} alt= "" width = '15' style={{margin: '4px'}}/>
  //                 </div>
  //               </div>
  //               </div>
  //             )
  //           })
  //         }
  //         <div ref={scrollBottom}/>
  //     </div>
  //   );
  // }


  return (
    <div className="main-section">
      <ChatHeader />
      <ChatBody />
      {/* <div className="chat-footer">
        <input
        className="message-input"
          value={item}
          type="text"
          placeholder="Add New Task"
          onChange={itemEvent}
        />
        <button onClick={itemTask} >Add</button>
      </div> */}
      <ChatFooter />
    </div>
  )
}

export default MainChat