import React, { Component } from 'react';

import { Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap';

import {Link} from 'react-router-dom'

import axios from 'axios'
import './../styles/style.css';
import PostScreen from './PostScreen'
import OfferScreen from './OfferScreen'
import {connect} from "react-redux";
import logo from './../Images/logo2.png';

class HomeScreen extends Component{

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
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
                <NavLink href="/PostScreen">Post Product</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={OfferScreen}>Offers</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">Profile</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Sign out
                  </DropdownItem>
                  <DropdownItem>
                    Change password
                  </DropdownItem>
                  
                  
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>


                        
         
        
        
  </div>

        )
    }

}


export default HomeScreen;

