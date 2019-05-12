
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
        };

        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    handleRegisterClick () {
      console.log(this.state.form)
      if((this.state.form.password!==this.state.form.repeatpassword) && this.state.form.last_name=="" || this.state.form.first_name=="" || this.state.form.rol=="" ||
      this.state.form.birthdate=="" || this.state.form.password=="" || this.state.form.repeatpassword=="" || this.state.form.username==""){
        this.setState({ wrongPassword: true });
        this.setState({ modal: true });
      }
      else if(this.state.form.last_name=="" || this.state.form.first_name=="" || this.state.form.rol=="" ||
      this.state.form.birthdate=="" || this.state.form.password=="" || this.state.form.repeatpassword=="" || this.state.form.username=="")
      {
        this.setState({ modal: true });
        
        
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
 




  
  
    render(){
    
        return(

          
<Form style={{ textAlign: "center" }}>

<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Warning!</ModalHeader>
          <ModalBody>
          Debe ingresar todos los campos.
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
          <Label for="exampleDatetime">Birthday</Label>
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
    onChange={this.handleInputChange}
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
<Link className="btn btn-primary" onClick={this.handleRegisterClick}>Send</Link>

</Form>

        )}

}




export default RegisterScreen;