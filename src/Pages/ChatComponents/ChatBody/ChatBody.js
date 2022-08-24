import React, { useState, useContext, useRef, useEffect } from 'react'
import UserContext from '../../../context/UserContext'
import { app } from '../../../firebase'
import '../Style.css'
import read from '../../../assets/images/read.png';
import { getFirestore, collection, onSnapshot, query, orderBy } from 'firebase/firestore'

const db = getFirestore(app);





const ChatBody = () => {
  const { user } = useContext(UserContext)

  const [messages, setMessages] = useState([]);
  const scrollBottom = useRef(null)


  useEffect(() => {
    onSnapshot(query(collection(db, "messages"), orderBy("createdAt", "asc")), (snapshot) => {
      setMessages(
        snapshot.docs.map(item => {
          const id = item.id;
          return { id, ...item.data() };
        })
      )
    })

    scrollBottom.current?.scrollIntoView({ behavior: 'smooth' });
  }, [])


  return (
    <div className="chat-body">
      {
        messages.map((b) => {
          return (
            <div key={b.id} className={user.uid === b.userId ? "user-message" : "other-message"} >
              {user.uid !== b.userId && <img src={b.image} alt="" width="25" style={{ borderRadius: "20px" }} />}
              {/* <span style={{ fontSize: "10px" }}>{b.userName}</span> */}
              <div className={user.uid === b.userId ? "user-message-box" : "other-message-box"}>
                {user.uid !== b.userId && <span style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', fontWeight: 'bold', fontSize: '10px' }}>{b.userName}</span>}
                <span style={{ justifyContent: 'flex-start', alignSelf: 'flex-start' }}>{b.messageText}</span>
                <div style={{ fontSize: 10, justifyContent: 'flex-end', alignSelf: 'flex-end' }}>
                  {user.uid === b.userId && <img src={read} alt="" width='15' style={{ margin: '4px' }} />}
                </div>
              </div>
            </div>
          )
        })
      }
      <div ref={scrollBottom} />
    </div>
  )
}

export default ChatBody
