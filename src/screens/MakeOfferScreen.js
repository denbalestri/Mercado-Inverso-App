import React, { Component } from 'react';

import {  Card, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,Alert,Col, Row, Button, Form, FormGroup, Label, Input, FormText,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import {Link} from 'react-router-dom'

import axios from 'axios'
import './../styles/style.css';
import SupplierHomeScreen from './SupplierHomeScreen'
import {getPosts,getCategories}  from './../request'
import {GET_OFFER} from '../constants/Endpoints'
import validator from './../validator'
import {connect} from "react-redux";
import imageCard from './../Images/ImageCard.jpg';
import {getPickupZone}  from './../request'
import {PENDING} from '../constants/states'
class MakeOfferScreen extends Component{
    constructor(props) {
        super(props);
    
       
        this.state = {
            
            form: {
                price:'',
                description:'',
                user_id:'',
                quantityavailable:'',
                post_id:'',
                pickupzone_id:'',
                state:PENDING,
             },
             pickupzones:[],
             modal:false,
             error:false,
             msg:'',
             msgerror:'Oups! something was wrong',
             success:false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateBeforeSubmit=this.validateBeforeSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleOfferClick = this.handleOfferClick.bind(this);
    }

    handleOfferClick= () => {
       
       
        axios.post(GET_OFFER + 'createOffer', this.state.form)
        .then(response => {
            if (Array.isArray(response.data) && response.data.length === 0) {
              
              
              this.setState({ error: true });
              this.setState({ modal: true });
              this.setState({ msg: 'Could not save the data please try again'});
            }
            else{
              this.setState({ success: true });
              this.setState({ msg: 'The data could be saved!'}); 
              this.setState({ msgerror: 'Well Done!'});
               
             
            }
            

        })
        .catch(error => console.log("Error:", error));

    }





    handleInputChange=(event)=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
          this.setState(state =>{
            return {form:{
              ...state.form,
              [name]: value
            }
          }
          });
  
  
      }

      validateBeforeSubmit=(e)=>{
          
        e.preventDefault();

        this.setState({ error: false });

       
        if(!validator.maxPrice(this.state.form.price)){
            this.setState({ modal: true });
            this.setState({ msg: "The price shouldn't be more than 999999"});
            this.setState({ error: true });
            
            return;
        }
        Object.keys(this.state.form)
        
        .map(key =>{

            if(validator.EmptyFields(this.state.form[key])) {
             
              this.setState({ error: true });
              this.setState({ modal: true });
              this.setState({ msg: 'Must have all the complete fields'});
              
              
            }
            
          
          })

          if(this.state.error===false){
            this.handleOfferClick();
          } 

      }

      componentWillMount(){
        getPickupZone(this.props.match.params.id)
        .then(response=>this.setState({pickupzones:response.data})).then(data=>{
            this.setState({
              form: {
                ...this.state.form,
                user_id: this.props.user.user_id,
                post_id: this.props.post,
              }
          })
          })
    }

     
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
      


    render(){

        return(
            

<div className="container-MakeOffer" >
            <SupplierHomeScreen />
    <div className="row" >
        <div className="col-12" style={{display: 'flex', justifyContent: 'center',marginTop: "12%"}} >
           
                    
           <div className="col-md-4" style={{ textAlign: "center" ,backgroundColor:'white'}}>
           <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                  <ModalHeader toggle={this.toggle}> {this.state.msgerror}</ModalHeader>
                                  <ModalBody>
                                  {this.state.msg}
                                  </ModalBody>
                                  <ModalFooter>
                                  
                                    <Button color="primary" onClick={this.toggle}>Close</Button>
                                  </ModalFooter>
                          </Modal>

                <FormGroup >
                <Label for="description" >Description</Label>
                <Col sm={12}>
                    <Input type="textarea" name="description" id="description" onChange={this.handleInputChange} />
                </Col>
                </FormGroup>
                <FormGroup>
                <Label for="price">Price</Label>
                <Input  type="number" name="price" id="price" onChange={this.handleInputChange} />
                </FormGroup>
            </div>
                <div className="col-md-4" style={{ textAlign: "center" ,backgroundColor:'white'}}>
                        <FormGroup>
                        
                            <Label for="">Quantity Available</Label>
                            <Input
                                type="number"
                                name="quantityavailable"
                                onChange={this.handleInputChange} 
                            
                            />
                            </FormGroup>
                            <FormGroup>
                                      <Label for="select">Pickup Zone</Label>
                                      <Input type="select" name="pickupzone_id"  onChange={this.handleInputChange} value={this.state.form.pickupzone_id}>
                                      <option value={0} key={0} defaultValue>Choose a Pickup zone</option>
                                      {this.state.pickupzones.map((p,i)=>{
                                                return (
                                                <option value={p.id} key={i}>{p.description}</option>
                                                )
                                              })
                                      }
                                    
                                    );      
                                      </Input>
                                    </FormGroup>
                        <Link className="btn btn-primary"  onClick={this.validateBeforeSubmit}>Make a offer</Link>              
               
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
  
  
  export default connect(mapStateToProps)(MakeOfferScreen);