import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
function App() {
  return (
   
     
     <div>
      <Router>
    <Route path="/" exact component={LoginScreen}/>
    <Route path="/RegisterScreen" component={RegisterScreen}/>
    <Route path="/HomeScreen" component={HomeScreen}/>
    <Route path="/LoginScreen" component={LoginScreen}/>
    </Router>
    </div>
         
     
   
  );
}

export default App;
