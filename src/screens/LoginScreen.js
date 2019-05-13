import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody } from 'reactstrap';
import {Link} from 'react-router-dom'
import {GET_USER} from '../constants/Endpoints'
import axios from 'axios'


class LoginScreen extends Component{
 
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            //isLoading: false,
            form: { username: "", password: "" },
            isValid: true,
        };

        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
    }

    handleLoginClick () {
    //CHEQUEAR QUE EXISTA EL USUARIO
    
        axios.post(GET_USER + 'check', this.state.form)
            .then(response => {
                //console.log(response);
                if (response.data === false) {
                   
                    this.setState({ isValid: false });
                    
                    
                } else if(response.data.length!=0 && response.data.rol_id==1){    
                 //   console.log(response.data)
                    //comerciante
                    return this.props.history.push('/HomeScreen')
                    
                }
                else{
                    //proveedor
                    return this.props.history.push('/TenderScreen')
                }
            })
            .catch(error => console.log("Error:", error));
    }


  

    handleUsernameInput(e) {
        this.setState({
            form: {
                ...this.state.form,
                username: e.target.value
            }
        });
    }

    handlePasswordInput(e) {
        this.setState({
            form: {
                
                ...this.state.form,
                password: e.target.value
            }
    });
}

  


    render(){
    
    return(
<div className="container" >
        <div className="row" >
            <div className="col-12 " style={{display: 'flex', justifyContent: 'center',marginTop: "20%"}} >
                 <div className="col-6">
                    <Form style={{ textAlign: "center" }}> 
                        <FormGroup>
                            <Label for="username" >Username</Label>
                            <Input onChange={this.handleUsernameInput}/>
                            <FormFeedback></FormFeedback>
                            <FormText>Write your username.</FormText>
                        </FormGroup>

                        <FormGroup style={{display: this.state.isValid ? 'block' : 'none' }}>
                            <Label for="password" >Password</Label>
                            <Input type="password" name="password" onChange={this.handlePasswordInput}/>
                            <FormFeedback></FormFeedback>
                            <FormText>Write your password.</FormText>
                        </FormGroup>
                
                        <FormGroup  style={{display: this.state.isValid ? 'none' : 'block' }}>
                            <Label for="invalidPassword" >Password</Label>
                            <Input type="password"   className="passwordIncorrect" name="password" invalid onChange={this.handlePasswordInput}/>
                            <FormFeedback>Oh noes! the password or username is wrong!</FormFeedback>
                            <FormText>Please write again.</FormText>
                        </FormGroup>
                    <Link className="btn btn-primary" onClick={this.handleLoginClick}>Login</Link>{' '}
                    

                    <Link className="btn btn-primary" to="/RegisterScreen">Sign up</Link>
                </Form>
             </div>
         </div>
     </div>
  </div>

      
        
    )
    
    
    }
    
    
    }

    

  
    
    export default LoginScreen;