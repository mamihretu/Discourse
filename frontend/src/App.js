import React, { useState, useEffect } from "react";
import JoinPage from './components/JoinPage';
import Room from './components/Room';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { 
  BrowserRouter as Router, 
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate 
} from 'react-router-dom';




const App = () => {

	return(  
		<Router>
		    <Routes>
		        <Route path = '/'>
		            <Route index element = {<JoinPage/>}/>
		            <Route path = 'room/:roomID' element = {<Room/>}/>
		            <Route path = 'login' element = {<Login/>}/>
		            <Route path = 'signup' element = {<SignUp/>}/>
		        </Route>
		    </Routes>    
		</Router>
	);

}

export default App;
