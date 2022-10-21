import React, { useState} from 'react';
import "../../static/css/message.css";



const MessageList = (props) => {
	const messageArray = props.messages;
	const reducedArray = messageArray.length > 10 ? messageArray.slice(-10) : messageArray; 
	const receivedMessages = reducedArray.filter(receivedFilter);
	const sentMessages = reducedArray.filter(sentFilter);


	function receivedFilter(message) {
		return message.username != props.username; 
	}

	function sentFilter(message) {
		return message.username == props.username; 
	}

	if(messageArray.length <= 0){
		return <h1>Still no messages</h1>;

	}else{

		return (
				<>
			      {props.type === "incoming" ? (receivedMessages.map((message, id) => (
			        <div key={id} className="incoming"> {message.message} </div> 
			      )))
			      :
				  ( sentMessages.map((message, id) => (
				      <div key={id} className="outgoing"> {message.message} </div> 
				   )))}	
				</>			
			);
	}
}


export default MessageList;






