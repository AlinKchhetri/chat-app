import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Chat from '../Pages/Chat';
import SignIn from '../Pages/SignIn';
import ChatBody from '../Pages/ChatComponents/ChatBody/ChatBody';

function Routing() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="/chat" element={<Chat />} >
          <Route path=":otherID" element={<ChatBody />} />
        </Route>
        <Route path='*' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
