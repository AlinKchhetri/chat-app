import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../context/UserContext'
import { useNavigate } from "react-router-dom";
import './Style.css'
import { app } from '../../firebase'
import search from '../../assets/images/search.png'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { FiLogOut } from 'react-icons/fi'

import { getFirestore, setDoc, doc } from 'firebase/firestore'

const db = getFirestore(app);

const LeftSection = () => {
  const { user, group } = useContext(UserContext)
  const [, setDemo] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const myDoc = doc(db, "users", `${user.uid}`);
    setDoc(myDoc, {
      userId: user.uid,
      name: user.displayName,
      userName: user.displayName.toLowerCase().replace(" ", "_"),
      email: user.email,
      image: user.photoURL,
    })
      .then(() => {
        setDemo([])
      })
      .catch((error) => {
        alert(error.message)
      })
  }, [user])


  

  // console.log(demo)

  function LeftHeader() {
    return (
      <div className="left-header">
        <img src={user.photoURL} alt="" style={{ width: '15%', height: '15%', borderRadius: '100px' }} />
        <div className="user-details">
          <span style={{ fontSize: '15px', fontWeight: 'bold' }}>{user.displayName}</span>
          <span style={{ fontSize: '10px' }}>{user.displayName.toLocaleLowerCase().replace(" ", "_")}</span>
        </div>
        <FiLogOut color='black' size={20} style={{ alignSelf: 'center', justifyContent: 'flex-end' }} onClick={() => { navigate("/", { replace: true }) }} />
      </div>
    )
  }

  function SearchBar() {
    return (
      <form className="search-bar">
        <img src={search} className="send-button" alt="" width="16" height="16" />
        <input
          className="search-input"
          // value={message}
          type="text"
          placeholder="Search people"
        // onChange={messageEvent}
        />
      </form>
    )
  }

  function PeopleList() {
    return (
      <div className="list">
        <strong style={{ fontSize: '14px', fontWeight: 'bold', alignSelf: 'flex-start', margin: '10px' }}>People</strong>
        <ListGroup variant="flush" className="people-list">
          {group.map((item) => {
            return (
              <ListGroup.Item
                className="d-flex justify-content-between align-items-start" style={{ padding: '0.8rem', margin: '0.2rem', borderRadius: '0.5rem' }}
              >
                <img src={item.image} alt="" style={{ width: '10%', height: '10%', borderRadius: '100px' }} />
                <div className="ms-2 me-auto text-break" style={{ fontSize: '11px' }}>
                  <div className="fw-bold text-start" style={{ fontSize: '13px' }}>{item.name}</div>
                  {item.email}
                </div>
                <Badge bg="primary" pill>
                  1
                </Badge>
              </ListGroup.Item>
            )
          }
          )
          }
        </ListGroup>
      </div>
    )
  }


  return (
    <div className="left-section">
      <LeftHeader />
      <SearchBar />
      <PeopleList />
      {/* <PeopleChat /> */}
    </div>
  )
}

export default LeftSection