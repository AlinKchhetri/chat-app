import React, { useState, useContext } from 'react'
import UserContext from '../../../context/UserContext';
import { app } from '../../../firebase'
import send from '../../../assets/images/send.png'
import '../Style.css'
import { getFirestore, addDoc, collection, serverTimestamp } from 'firebase/firestore'

const db = getFirestore(app);

const ChatFooter = () => {
    const { user } = useContext(UserContext);

    const [message, setMessage] = useState('');

    const messageEvent = (event) => {
        setMessage(event.target.value);
    }





    const submitMessage = (event) => {
        event.preventDefault();
        const myDoc = collection(db, "messages")

        const docData = {
            messageText: message,
            userId: user.uid,
            userName: user.displayName.toLowerCase().replace(" ", "_"),
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
        <div>
            <form onSubmit={submitMessage} className="chat-footer">
                <input
                    className="message-input"
                    value={message}
                    type="text"
                    placeholder="Start typing..."
                    onChange={messageEvent}
                />
                <img src={send} className="send-button" alt="" onClick={submitMessage} width="18" height="18" />
            </form>
        </div>
    )
}

export default ChatFooter