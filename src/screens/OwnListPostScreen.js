import React, { Component } from 'react';

import { Button, Card, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,Alert} from 'reactstrap';

import {Link} from 'react-router-dom'

import axios from 'axios'
import './../styles/style.css';
import HomeScreen from './HomeScreen'
import {getOwnPost}  from './../request'

import validator from './../validator'
import {connect} from "react-redux";


class OwnListPostScreen extends Component{
    constructor(props) {
        super(props);
    
       
        this.state = {
          posts: [],
         
          

          
        };

     this.renderRedirect=this.renderRedirect.bind(this);
    }
    renderRedirect = (event) => {
        this.props.setPostid(event.target.value);
        
          return this.props.history.push('/viewOffersScreen')
        
      }

    componentWillMount(){

        getOwnPost(this.props.user.user_id)
        .then(response=>{
            this.setState({posts:response.data})
         
        })
       
}

      
    render(){

        return(
<div className="container-ownPost" >

<HomeScreen />

            
     <div className="row" >
    
   
  
   
    

         
           
            <div className="col-12 " style={{display: 'flex', justifyContent: 'center',marginTop: "3%",}} >
                       
                 <div className="col-8" style={{backgroundColor:'white'}}>
             
                 {this.state.posts.map((p,i)=>{
                                                return (
                    <CardGroup >
                        <Card value={p.user_id} key={i}>
                           
                            <CardBody>
                            
                            <CardBody>
                            <CardTitle>Title: {p.title}</CardTitle>
                            <CardSubtitle>Price: {p.price}</CardSubtitle>
                            <CardSubtitle>Quantity: {p.quantity}</CardSubtitle>
                            <CardText>Description: {p.description}</CardText>
                           
                            <Button color="primary" onClick={this.renderRedirect} value={p.id}>View Offers</Button>
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
    console.log(state.post)
      return {
          user: state.user,
                    
      }
  }
  
  let mapDispatchToProps = (dispatch) => {
    return {
        setPostid: (data) => {
            dispatch({type: 'SET_POST_ID', payload: data})
        }
    }
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(OwnListPostScreen);

  
