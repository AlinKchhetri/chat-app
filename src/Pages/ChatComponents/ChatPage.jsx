import { LeftSection, RightSection, MainChat } from './'

const ChatPage = (props) => {

    return (
        <div className="chat-page">
            <LeftSection data={props.data}/>
            <MainChat data={props.data}/>
            <RightSection data={props.data}/>   
        </div>
    )
}

export default ChatPage