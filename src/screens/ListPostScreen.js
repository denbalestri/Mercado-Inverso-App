import React, { Component } from 'react';

import { Button, Card, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,Alert} from 'reactstrap';

import {Link} from 'react-router-dom'

import axios from 'axios'
import './../styles/style.css';
import NavBarSupplier from './navBarSupplier'
import {getPosts,getCategories}  from './../request'
import {GET_POST} from '../constants/Endpoints'
import validator from './../validator'
import {connect} from "react-redux";
import imageCard from './../Images/ImageCard.jpg';

class ListPostScreen extends Component{

    constructor(props) {
        super(props);
    
       
        this.state = {

          searchPost:{
          user:'',
          search:'',
          categorySelected:''
          },
          posts: [],
          dropdownOpen: false,
          category:[],
          dataNotFound:false,
          chosenPost:'',

          
        };
        this.toggle = this.toggle.bind(this);
        this.handleSearchInput=this.handleSearchInput.bind(this);
        this.handleCategoriesInput=this.handleCategoriesInput.bind(this);
        this.handleSearchClick=this.handleSearchClick.bind(this);
        this.renderRedirect=this.renderRedirect.bind(this);
       
      }

      handleSearchClick= () => {
       
        axios.post(GET_POST + 'search', this.state.searchPost)
        .then(response => {
         this.setState({posts:response.data})
          if(this.state.posts==''){
            this.setState({dataNotFound:true})
            this.setState({search:''});
            this.setState({categorySelected:''})
          }
          else{
            this.setState({dataNotFound:false})
          }

         })
         
        
        .catch(error => console.log("Error:", error));

      }


      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

      componentWillMount(){
        getPosts(this.props.match.params.id)
        .then(response=>this.setState({posts:response.data}))
       
        getCategories(this.props.match.params.id)
        .then(response=>this.setState({category:response.data}))

       
      }
      handleSearchInput(event) {
              
              this.setState({
                searchPost:{
                  ...this.state.searchPost,
                 search:event.target.value
              }
                  })
                }
             
       handleCategoriesInput(event) {
              
                  this.setState({
                    searchPost:{
                      ...this.state.searchPost,
                     categorySelected:event.target.value
                  }
             })
        } 
            

        renderRedirect = (event) => {
          this.props.setPostid(event.target.value);
          
            return this.props.history.push('/MakeOfferScreen')
          
        }
        
        

      render(){

        return(
<div className="container-listPost" >

<NavBarSupplier/>

            
     <div className="row" >
    
    <div className="col-12 ">
    <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleSearchInput} style={{width:'40%',marginLeft:'30%',marginTop:'3%'}}></input>
   
     <ButtonDropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{marginLeft:'70%',marginTop:'3%'}}>
                    <DropdownToggle caret>
                    Category
                    </DropdownToggle>
                    <DropdownMenu  >
                    
                                      {this.state.category.map((p,i)=>{
                                                return (
                                                    <DropdownItem onClick={this.handleCategoriesInput} value={p.idCategory} key={i}>{p.description}</DropdownItem>
                                                
                                                )
                                              })
                                      }
                    
                    
                    </DropdownMenu>
                </ButtonDropdown>

            <Link className="btn btn-primary" style={{marginTop:'3%'}} onClick={this.handleSearchClick}>Search</Link>
            </div>
            <div className="col-12 " style={{display: 'flex', justifyContent: 'center',marginTop: "3%",}} >
                       
                 <div className="col-8" style={{backgroundColor:'white'}}>
                <Alert color="dark" style={{display: this.state.dataNotFound ? 'inline-block' : 'none',width:'70%',marginLeft:'5%'}}>
                no data, please try again
                </Alert>
                 {this.state.posts.map((p,i)=>{
                                                return (
                    <CardGroup value={p.category}>
                        <Card value={p.user_id} key={i}>
                           
                            <CardBody>
                            <CardTitle>Title: {p.title}</CardTitle>
                            <CardSubtitle>Price: {p.price}</CardSubtitle>
                            <CardSubtitle>Quantity: {p.quantity}</CardSubtitle>
                            <CardText>Description: {p.description}</CardText>
                           
                            <Button color="primary" onClick={this.renderRedirect} value={p.id}>Make a offer</Button>
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
      user: state.user
    
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
      setPostid: (data) => {
          dispatch({type: 'SET_POST_ID', payload: data})
      }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ListPostScreen);