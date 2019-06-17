import React from 'react';

import './App.css';
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import ListPostScreen from './screens/ListPostScreen'
import PostScreen from './screens/PostScreen'
import SupplierHomeScreen from './screens/SupplierHomeScreen'
import MakeOfferScreen from './screens/MakeOfferScreen'
import OwnOffersScreen from './screens/OwnOffersScreen'
import OwnListPostScreen from './screens/OwnListPostScreen'
import viewOffersScreen from './screens/viewOffersScreen'
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
    <Route path="/OwnOffersScreen" component={OwnOffersScreen}/>
    <Route path="/OwnListPostScreen" component={OwnListPostScreen}/>
    <Route path="/viewOffersScreen" component={viewOffersScreen}/>
    </Router>
   
   
         
     
   
  );
}

export default App;
