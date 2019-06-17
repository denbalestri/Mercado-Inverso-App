import React, { Component } from 'react';

import { Button, Card, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import {Link} from 'react-router-dom'

import axios from 'axios'
import './../styles/style.css';
import HomeScreen from './HomeScreen'
import {getPostOffers}  from './../request'

import validator from './../validator'
import {connect} from "react-redux";


class viewOffersScreen extends Component{
    constructor(props) {
        super(props);
    
       
        this.state = {
          offers: [],
          modal: false
          

          
        };
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount(){
       //console.log(this.props.post)
        getPostOffers(this.props.post)
        .then(response=>{
            this.setState({offers:response.data})
         
        })
       
      }

      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }  


    render(){

        return(
<div className="container-ViewOffers" >

<HomeScreen />

            
     <div className="row" >
    
   
  
   
    

         
           
            <div className="col-12 " style={{display: 'flex', justifyContent: 'center',marginTop: "3%",}} >
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                    
                              
                             <ModalFooter>
                                <Button color="primary" onClick={{}}>Are you sure to confirm?</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                    </Modal>
                 <div className="col-8" style={{backgroundColor:'white'}}>
             
                 {this.state.offers.map((p,i)=>{
                                                return (

                    
                                       
                    <CardGroup >
                        <Card value={p.user_id} key={i}>
                           
                            <CardBody>
                            
                            <CardSubtitle>Price: {p.price}</CardSubtitle>
                            <CardSubtitle>Quantity Available: {p.quantityavailable}</CardSubtitle>
                            <CardText>Description: {p.description}</CardText>
                            <CardText>Pickup Zone: {p.pickupzones[i].description}</CardText>
                           
                            <Link className="btn btn-primary"  onClick={this.toggle}>Confirm</Link>  
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
    console.log(state.post)
      return {
          user: state.user,
          post:state.post,         
      }
  }


  
  export default connect(mapStateToProps)(viewOffersScreen);

  