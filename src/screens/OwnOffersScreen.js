import React, { Component } from 'react';

import { Button, Card, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,Alert} from 'reactstrap';

import {Link} from 'react-router-dom'

import axios from 'axios'
import './../styles/style.css';
import SupplierHomeScreen from './SupplierHomeScreen'
import {getOffers}  from './../request'

import validator from './../validator'
import {connect} from "react-redux";


class OwnOffersScreen extends Component{
    constructor(props) {
        super(props);
    
       
        this.state = {
          offers: [],
          
          

          
        };
     this.getOffer=this.getOffer.bind(this);
    }

    componentWillMount(){
       
        getOffers(this.props.user.user_id)
        .then(response=>{
            this.setState({offers:response.data})
        
        })
       
      }
      getOffer(){
          console.log(this.state.offers)
      }

      
    render(){

        return(
<div className="container-ownOffers" >

<SupplierHomeScreen />

            
     <div className="row" >
    
   
  
   
    

         
           
            <div className="col-12 " style={{display: 'flex', justifyContent: 'center',marginTop: "3%",}} >
                       
                 <div className="col-8" style={{backgroundColor:'white'}}>
             
                 {this.state.offers.map((p,i)=>{
                                                return (
                    <CardGroup >
                        <Card value={p.user_id} key={i}>
                           
                            <CardBody>
                            
                            <CardSubtitle>Price: {p.price}</CardSubtitle>
                            <CardSubtitle>Quantity Available: {p.quantityavailable}</CardSubtitle>
                            <CardText>Description: {p.description}</CardText>
                            <CardText>Pickup Zone: {p.pickupzones[0].description}</CardText>
                            <CardText>State: {p.states[0].description}</CardText>
                            <Link onClick={this.getOffer}> VER OFERTA</Link>
                            </CardBody>
                        </Card>
                        </CardGroup> 
                                              
                      )
                 })
                    }
                
                 </div>
            </div>
    </div>

 </div>

        )





      }

}

let mapStateToProps = state => {
  
      return {
          user: state.user,
                    
      }
  }


  
  export default connect(mapStateToProps)(OwnOffersScreen);