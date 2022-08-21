import './App.css';
import { useState } from "react";
import Routing from "./Routing/Routing";
import UserContext from "./context/UserContext";

function App() {
    const [rootState, setRootState] = useState('');
    const [groupItem, setGroupItem] = useState([])
    const [userMessage, setUserMessage] = useState([]);
    const [logOut, setLogOut] = useState(null);

    return (
        <div className="App">
            <UserContext.Provider value={{ user: rootState, setRootState, group: groupItem, setGroupItem, userChat: userMessage, setUserMessage, out: logOut, setLogOut }}>
                <Routing userData={rootState} setRootState={setRootState} groupData={groupItem} setGroupItem={setGroupItem} messsageData={userMessage} setUserMessage={setUserMessage} setLogOut={setLogOut} logOutData={logOut} />
            </UserContext.Provider>
        </div>
    );
}

export default App;
