import React, {useState, useContext, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import UserContext from '../context/UserContext'

import {getAuth,GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);


const SignIn = () => {
  
  const {user, setLogOut, setRootState} = useContext(UserContext)

  const [userLog, setUserLog] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      setRootState(data);
    });
  })
  

  const login = async() => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth,googleProvider)
    setUserLog(true)
  }

  const logout = () => {
    signOut(auth)
    setUserLog(false);
    setLogOut(logout);
  };
  
  return (
    <div>
      { 
        userLog ? (<button >
        <NavLink to="chat">Get Started</NavLink>
        </button>)
        : 
        (<div>
          <button onClick={login}>
            login
          </button>
        </div>)
      }
        
    </div>
  )
}

export default SignIn