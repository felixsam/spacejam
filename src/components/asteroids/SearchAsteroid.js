import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class SearchAsteroid extends Component{

  state = {
    items: [],
    isLoaded: false,
    asteroid_id: null
  }

  key = process.env.REACT_APP_NASA_API_KEY


  fetchData = (e) => {
    e.preventDefault();
    console.log('form submitted ' + this.state.asteroid_id);
    this.url = 'https://api.nasa.gov/neo/rest/v1/neo/' + this.state.asteroid_id + '?api_key=' + this.key
    fetch(this.url)
    .then(this.handleErrors)
    .then(res => res.json())
    .then(json =>{
      this.setState({
        isLoaded: true,
        items: json,
      })
    })
    .catch(error => alert(error))
  
  }

   handleErrors = (response) =>{
    if (!response.ok) {
      let responsetext = " ";
      if (response.status === 404 || response.status === 405){
        responsetext = " Method not allowed";
      }
        console.log("Error: " + response.status + responsetext);
        throw Error(response.status + responsetext);
    }
    return response;
  } 


  //Change Asteroid ID
  handleChangeAsteroidId = (e) => {
    this.setState({
      asteroid_id: e.target.value
    });
  }

  render(){
      const styleButton = {
        margin: 20,
          };

    var { isLoaded, items } = this.state;

    //Check if Asteroid is a potential hazard
    let hazardous = "no";
    if (items.is_potentially_hazardous_asteroid === true){
      hazardous = "yes";
    }

    if (!isLoaded){
      return(
        <div>

          <div className="container">
              <h4 className="center">Search Asteroids</h4>
              <p>Search Asteroid By ID (Example: 3542519)</p>
          </div>

          <div>
            <form onSubmit={this.fetchData}>
                <TextField type="text" label="Asteroid ID" onChange={this.handleChangeAsteroidId}>
                </TextField>
                <Button type="button" style={styleButton}  size="large"  variant="contained" color="primary">Search</Button>
            </form>
          </div>

        </div>
      );
    }else{
      return (
        <div>

          <div className="container">
            <h5 className="center">Asteroid Search</h5>
            <p>Search Asteroid By ID (Example: 3542519)</p>
          </div>


          <div>
            <form onSubmit={this.fetchData}>
                <TextField type="text" label="Asteroid ID" onChange={this.handleChangeAsteroidId}>
                </TextField>
                    <Button style={styleButton} type="button" variant="contained" color="primary">Search</Button>
            </form>
          </div>

          <div>
              <h5>Search Results</h5>
              <ul>
                {
                  <li key = {items.id}>
                    <div>Asteroid Name: {items.name} </div>
                    <div>Full Link:  <a href={items.nasa_jpl_url} target="_blank" rel="noopener noreferrer">{items.nasa_jpl_url} </a></div>
                    <div>Asteroid ID: {items.id}</div>
                    <div>Potentially Hazardous Asteroid? {hazardous}</div>
                  </li>
                }
              </ul>
          </div>

        </div>
      );
    }

  }
  
}

export default SearchAsteroid