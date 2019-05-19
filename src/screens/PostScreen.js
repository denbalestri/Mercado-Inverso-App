import React, { Component } from 'react';

import { Button, Form, FormGroup, Label, Input, FormText,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import {Link} from 'react-router-dom'

import axios from 'axios'
import './../styles/style.css';
import HomeScreen from './HomeScreen'
import {getCategories}  from './../request'
import validator from './../validator'
import {connect} from "react-redux";

class PostScreen extends Component{
    constructor(props) {
        super(props);
       
        this.state = {
            //isLoading: false,
            form: {
                 quantity: "", 
                 price: "" ,
                 title:"",
                 category:"",
                 user_id:"",
                 description:"",
                 image:""
                
                },
            msg: '',
            modal:false,
            loading:false,
            category:[],
            
        };
        this.toggle = this.toggle.bind(this);
        this.handlePostClick = this.handlePostClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateBeforeSubmit=this.validateBeforeSubmit.bind(this);
    }

    handlePostClick= () => {
       
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

        console.log(this.props)
        console.log(this.state.form)

        if(!validator.maxPrice(this.state.form.price)){
            this.setState({ modal: true });
            this.setState({ msg: "The price shouldn't be more than 999999"});
            return;
        }
        Object.keys(this.state.form)
        .map(key =>{

            if(validator.Empty(this.state.form[key]) && this.state.form[key]!=='image') {
              this.setState({ modal: true });
              this.setState({ msg: 'Must have all the complete fields'});
              return;
            }
          
          })
          this.handlePostClick();
      }



    componentWillMount(){
        getCategories(this.props.match.params.id)
        .then(response=>this.setState({category:response.data}))
  
      }
       
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }


    render(){

        return(
    <div  className="container-post">
    <HomeScreen />
        <div className="row" >
            <div className="col-12" style={{display: 'flex', justifyContent: 'center',marginTop: "12%"}} >
                 <div className="col-md-4" style={{ textAlign: "center" ,backgroundColor:'white'}}>
                



                    <Form>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                  <ModalHeader toggle={this.toggle}>Oups! something was wrong</ModalHeader>
                                  <ModalBody>
                                  {this.state.msg}
                                  </ModalBody>
                                  <ModalFooter>
                                  
                                    <Button color="primary" onClick={this.toggle}>Close</Button>
                                  </ModalFooter>
                          </Modal>

                    <FormGroup>
                    <Label for="title">Title</Label>
                    <Input  
                    name="title"
                    
                     placeholder="Title..." 
                     onChange={this.handleInputChange}
                     />
                    </FormGroup>
                  
                    <FormGroup>
                    <Label for="exampleText">Description</Label>
                    <Input type="textarea" 
                    name="description" 
                    id="description"
                    placeholder="Description..."
                    onChange={this.handleInputChange} />
                    </FormGroup>
                    
                   
                    
                    <FormGroup>
                    <Label for="image">Image</Label>
                    <Input type="file"
                     name="image"
                      id="image"
                      onChange={this.handleInputChange} />
                    <FormText color="muted">
                       Upload a image.
                    </FormText>
                    </FormGroup>
                   
                   
                </Form>
                </div>
                <div className="col-md-4" style={{ textAlign: "center" ,backgroundColor:'white'}}>
                <Form>
                <FormGroup>
                    <Label for="quantity">Quantity</Label>
                    <Input
                        type="number"
                        name="quantity"
                        onChange={this.handleInputChange}
                        placeholder="Quantity..."
                    />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Category</Label>
                        <Input type="select"
                         name="category"
                         onChange={this.handleInputChange} >
                        <option value={0} key={0} defaultValue>Choose a category</option>
                                      {this.state.category.map((p,i)=>{
                                                return (
                                                <option value={p.id} key={i}>{p.description}</option>
                                                )
                                              })
                                      }
                        </Input>
                        </FormGroup>
                        <FormGroup>
                    <Label for="exampleNumber">Price</Label>
                    <Input
                        type="number"
                        name="price"
                        id="price"
                        onChange={this.handleInputChange}
                        placeholder="Price..."
                    />
                    </FormGroup>
                    <Link className="btn btn-primary"  onClick={this.validateBeforeSubmit}>Post</Link>   
                </Form>
                </div>
               
          </div>
    </div>
</div>




        );




    }

}





let mapStateToProps = (state) => {
   console.log(state)
    return {
        user: state.user,
      
    }
}

export default connect(mapStateToProps)(PostScreen);
