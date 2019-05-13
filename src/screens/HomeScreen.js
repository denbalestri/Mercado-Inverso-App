import React, { Component } from 'react';

import { Button ,Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

import {Link} from 'react-router-dom'

import axios from 'axios'
import './../styles/style.css';





class HomeScreen extends Component{


    constructor(props) {
        super(props);
    
       
        this.state = {
          collapsed: true
        };

        this.toggleNavbar = this.toggleNavbar.bind(this);
      }



    toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }
    render(){
    
        return(
   
    <div className="container">

         <div className="row">
                 
             <div className="col-12"  style={{display: 'flex', justifyContent: 'center',marginTop: "30%"}}>

             <div className="col-6">    
                         <Button onClick={() => this.props.history.push('/PostScreen')} className="btn btn-primary" size="lg" block>Publicar necesidad</Button>
                         <Button onClick={() => this.props.history.push('/')} className="btn btn-primary" size="lg" block>Ver ofertas recibidas</Button>
             </div>
            
                 
             </div>

             
        </div>

        
        
  </div>

        )
    }

}


export default HomeScreen;

