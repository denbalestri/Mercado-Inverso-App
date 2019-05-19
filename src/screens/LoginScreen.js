import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, FormFeedback, FormText,Alert,Spinner } from 'reactstrap';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody } from 'reactstrap';
import {Link} from 'react-router-dom'
import {GET_USER} from '../constants/Endpoints'
import axios from 'axios'
import firebase from './../firebase';
import './../styles/style.css'
import logo from './../Images/logo2.png';
import {connect} from "react-redux";
class LoginScreen extends Component{
 
    constructor(props) {
        super(props);
        
        this.state = {
            //isLoading: false,
            form: { email: "", password: "" },
            isValid: true,
            wrong:false,
            msgWrong:'',
            loading:false,
        };

        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
    }

    handleLoginClick () {
    //CHEQUEAR QUE EXISTA EL USUARIO
     this.setState({loading:true})   
    firebase
    .auth()
    .signInWithEmailAndPassword(this.state.form.email,this.state.form.password)
    .then(user=>{
        
        console.log(user)
         if(user.user.emailVerified){

            this.setState({loading:false}) 
                axios.post(GET_USER + 'check', this.state.form)
                .then(response => {
                    //console.log(response);
                    if (response.data === false) {
                    
                        this.setState({ isValid: false });
                        
                        
                    } else if(response.data.length!=0 && response.data.rol_id==1){    
                    //   console.log(response.data)
                        //comerciante
                        this.props.AddUser(response.data);
                        return this.props.history.push('/HomeScreen')
                        
                    }
                    else{
                        //proveedor
                        return this.props.history.push('/TenderScreen')
                    }
                })
            }
            else{
                this.setState({wrong:true})
                this.setState({msgWrong:"Email wasn't verified, check your Inbox!"})
                this.setState({loading:false}) 
            }
            
     })
    .catch(error=>{
      console.log(error)
     this.setState({wrong:true})
     this.setState({msgWrong:error.message})
     this.setState({loading:false}) 
    })
        
    }


  

    handleEmailInput(e) {
        this.setState({
            form: {
                ...this.state.form,
                email: e.target.value
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


<Alert color="danger" style={{display: this.state.wrong ? 'block' : 'none' ,}}>
                     {this.state.msgWrong}
                      </Alert>
        <div className="row" >
            
            <div className="col-12 " style={{display: 'flex', justifyContent: 'center',marginTop: "10%",}} >
           
                 <div className="col-6" style={{backgroundColor:'white'}}>
                 <img src={logo} alt="Logo" style={{width: '250px',margin:'0 auto',display:'block'}} />
                 

                    <Form style={{ textAlign: "center"}}> 
                        <FormGroup>
                            <Label for="username" >Email</Label>
                            <Input onChange={this.handleEmailInput}/>
                            <FormFeedback></FormFeedback>
                            <FormText>Write your Email.</FormText>
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
                    
                    
                    <Link className="btn btn-primary" onClick={this.handleLoginClick} style={{display: this.state.loading ? 'none' : 'inline-block',width: '150px'}}>Login</Link>
                    <Link className="btn btn-primary" to="/RegisterScreen" style={{display: this.state.loading ? 'none' : 'inline-block',marginLeft:'4%',width: '150px'}}>Sign up</Link>
                    <Spinner  color="primary" style={{display: this.state.loading ? 'block' : 'none',margin:' 0 auto'}}/>
                    
                </Form>
             </div>
             
         </div>
     </div>
  </div>

      
        
    )
    
    
    }
    
    
    }


   
    
    let mapDispatchToProps = (dispatch) => {
        return {
            AddUser: (data) => {
                dispatch({type: 'FETCH_USER', payload: data})
            }
        }
    }
    

  
    
    export default connect(null,mapDispatchToProps)(LoginScreen);