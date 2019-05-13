
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText,FormFeedback ,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Link} from 'react-router-dom'
import '../styles/style.css';
import {getRols}  from './../request'
import {GET_USER} from '../constants/Endpoints'
import axios from 'axios'
class RegisterScreen extends Component{


    

    constructor(props) {
        super(props);
        this.state = {
            //isLoading: false,
           form:{ 
                  username: "",
                  last_name:"",
                  first_name:"",
                  rol:"",
                  birthdate:"",
                  password: "",
                  email: "",
                  repeatpassword: "",
                 

        },
       roles:[],
       isValid: true,
       RegisterSuccess:true,
       wrongPassword:false,
       modal: false,
       msg:'',
        };

        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
    }

    handleRegisterClick () {
      console.log(this.state.form)
      if((this.state.form.password!==this.state.form.repeatpassword) && this.state.form.last_name=="" || this.state.form.first_name=="" || this.state.form.rol=="" ||
      this.state.form.birthdate=="" || this.state.form.password=="" || this.state.form.repeatpassword=="" || this.state.form.username==""){
        this.setState({ wrongPassword: true });
        this.setState({ modal: true });
        this.setState({ msg: 'Must have all the complete fields'});
      }
      else if(this.state.form.last_name=="" || this.state.form.first_name=="" || this.state.form.rol=="" ||
      this.state.form.birthdate=="" || this.state.form.password=="" || this.state.form.repeatpassword=="" || this.state.form.username=="")
      {
        this.setState({ modal: true });
        this.setState({ msg: 'Must have all the complete fields'});
        
      }
      if(this.state.form.email==''){
        this.setState({ modal: true });
        this.setState({ msg: 'Email is wrong!'});
      }
      else{
            axios.post(GET_USER + 'create', this.state.form)
            .then(response => {
                //console.log(response);
                if (Array.isArray(response.data) && response.data.length === 0) {
                    //this.setState({ isValid: false });
                    this.setState({ RegisterSuccess: false });
                    
                } else {    
                    return this.props.history.push('/LoginScreen')
                    
                }
            })
            .catch(error => console.log("Error:", error));

    }

    }



    componentWillMount(){
      getRols(this.props.match.params.id)
      .then(response=>this.setState({roles:response.data}))

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

    
    toggle() {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }
 
    handleOnChangeEmail = ( e ) => {

      // don't remember from where i copied this code, but this works.
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
      if (re.test(e.target.value) ) {
        this.setState({
          form: {
              ...this.state.form,
              email: e.target.value
          }
      });
          // this is a valid email address
          // call setState({email: email}) to update the email
          // or update the data in redux store.
      }
      
  
  }



  
  
    render(){
    
        return(

          <div className="container" >
          <div className="row" >
              <div className="col-12 " style={{display: 'flex', justifyContent: 'center',marginTop: "20%"}} >
                   <div className="col-6">       
                      <Form style={{ textAlign: "center" }}>

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
                                      <Label for="firstName">First Name</Label>
                                      <Input
                                        type="nombre"
                                        name="first_name"
                                        
                                        placeholder="first name..."
                                        onChange={this.handleInputChange}
                                      />
                                    </FormGroup>
                                    <FormGroup>
                                      <Label for="lastName">Last Name</Label>
                                      <Input
                                        
                                        placeholder="last name..."
                                        name="last_name"
                                        onChange={this.handleInputChange}
                                      />
                                    </FormGroup>
                                    <FormGroup>
                                              <Label for="exampleDatetime">Birthdate</Label>
                                              <Input
                                                type="date"
                                                name="birthdate"
                                                onChange={this.handleInputChange}
                                                
                                              />
                                            </FormGroup>
                                    <FormGroup>
                                      <Label for="UserName">Username</Label>
                                      <Input
                                      name="username"
                                        onChange={this.handleInputChange}
                                        placeholder="username..."
                                      />
                                    </FormGroup>
                                    <FormGroup>
                                      <Label for="email">Email</Label>
                                      <Input
                                        name="email"
                                        onChange={this.handleOnChangeEmail}
                                        placeholder="example@gmail.com..."
                                      />
                                    </FormGroup>

                                    <FormGroup 
                                    style={{display: this.state.wrongPassword ? 'none' : 'block' }}>
                                      <Label for="password">Password</Label>
                                      <Input
                                        type="password"
                                        name="password"
                                        
                                        onChange={this.handleInputChange}
                                        placeholder="password..."
                                      />
                                    </FormGroup>

                                    <FormGroup  style={{display: this.state.wrongPassword ? 'block' : 'none' }}>
                                              <Label for="invalidPassword" >Invalid password</Label>
                                              <Input type="password"   className="passwordIncorrect" name="password" invalid onChange={this.handleInputChange}/>
                                              <FormFeedback>Oh noes! the password is wrong!</FormFeedback>
                                              <FormText>Please write again.</FormText>
                                    </FormGroup> 

                                    <FormGroup>
                                      <Label for="passwordRepeat">Repeat Password</Label>
                                      <Input
                                        type="password"
                                        name="repeatpassword"
                                        onChange={this.handleInputChange}
                                        placeholder="password..."
                                      />
                                    </FormGroup>




                                    <FormGroup>
                                      <Label for="select">Rol</Label>
                                      <Input type="select" name="rol" id="rol" onChange={this.handleInputChange} value={this.state.form.rol}>
                                      <option value={0} key={0} defaultValue>Choose a rol</option>
                                      {this.state.roles.map((p,i)=>{
                                                return (
                                                <option value={p.id} key={i}>{p.description}</option>
                                                )
                                              })
                                      }
                                    
                                    );      
                                          
                                      
                                        
                                      </Input>

                                      
                                    </FormGroup>
                                <Link className="btn btn-primary" onClick={this.handleRegisterClick}>Register</Link>

                              </Form>
                          </div>
                        </div>

                        </div>
                   </div>

        )}

}




export default RegisterScreen;