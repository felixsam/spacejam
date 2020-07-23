import React, { Component } from 'react'

import Apod from './apod/Apod';

class Home extends Component{
  render(){
    return (

        <div>
          <h1> NASA Picture of the Day </h1>
          <Apod></Apod>
          
        </div>
      );
    
  }

}

export default Home