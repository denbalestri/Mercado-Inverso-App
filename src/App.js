import React from 'react';

import './App.css';
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import TenderScreen from './screens/TenderScreen'
import PostScreen from './screens/PostScreen'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

    
function App() {
  return (
   
     //ALL SCREENS 
     <div>
      <Router>
      
    <Route path="/" exact component={LoginScreen}/>
    <Route path="/RegisterScreen" component={RegisterScreen}/>
    <Route path="/HomeScreen" component={HomeScreen}/>
    <Route path="/TenderScreen" component={TenderScreen}/>
    <Route path="/PostScreen" component={PostScreen}/>
    </Router>
    </div>
         
     
   
  );
}

export default App;
