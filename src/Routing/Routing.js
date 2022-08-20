import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Chat from '../Pages/Chat';
import SignIn from '../Pages/SignIn';

function Routing() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="chat" element={<Chat />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Routing;
