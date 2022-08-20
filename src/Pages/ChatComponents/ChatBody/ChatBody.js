import React, { useState, useContext, useRef, useEffect } from 'react'
import UserContext from '../../../context/UserContext'
import {app} from '../../../firebase'
import '../Style.css'
import avatar from '../../../assets/images/avatar.png'
import read from '../../../assets/images/read.png';
import {getFirestore, addDoc, setDoc, doc, collection, serverTimestamp, onSnapshot, query, orderBy} from 'firebase/firestore'

const db = getFirestore(app);

const ChatBody = () => {
    const { user , setUserMessage } = useContext(UserContext)

    const [messages, setMessages] =useState([])
    const scrollBottom = useRef(null)


    useEffect(() => {
        scrollBottom.current?.scrollIntoView();

        onSnapshot(query(collection(db, "messages"), orderBy("createdAt", "asc")), (snapshot) => {
          setMessages(
          snapshot.docs.map(item => {
              const id = item.id;
              return {id, ...item.data()};
          })
          )
        })
      }, [])

      console.log(messages.userId)

    return (
              <div className="chat-body">
                  {
                    messages.map((b) => {
                      return (
                        <div key={b.id} className={user.uid === b.userId ? "user-message-body": "other-message-body"} >
                        <img src={avatar} alt= "" width = '25'/>
                        <div className={user.uid === b.userId ? "user-message-box": "other-message-box"}>
                          <span style={{ justifyContent: 'flex-start', alignSelf: 'flex-start'}}>{b.messageText}</span>
                          <div style={{fontSize: 10, justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
                          <img src={read} alt= "" width = '15' style={{margin: '4px'}}/>
                          </div>
                        </div>
                        </div>
                      )
                    })
                  }
                  <div ref={scrollBottom}/>
              </div>
    )
}

export default ChatBody