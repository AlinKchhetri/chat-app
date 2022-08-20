import './App.css';
import {useState} from "react";
import Routing from "./Routing/Routing";
import UserContext from "./context/UserContext";
import { ChatSection } from './Pages';

function App() {
    const [rootState, setRootState] = useState('');

    console.log(rootState.photoURL);
    const [groupItem, setGroupItem] = useState({
        groupName: 'Team Learners',
        members: [
            {
                memberId: 1,
                memberName: 'Alin Khatri',
                memberAvatar: require('./assets/images/member1.png')
            },
            {
                memberId: 2,
                memberName: 'Alin Khatri',
                memberAvatar: require('./assets/images/member2.png')
            },
            {
                memberId: 3,
                memberName: 'Alin Khatri',
                memberAvatar: require('./assets/images/member3.png')
            },
            {
                memberId: 4,
                memberName: 'Alin Khatri',
                memberAvatar: require('./assets/images/member4.png')
            }
        ]
    })

    const [userMessage, setUserMessage] = useState([]);
    const [logOut, setLogOut] = useState(null);

    console.log(userMessage)

    

    return (
        <div className="App">
            <UserContext.Provider value={{user: rootState, setRootState, group: groupItem, setGroupItem, userChat: userMessage, setUserMessage, out: logOut, setLogOut}}>
                <Routing userData={rootState} setRootState={setRootState} groupData={groupItem} messsageData ={userMessage} setUserMessage={setUserMessage} setLogOut={setLogOut} logOutData={logOut}/>
            </UserContext.Provider>
        </div>
    );
}

export default App;
