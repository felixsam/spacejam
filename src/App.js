import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from  './components/Home'
import About from './components/About'
import Asteroids from './components/asteroids/Asteroids';
import Donki from './components/donki/Donki';
import Rover from './components/rover/Rover';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          
          <Navbar/>
          <Route exact path='/' component={Home}/>
          <Route path='/about' component={About}/>
          <Route path='/asteroids' component ={Asteroids}/>
          <Route path='/donki' component={Donki}/>
          <Route path='/rover' component={Rover}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
