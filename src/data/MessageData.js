import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../context/UserContext';
import {app} from '../firebase'
import {getFirestore, addDoc, setDoc, doc, collection, serverTimestamp, onSnapshot, query, orderBy} from 'firebase/firestore'

const db = getFirestore(app);

const MessageData = () => {
    const {setRootState, setLogOut, setUserMessage} = useContext(UserContext);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        onSnapshot(query(collection(db, "messages"), orderBy("createdAt")), (snapshot) => {
          setUserMessage(
          snapshot.docs.map(item => {
              const id = item.id;
              return {id, ...item.data()};
          })
          )
        })
      }, [setUserMessage])
    const submitMessage = () => {
        
        const myDoc = collection(db, "messages")

        const docData = {
            messageText: "hello",
            userId: 1,
            url: "helloURL",
            createdAt: serverTimestamp()
        }
        addDoc(myDoc, docData)
            .then(() => {
                alert("Document Created")
            })
            .catch((error) => {
                alert(error.message)
            })
    }


    return(
        <>
        <button onClick={submitMessage}>add</button>
        {
            messages.map((item) => {
                return(
                <div key={item.id}>
                    <li>{item.messageText}</li>
                </div>
                )
            })
        }
        </>
    )
}

export default MessageData;

