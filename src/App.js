import React from 'react';

import './App.css';
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import ListPostScreen from './screens/ListPostScreen'
import PostScreen from './screens/PostScreen'
import SupplierHomeScreen from './screens/SupplierHomeScreen'
import MakeOfferScreen from './screens/MakeOfferScreen'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

    
function App() {
  return (
   
     //ALL SCREENS 
    
     
      <Router>
    <Route path="/" exact component={LoginScreen}/>
    <Route path="/RegisterScreen" component={RegisterScreen}/>
    <Route path="/HomeScreen" component={HomeScreen}/>
    <Route path="/SupplierHomeScreen" component={SupplierHomeScreen}/>
    <Route path="/ListPostScreen" component={ListPostScreen}/>
    <Route path="/PostScreen" component={PostScreen}/>
    <Route path="/MakeOfferScreen" component={MakeOfferScreen}/>
    </Router>
   
   
         
     
   
  );
}

export default App;
