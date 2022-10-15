import React, { useState, useEffect } from "react";
import JoinPage from './components/JoinPage';
import Room from './components/Room';
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
		        </Route>
		    </Routes>    
		</Router>
	);

}

export default App;
