import React, { Component } from 'react'
import SearchAsteroid from './SearchAsteroid'
import BrowseAsteroids from "./BrowseAsteroids";
class Asteroids extends Component{

  render(){
      return (
        <div>
          <div>
              <BrowseAsteroids/>
          </div>

            <div>
                <SearchAsteroid />
            </div>
        </div>
      )
  }


}

export default Asteroids