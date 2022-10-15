import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography, TextField } from '@mui/material';
import "../../static/css/room.css";
import SplitButton from './AppBar'; 
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
// import Message from './Message';
import MessageList from './MessageList';

const Room = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatSocket = new WebSocket(
    'ws://' + 
    window.location.host + 
    '/ws/room/' + 
    params.roomID +
    '/'
    );  


  
  useEffect(() => {
    chatSocket.onmessage = (e) =>{
      const data = JSON.parse(e.data);
      const receivedMessage = data.message; 
      setMessages(messages => [...messages, receivedMessage]);
    }

    
  }, [])


  function loadMessageFromInput(e){
    setMessage(e.target.value);
    console.log("Just got changed to:", message);

  }  


  function sendMessage() {
    chatSocket.send(JSON.stringify({
                    'message': message,
                    'username': params.roomID,
                }));
  }


  function leaveRoom() {
    const requestOptions = {
      method : 'post',
      headers : {'contentType': 'application/json'},

    };

    fetch('/api/leave-room', requestOptions)
    .then(response => navigate('/'));
  } 

  return(

    <div className="grid-container">
      <div className="nav-bar">
        <div className="setting"> 
            <SplitButton/>
        </div>
      </div> 

      <div className="participants">
          <h2 className= "participants-header"> Participants</h2>
          <Stack direction="row" >
            <Avatar alt="Remy Sharp" src="/static/images/rhino-art.PNG" />
            <div className="person"> User Name</div>
          </Stack>
          <Stack direction="row" >
            <Avatar alt="Remy Sharp" src="/static/images/rhino-art.PNG" />
            <div className="person"> User Name</div>
          </Stack>
          <Stack direction="row" >
            <Avatar alt="Remy Sharp" src="/static/images/rhino-art.PNG" />
            <div className="person"> User Name</div>
          </Stack>
          <Stack direction="row" >
            <Avatar alt="Remy Sharp" src="/static/images/rhino-art.PNG" />
            <div className="person"> User Name</div>
          </Stack>                    
      </div>

      <div className="global-message-area"></div>      
          <div className="outgoing-message-area">
                {messages.length > 0 ? (<MessageList messages={messages}/>):
                                       (<h2>No messages yet</h2>) }
                      
          </div> 
          <div className="incoming-message-area">

                {messages.length > 0 ? (<MessageList messages={messages}/>):
                                       (<h2>No messages yet</h2>) }
          </div>

          <div className="message-input">
              <Stack direction="row" spacing={2}>
                <TextField fullWidth label="Enter Message" id="fullWidth" 
                onChange={loadMessageFromInput} className="message-input-field"/>
                <Button variant="contained" endIcon={<SendIcon />} onClick={sendMessage}>
                  Send
                </Button>
              </Stack>  
          </div>               
    </div>

    );

}

export default Room;





