import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography, TextField } from '@mui/material'; 
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import "../../static/css/room.css";
import MessageList from '../components/MessageList';
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import logout from '../utils/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Fab from '@mui/material/Fab';





const Room = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUserName] = useState('');
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
      const receivedMessage = data; 
      setMessages(messages => [...messages, receivedMessage]);
    }

    fetch('/api/user')
    .then(response => response.json())
    .then(data => {
      setUserName(data.username);
    });

    
  }, [])


  function loadMessageFromInput(e){
    setMessage(e.target.value);

  }  


  function sendMessage() {
    chatSocket.send(JSON.stringify({
                    'message': message,
                    'username': username,
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
            <Button variant="contained" endIcon={<LogoutIcon />} onClick={logout} >
              Logout
            </Button>           
        </div>
      </div> 

      <div className="participants">
          <div className= "participants-header"> Participants</div>
            <div className="person">
                Person
            </div>
            <div className="person">
                Person
            </div>                                
                   
      </div>

      <div className="global-message-area">
      </div>    

      <div className="outgoing-message-area">
            {messages.length > 0 ? (<MessageList messages={messages} type="outgoing" username={username}/>):
                                   (<h2 style={{textAlign:'center'}}>No messages yet</h2>) }
                  
      </div> 

      <div className="incoming-message-area">

            {messages.length > 0 ? (<MessageList messages={messages} type="incoming" username={username} />):
                                   (<h2 style={{textAlign:'center'}}>No messages yet</h2>) }
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






