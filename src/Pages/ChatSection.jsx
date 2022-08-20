import { Chat, SignIn } from '../Pages'

const ChatSection = (props) => {

    return (
        <>
            <SignIn userData = {props.userData}/>
            <Chat userData = {props.userData} groupData = {props.groupData}/>
        </>     
    )
}

export default ChatSection