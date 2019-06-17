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

import {Link,NavLink} from 'react-router-dom'


import axios from 'axios'
import './../styles/style.css';
import PostScreen from './PostScreen'
import OfferScreen from './MakeOfferScreen'
import {connect} from "react-redux";
import logo from './../Images/logo2.png';
import firebase from './../firebase';
class HomeScreen extends Component{

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
   this.toggle=this.toggle.bind(this);
   this.signOut=this.signOut.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
signOut(){

  firebase.auth().signOut().then(()=> {
   this.props.history.push('/')
  this.props.user_signout();
  }).catch(function(error) {
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
                 to="/PostScreen"
               style={{marginRight:'20px',color:'grey',lineHeight: '45px'}}
                
                >Post Product</NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                style={{marginRight:'20px',color:'grey',lineHeight: '45px'}}
                to="/OwnListPostScreen">Posts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                style={{marginRight:'20px',color:'grey',lineHeight: '45px'}}
                onClick={this.signOut}>Sign out</NavLink>
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






export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);



