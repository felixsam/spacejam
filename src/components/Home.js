import React, { Component } from 'react'

import Apod from './apod/Apod';

class Home extends Component{
  render(){
    return (

        <div>
          <h2> NASA SpaceJam Home Page </h2>
          <Apod></Apod>
          
        </div>
      );
    
  }

}

export default Home