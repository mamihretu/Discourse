import React, { useState} from 'react';
import "../../static/css/message.css";



const MessageList = (messages) => {
	const messageArray = messages.messages;
	console.log("messages received:", messageArray);
	

	return (
			<>
		      {messageArray.length > 0 ?( messageArray.map((message, id) => (
		        <div key={id} className="incoming"> {message} </div> 
		      ))):
		  		<h1>Still no messages</h1>}	
			</>			
		);
}


export default MessageList;






