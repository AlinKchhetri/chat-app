import React, { useContext, useState } from 'react'
import UserContext from '../../../context/UserContext'
import Stack from 'react-bootstrap/Stack';
import option from '../../../assets/images/option.png'

import Offcanvas from 'react-bootstrap/Offcanvas';
import LeftSection from '../LeftSection';


function OffCanvasExample() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <img src={option} onClick={toggleShow} cursor="pointer" alt="" width="18" style={{ cursor: "pointer", margin: '5px' }} />

      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton style={{ backgroundColor: '#F4F5F7' }}>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <LeftSection />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

const ChatHeader = () => {
  const { group } = useContext(UserContext)

  console.log(group)


  return (
    <div className="chat-header">
      <div className="chat-member-avatar">
        {group.map((item) => {
          return (
            <>
              <img key={item.id} src={item.image} alt="" width='30' style={{ borderRadius: '20px', padding: '2px' }} />
            </>
          )
        }
        )
        }
      </div>
      <Stack gap={0}>
        <span style={{ fontWeight: 'bolder', fontSize: '0.9rem' }}>Team Learners</span>
        <span style={{ fontWeight: 'light', fontSize: '0.6rem' }}>last seen few minutes ago</span>
      </Stack>
      <div><OffCanvasExample /></div>
    </div>
  );
}

export default ChatHeader