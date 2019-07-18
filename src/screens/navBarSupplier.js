import React, { Component } from 'react';

import { Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap';

import {Link,NavLink,Redirect} from 'react-router-dom'


import axios from 'axios'
import './../styles/style.css';
import PostScreen from './PostScreen'
import Login from './LoginScreen'
import OfferScreen from './MakeOfferScreen'
import {connect} from "react-redux";
import logo from './../Images/logo2.png';
import firebase from '../firebase';
import LoginScreen from './LoginScreen';

class navBarSupplier extends Component{

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    this.toggle=this.toggle.bind(this);
    this.signOutUser=this.signOutUser.bind(this);
   
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  signOutUser(){
 
  firebase.auth().signOut()
    .then(()=> {
    this.props.user_signout();
    
   
    })
    .catch(function(error) {
      // An error happened.
    });
    
  }
 

  
    render(){
    
        return(
   
    <div className="container">

         
       <Navbar color="light" light expand="md">
       <img src={logo} alt="Logo" style={{width: '100px',margin:'0 auto',display:'block'}} />
          
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              
              <NavItem>
                <NavLink 
                style={{marginRight:'20px',color:'grey',lineHeight: '45px'}}
                to="/ListPostScreen">Posts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                style={{marginRight:'20px',color:'grey',lineHeight: '45px'}}
                to="/OwnOffersScreen">Offers</NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                style={{marginRight:'20px',color:'grey',lineHeight: '45px'}}
                onClick={this.signOutUser} to="/">Sign out</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>


                        
         
        
        
  </div>

        )
    }

}

let mapStateToProps = state => {
 
   return {
       user: state.user
     
   }
}

let mapDispatchToProps = (dispatch) => {
  
  return {
      user_signout: () => {
          dispatch({type: 'USER_LOGOUT'})
      }
  }
}








export default connect(mapStateToProps,mapDispatchToProps)(navBarSupplier);