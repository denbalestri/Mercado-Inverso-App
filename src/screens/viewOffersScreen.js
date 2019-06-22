import React, { Component } from 'react';

import { Button, Card, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody, Modal, ModalHeader, ModalBody, ModalFooter,Alert} from 'reactstrap';

import {Link} from 'react-router-dom'

import axios from 'axios'
import './../styles/style.css';
import HomeScreen from './HomeScreen'
import {getPostOffers}  from './../request'
import {GET_OFFER} from '../constants/Endpoints'
import {CONFIRMED} from '../constants/states'
import validator from './../validator'
import {connect} from "react-redux";



class viewOffersScreen extends Component{
    constructor(props) {
        super(props);
    
       
        this.state = {
          
          form:{
          offer_id:'',
          state:'',
          post_id:'',
          user_id:'',
          },
          offers: [],
          modal: false,
          visible: false,
          empty:false
          
        };
        this.toggle = this.toggle.bind(this);
        this.handleConfirmClick = this.handleConfirmClick.bind(this);
        this.setOffer = this.setOffer.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
      this.setState({ visible: false });
    }

    componentWillMount(){
       
        getPostOffers(this.props.post)
        .then(response=>{
            this.setState({offers:response.data})
         
        })
        if(this.state.offers==""){
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
           post_id:this.props.post,
           user_id:this.props.user.user_id
        }
      })
    }

      handleConfirmClick= () => {
       
        this.setState(prevState => ({
          modal: !prevState.modal,
          
         
        }));
        axios.post(GET_OFFER + 'confirm',this.state.form)
         .then(response => {
        
          this.setState({ visible: true });
        })
        .catch(error => console.log("Error:", error));
      }


    render(){

        return(
<div className="container-ViewOffers" >

<HomeScreen />

<div className="col-8 " style={{display: 'flex', justifyContent: 'center',marginTop: "10%",textAlign:'center',marginLeft:'15%'}}>
<Alert color="info" style={{display: this.state.empty ? 'block' : 'none' ,}}>
                    You don't have offers yet
                </Alert></div>
            
     <div className="row" >
    
   
  
   
    

         
           
            <div className="col-12 " style={{display: 'flex', justifyContent: 'center',marginTop: "3%",}} >
           
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                    
                              
                             <ModalFooter>
                                <Button color="primary" onClick={this.handleConfirmClick}>Are you sure to confirm?</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                    </Modal>

                   
                 <div className="col-8" style={{backgroundColor:'white'}}>
                 <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                      Offer Confirmed! 
                   </Alert>
                 {this.state.offers.map((p,i)=>{
                                                return (

                    
                                       
                    <CardGroup >
                        <Card value={p.user_id} key={i}>
                           
                            <CardBody>
                            
                            <CardSubtitle>Price: {p.price}</CardSubtitle>
                            <CardSubtitle>Quantity Available: {p.quantityavailable}</CardSubtitle>
                            <CardText>Description: {p.description}</CardText>
                            <CardText>Pickup Zone: {p.pickupzones[0].description}</CardText>
                           
                            <Button color="primary"  onClick={this.toggle} value={p.id}>Confirm</Button>  
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

  