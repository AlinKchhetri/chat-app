import React, { useState, useEffect } from 'react';
import { LeftSection, MainChat } from './';

const ChatPage = (props) => {
	const [ matches, setMatches ] = useState(window.matchMedia('(min-width: 768px)').matches);

	useEffect(() => {
		window.matchMedia('(min-width: 600px)').addEventListener('change', (e) => setMatches(e.matches));
	}, []);

	return (
		<div className="chat-page">
			{matches && <LeftSection data={props.data} />}
			<MainChat data={props.data} />
			{/* <RightSection data={props.data}/>  */}
		</div>
	);
};

export default ChatPage;
