import React, { Component } from 'react';

import { Button } from 'reactstrap';

import {Link} from 'react-router-dom'

import axios from 'axios'
import '../styles/style.css';


class HomeScreen extends Component{


    render(){
    
        return(
   
    <div className="container">
    <div className="row">
    <div className="col-12">
    <Button onClick={() => this.props.history.push('/PostScreen')}  size="lg" block>Publicar necesidad</Button>
    <Button onClick={() => this.props.history.push('/TenderScreen')}  size="lg" block>Ver ofertas recibidas</Button>
  </div>
  </div>
  </div>

        )
    }

}


export default HomeScreen;

