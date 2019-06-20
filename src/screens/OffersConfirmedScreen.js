import React, { Component } from 'react';

import { Button, Card, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,Alert,Modal,ModalFooter} from 'reactstrap';

import {Link} from 'react-router-dom'

import axios from 'axios'
import './../styles/style.css';
import HomeScreen from './HomeScreen'
import {getOffersConfirmed}  from './../request'
import {GET_OFFER} from '../constants/Endpoints'
import validator from './../validator'
import {connect} from "react-redux";


class OffersConfirmedScreen extends Component{
    constructor(props) {
        super(props);
    
       
        this.state = {
            form:{

            offer_id:'',
            user_id:'',
           
            },
        offersConfirmed: [],
        modal: false,
        visible: false,
        empty:false
          

          
        };
        this.cancelOffer=this.cancelOffer.bind(this);
        this.toggle = this.toggle.bind(this);
        this.setOffer = this.setOffer.bind(this);
    }
 

    componentWillMount(){

        getOffersConfirmed(this.props.user.user_id)
        .then(response=>{
            this.setState({offersConfirmed:response.data})
         
        })
        if(validator.EmptyFields(this.state.offersConfirmed)){
            this.setState({empty:true})
        }
       
}

toggle = (event) =>  {
       
       
    this.setOffer(event);
   this.setState(prevState => ({
      modal: !prevState.modal,
      
     
    }));
  }
  
  setOffer(event){
    this.setState({
      form:{
        ...this.state.form,
       offer_id:event.target.value,
       user_id:this.props.user.user_id
    }
  })
}
cancelOffer(){

    console.log(this.state.form)
    this.setState(prevState => ({
        modal: !prevState.modal,
        
       
      }));
    axios.post(GET_OFFER + 'cancel',this.state.form)
    .then(response => {
   
     this.setState({ visible: true });
   })
   .catch(error => console.log("Error:", error));
}

      
    render(){

        return(

<div className="container-offersConfirmed" >

<HomeScreen />

<div className="col-8 " style={{display: 'flex', justifyContent: 'center',marginTop: "10%",textAlign:'center',marginLeft:'15%'}}>
<Alert color="info" style={{display: this.state.empty ? 'none' : 'block' ,}}>
                    Don't have offers confirmed
                </Alert></div>
            
     <div className="row" >
    
   
  
   
    

         
           
            <div className="col-12 " style={{display: 'flex', justifyContent: 'center',marginTop: "3%",}} >
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                    
                              
                                    <ModalFooter>
                                       <Button color="primary" onClick={this.cancelOffer}>Are you sure to cancel?</Button>{' '}
                                       <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                   </ModalFooter>
                           </Modal>
       
                          
                        
                        
                 <div className="col-8" style={{backgroundColor:'white'}}>
                 
                 <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                             Offer was cancel! 
                          </Alert>
                 {this.state.offersConfirmed.map((p,i)=>{
                                                return (
                    <CardGroup >
                        <Card value={p.user_id} key={i}>
                           
                            <CardBody>
                            
                            <CardBody>
                           
                            <CardSubtitle>Price: {p.price}</CardSubtitle>
                            <CardSubtitle>Quantity Available: {p.quantity}</CardSubtitle>
                            <CardText>Description: {p.description}</CardText>
                            <CardText>Pickup Zone: {p.pickupzones[i].description}</CardText>
                            <Button color="primary" onClick={this.toggle} value={p.id}>Cancel Offer</Button>
                            </CardBody>
                            
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
  

  
  
  export default connect(mapStateToProps)(OffersConfirmedScreen);