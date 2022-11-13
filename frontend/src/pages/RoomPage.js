import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography, TextField } from '@mui/material'; 
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import "../../static/css/room.css";
import MessageList from '../components/MessageList';
import ParticipantList from '../components/ParticipantList';
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import Fab from '@mui/material/Fab';
import UserContext from "../components/UserContext";



const Room = () => {
      const params = useParams();
      const navigate = useNavigate();
      const input = useRef("");
      const { user, setUser } = useContext(UserContext);
      const [message, setMessage] = useState('');
      const [messages, setMessages] = useState([]);
      const [participants, setParticipants] = useState([]);
      const chatSocket = new WebSocket('ws://' +
                                        window.location.host +
                                        '/ws/room/' +
                                        params.roomID + '/'
                                        );



      useEffect(() => {

        fetch('/chat/setup')
        .then(response => response.json())
        .then(data => {
          setParticipants(participants => [...participants, ...data[0].participants]);
          setMessages(messages => [...messages, ...data[0].messages]);
        });


        chatSocket.onmessage = (e) =>{
          const data = JSON.parse(e.data);
          const receivedMessage = data;
          setMessages(messages => [...messages, receivedMessage]);
        }

      }, [])


      function loadMessageFromInput(e){
        setMessage(e.target.value);

      }


      function sendMessage() {
        chatSocket.send(JSON.stringify({
                        'message': message,
                        'user': user,
                    }));
        input.current.innerHTML = "";
      }


      function leaveRoom() {
          navigate('/')
      }

      return(

        <div className="grid-container">
          <div className="nav-bar">
            <div className="setting">
                <Button variant="contained" endIcon={<LogoutIcon />} onClick={leaveRoom} >
                  Exit Room
                </Button>
            </div>
          </div>

          <div className="participants">
              <div className= "participants-header"> Participants</div>
              <ParticipantList participants={participants}/>
          </div>

          <div className="global-message-area"></div>

          <div className="outgoing-message-area">
                {messages.length > 0 ? (<MessageList messages={messages} type="outgoing" user={user}/>):
                                       (<h2 style={{textAlign:'center'}}>No messages yet</h2>) }

          </div>

          <div className="incoming-message-area">

                {messages.length > 0 ? (<MessageList messages={messages} type="incoming" user={user} />):
                                       (<h2 style={{textAlign:'center'}}>No messages yet</h2>) }
          </div>

          <div className="message-input">
              <Stack direction="row" spacing={2}>
                <TextField fullWidth ref={input} label="Enter Message" id="fullWidth"
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






