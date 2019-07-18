import React, { Component } from 'react';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

import {Link,NavLink,Redirect} from 'react-router-dom'


import axios from 'axios'
import './../styles/style.css';
import {connect} from "react-redux";
import firebase from './../firebase';
import NavBarTrader from './navBarTrader'

const items = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/PedidosYa.jpg',
    
    
  },
  {
    src: 'https://www.infobip.com/assets/uploads/blog/pets-and-go-Converted-02.jpg',
   
  },
  {
    src: 'http://www.agitacion.org/wp-content/uploads/2019/05/Glovo.jpg',
   
  }
];
class HomeScreen extends Component{

  constructor(props) {
    super(props);
    
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    
  }


    
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  
    render(){
   
      

       
    
      const { activeIndex } = this.state;

      const slides = items.map((item) => {
        return (
        
              <CarouselItem
                onExiting={this.onExiting}
                onExited={this.onExited}
                key={item.src}

              >
                <img src={item.src} alt={item.altText} style={{width:'40%',display: 'block',marginLeft:'auto',marginRight:'auto',marginTop:'3%'}} />
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
              </CarouselItem>
           
        );

      });
  
      return (
        <div className="container-home"> 
        <NavBarTrader/>
        
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
        </div>
      );
    }
  }
  
      






  let mapStateToProps = state => {
  console.log(state)
      return {
          user: state.user
        
      }
  }
  
  
  export default connect(mapStateToProps)(HomeScreen);



