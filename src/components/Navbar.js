import React from 'react';
import { Link, NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className="nav-wrapper blue darken-4">
      <div className="container">
        <Link to="/">NASA SpaceJam</Link>
        <ul className="right">
          <li><Link to="/">Home</Link></li>
          <li><Link to='/asteroids'>Asteroids</Link></li>
          <li><Link to='/donki'>DONKI</Link></li>
          <li><Link to='/rover'>Mars Rover Photos</Link></li>
          <li><NavLink to='/about'>About</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar