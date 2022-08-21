import React, { useState, useContext, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import UserContext from '../context/UserContext'
import grp from '../assets/images/grp.gif'
import '../App.css'
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
        <Stack gap={3}>
          <strong style={{fontSize: '1rem', color: 'white'}}>Connect with the team 
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
        <button >
          <NavLink to="/chat">Get Started</NavLink>
        </button>
          </LoginPage>
        )
          :
          (<div>
            {/* <GoogleLogin/> */}
            <LoginPage>
            <button onClick={login}>
              login
            </button>
            </LoginPage>
          </div>)
      }

    </div>
  )
}

export default SignIn

