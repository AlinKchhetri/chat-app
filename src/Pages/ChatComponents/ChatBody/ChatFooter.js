import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../../context/UserContext';
import {app} from '../../../firebase'
import '../Style.css'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import {getFirestore, addDoc, setDoc, doc, collection, serverTimestamp, onSnapshot, query, orderBy} from 'firebase/firestore'

const db = getFirestore(app);

const ChatFooter = () => {
    const {user} = useContext(UserContext);

    const [message,setMessage] = useState('');

    const messageEvent = (event) => {
        setMessage(event.target.value);
    }

    console.log(user.uid);
    

    const submitMessage = () => {
        
        const myDoc = collection(db, "messages")

        const docData = {
            messageText: message,
            userId: user.uid,
            image: user.photoURL,
            createdAt: serverTimestamp()
        }
        addDoc(myDoc, docData)
            .then(() => {
                setMessage('')
            })
            .catch((error) => {
                alert(error.message)
            })
    }

  return (
    <div className="chat-footer">
        <input
        className="message-input"
        value={message}
          type="text"
          placeholder="Add New Task"
          onChange={messageEvent}
        />
        <button onClick={submitMessage} >Add</button>
      </div>
  )
}

export default ChatFooter