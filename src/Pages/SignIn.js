import React, { useState, useContext, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import UserContext from '../context/UserContext'
import grp from '../assets/images/grp.gif'
import '../App.css'
import {FcGoogle} from 'react-icons/fc'
import Stack from 'react-bootstrap/Stack';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from '../firebase';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'

const auth = getAuth(app);
const db = getFirestore(app);


const SignIn = () => {

  const { setLogOut, setRootState, setGroupItem } = useContext(UserContext)

  const [userLog, setUserLog] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        setRootState(data);
      }
    });


  })


  const login = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider)
      .then(onSnapshot(collection(db, "users"), (snapshot) => {
        setGroupItem(
          snapshot.docs.map(item => {
            const id = item.id;
            return { id, ...item.data() };
          })
        )
      }))
    setUserLog(true)

  }

  const logout = () => {
    signOut(auth)
    setUserLog(false);
    setLogOut(logout);
  };

  function LoginPage({children}) {
    return (
      <div className="login-page">
        <div className="hero-container">
        <Stack gap={3} className="stack">
          <strong className="hero-title">Connect with the team 
            Anywhere, Everywhere
          </strong>
        <img src={grp} alt="" width="50%" className="gif"/>
    </Stack>
    </div>
        <div className="login-container">
        
        {children}
        </div>
      </div>
    );
  }

  return (
    <div>
      {
        userLog ? (
          <LoginPage>
        <button className="btn btn-primary" style={{padding: '10px'}}>
          <NavLink to="/chat" style={{color:'white', textDecoration: 'none'}}>Get Started</NavLink>
        </button>
          </LoginPage>
        )
          :
          (<div>
            {/* <GoogleLogin/> */}
            <LoginPage>
            <button onClick={login} className="btn btn-light" style={{padding: '10px'}}>
            <FcGoogle size={40} style={{margin: '8px'}}/>
              Sign in with Google
            </button>
            </LoginPage>
          </div>)
      }

    </div>
  )
}

export default SignIn

