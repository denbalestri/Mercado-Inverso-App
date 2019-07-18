
import React, { Component } from 'react';
import { Button, Form, FormGroup,Alert, Label, Input, FormText,FormFeedback ,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Link,Route,Redirect} from 'react-router-dom'
import '../styles/style.css';
import {getRols}  from './../request'
import {GET_USER} from '../constants/Endpoints'
import axios from 'axios'
import firebase from './../firebase';
import { functionTypeAnnotation } from '@babel/types';
import validator from './../validator'
import './../styles/style.css'
import LoginScreen from './LoginScreen';
class RegisterScreen extends Component{


    

    constructor(props) {
        super(props);
        this.state = {
            //isLoading: false,
           form:{ 
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
       RegisterSuccess:false,
       wrongPassword:false,
       okayPassword:false,
       modal: false,
       msg:'',
       error:false,
       errorMsg:'',
       msgconfirm:''

        };

        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
        this.validateBeforeSubmit=this.validateBeforeSubmit.bind(this);
        this.renderRedirect=this.renderRedirect.bind(this);
    }

    handleRegisterClick = () => {
     //console.log(this.state.form)
      this.setState({error:false});
      this.setState({wrongPassword:false})
          
            axios.post(GET_USER + 'create', this.state.form)
            .then(response => {
             
                if (Array.isArray(response.data) && response.data.length === 0) {
                    //this.setState({ isValid: false });
                    this.setState({ RegisterSuccess: false });
                    console.log(response.data)
                    //this.setState({msg:response.error})
                    
                } else {
                 
                    firebase
                    .auth()
                    
                    .createUserWithEmailAndPassword(this.state.form.email,this.state.form.password)
                    .then(a=>
                      firebase.auth().currentUser.sendEmailVerification()
                      .then(() => {

                            this.setState({RegisterSuccess:true})

                            //return this.props.history.push('/')
                      })
                      )
                    .catch(error=>{
                      
                      this.setState({errorMsg:error.message})
                      this.setState({isValid:false})
                     
                    })
                 
                    
                }
            })
            .catch(error => console.log("Error:", error));

    

    }

    renderRedirect = () => {
      if (this.state.RegisterSuccess) {
        return this.props.history.push('/')
      }
    }

             
    validateBeforeSubmit=(e)=>{
      e.preventDefault();
     // console.log(this.state.form)
      
     this.setState({error:false});
      if(!validator.min(this.state.form.password)){
        
         this.setState({
           
          form:{ 
            ...this.state.form,
          password:''}
           })
           this.setState({
            
            form:{ 
              ...this.state.form,
            repeatpassword:''}
             })
         this.setState({ msg: 'The password must be more than six characters'});
         this.setState({ modal: true });
         this.setState({ error: true });
         this.setState({wrongPassword:true})
         this.setState({ okayPassword: false });
         
        
         return;
      }
     
      if(!validator.Equals(this.state.form.password,this.state.form.repeatpassword)){
     
        this.setState({
          form:{
            ...this.state.form,
          password:''}
           })
           this.setState({
             
            form:{ 
              ...this.state.form,
            repeatpassword:''}
             })
             this.setState({ msg: 'The password must be more than six characters and the passwords are wrong!'});
             this.setState({ modal: true });
             this.setState({wrongPassword:true})
             this.setState({ okayPassword: false });
             this.setState({ error: true });
           
             
             return;
      }
     else if(validator.Equals(this.state.form.password,this.state.form.repeatpassword) && !validator.min(this.state.form.password)){
        this.setState({ okayPassword: true });
        this.setState({wrongPassword:false})
        
        return;
      }
     if(this.state.form.email===''){
      this.setState({ error: true });
      this.setState({ msg: 'The Email is invalid!'});
      this.setState({ modal: true });
      
  
      return;
     }

        Object.keys(this.state.form)
        .map(key =>{

            if(validator.Empty(this.state.form[key])) {
              this.setState({ modal: true });
             
              this.setState({ msg: 'Must have all the complete fields'});
              this.setState({ error: true });
              
             
            }

          })

          
         
        
         if(this.state.error===false){
          
          this.handleRegisterClick();
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
          
    <div  className="container-register">
          <Alert color="success" style={{display: this.state.RegisterSuccess ? 'block' : 'none' }}>
                        <h4 className="alert-heading">Well done!</h4>
                        <p>
                          Aww yeah, It was successfully the register, we sent you a confirm email,
                          please check in your Inbox!
                        </p>
                        <hr />
                        <p className="mb-0">
                          Thank you !
                        </p>
                      </Alert>
                      <Alert color="danger" style={{display: this.state.isValid ? 'none' : 'block' ,}}>
                     {this.state.errorMsg}
                      </Alert>
    <div className="row" >
                  
        <div className="col-12" style={{display: 'flex', justifyContent: 'center',marginTop: "12%"}} >
           
                    
              <div className="col-md-4" style={{ textAlign: "center" ,backgroundColor:'white'}}>
                      <Form >
                     
                     


                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                  <ModalHeader toggle={this.toggle}>Oups! something was wrong</ModalHeader>
                                  <ModalBody>
                                  {this.state.msg}
                                  </ModalBody>
                                  <ModalFooter>
                                  
                                    <Button color="primary" onClick={this.toggle}>Close</Button>
                                  </ModalFooter>
                          </Modal>


                         
                                    <FormGroup style={{marginTop:"5%"}}>
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


                                    <FormGroup style={{marginBottom:"15%"}}>
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
                            
                            </Form>
                            </div>
                            <div className="col-4" style={{ textAlign: "center" ,backgroundColor:'white'}}> 
                           <Form >
                           
                               


                                    <FormGroup style={{marginTop:"5%"}}>
                                      <Label for="email">Email</Label>
                                      <Input
                                        name="email"
                                        onChange={this.handleOnChangeEmail}
                                        placeholder="example@gmail.com..."
                                      />
                                    </FormGroup>

                                    <FormGroup 
                                    style={{display: this.state.wrongPassword ? 'none' : 'block' }} >
                                      <Label for="password">Password</Label>
                                      <Input
                                        type="password"
                                        name="password"
                                        value={this.state.form.password}
                                        onChange={this.handleInputChange}
                                        placeholder="password..."
                                      />
                                    </FormGroup>

                                    <FormGroup 
                                    style={{display: this.state.okayPassword ? 'block' : 'none' }} >
                                    <Label for="password">Repeat Password</Label>
                                    <Input valid 
                                       type="password"
                                        name="password"
                                        value={this.state.form.repeatpassword}
                                        onChange={this.handleInputChange}
                                        placeholder="password..."
                                    />
                                   <FormFeedback valid> that password is correct!</FormFeedback>
                                   </FormGroup>




                                    <FormGroup  style={{display: this.state.wrongPassword ? 'block' : 'none' }}>
                                              <Label for="invalidPassword" >Invalid password</Label>
                                              <Input type="password" value={this.state.form.password} className="passwordIncorrect" name="password" invalid onChange={this.handleInputChange}/>
                                              <FormFeedback>Oh noes! the password is wrong!</FormFeedback>
                                              <FormText>Please write again.</FormText>
                                    </FormGroup> 

                                    <FormGroup style={{display: this.state.okayPassword ? 'none' : 'block' }}>
                                      <Label for="passwordRepeat">Repeat Password</Label>
                                      <Input
                                        type="password"
                                        name="repeatpassword"
                                        onChange={this.handleInputChange}
                                        placeholder="password..."
                                      />
                                    </FormGroup>
                                   
                             
                          </Form>

                          <div className="col-12">
                          <Link className="btn btn-primary" style={{marginTop:"7%",width:'40%'}} onClick={this.validateBeforeSubmit}>Register</Link> 
                          </div>      
                      </div>
                          
                          
                  </div>

              </div>
                        
        </div>

        )}

}




export default RegisterScreen;