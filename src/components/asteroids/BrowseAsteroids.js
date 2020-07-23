import React, {useEffect, useState} from 'react'
import {Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'


import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  button:{
    margin:10,
  },
  table:{
    marginTop:10,
    marginLeft: 100,
    marginRight: 100,
  }
}));


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


//Create DATA Asteroid
function createAsteroid(name, id, hazardous,magnitude,diameter,orbital_data){
  let isHazardous = "No";

  let orbital_Data = {
    ID: 'N/A', 
    FirstObservationDate: 'N/A', 
    LastObservationDate: 'N/A', 
    OrbitType: 'N/A'};


  let diameter_km = {
    min: 'N/A',
    max: 'N/A'
  };

  if (diameter != null){
    diameter_km = {
      min: diameter.kilometers.estimated_diameter_min,
      max: diameter.kilometers.estimated_diameter_max
    };
  }

  if (hazardous == true){
    isHazardous = "Yes";
  }

  if (orbital_data != null){
    orbital_Data = {
      ID: orbital_data.orbit_id,
      FirstObservationDate: orbital_data.first_observation_date,
      LastObservationDate: orbital_data.last_observation_date,
      OrbitalPeriod: orbital_data.orbital_period};
  }

  return {
      name,
      id,
      isHazardous,
      magnitude,
      diameter_km,
      orbitalData : [orbital_Data]
  };
}

function RowAsteroid(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.id}</TableCell>
        <TableCell align="center">{row.magnitude}</TableCell>
        <TableCell align="center">{row.isHazardous}</TableCell>
        <TableCell align="center">{row.diameter_km.min.toPrecision(3)} to {row.diameter_km.max.toPrecision(3)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Orbital Data
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Orbital ID</TableCell>
                    <TableCell align ="center">First Observation Date</TableCell>
                    <TableCell align="center">Last Observation Date</TableCell>
                    <TableCell align="center">Orbit Period (Days)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orbitalData.map((orbitalRow) => (
                    <TableRow key={orbitalRow.ID}>
                      <TableCell component="th" scope="row">
                        {orbitalRow.ID}
                      </TableCell>
                      <TableCell align="center">{orbitalRow.FirstObservationDate}</TableCell>
                      <TableCell align="center">{orbitalRow.LastObservationDate}</TableCell>
                      <TableCell align="center">
                        {orbitalRow.OrbitalPeriod}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



const BrowseAsteroids = () => {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [previous_page] = useState([]);
  let key = process.env.REACT_APP_NASA_API_KEY;
  let url = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=' + key
  let next_page = null;
  let current_page = null;

  useEffect( () =>{


    fetch(url)
    .then((response) => response.json())
    .then(json =>{
      setItems(json);
      setLoaded(true);
    });

  },[url]);


  const handleErrors = (response) =>{
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


  const fetchData = (e,direction) => {
    e.preventDefault();
    console.log('current url: ' + current_page);
    console.log('new url: ' + next_page);
    if (direction == 'next'){
      url = next_page;
      console.log('pushing current page:' + current_page);
      previous_page.push(current_page);
      //setPreviousPage(previous_page);
      console.log(previous_page);
    }else{
      url = previous_page[previous_page.length - 1];
      if (previous_page.length == 0){

          alert("This is the first page");
          return;
      }else{
        previous_page.pop();
      }
    }
    fetch(url)
    .then(handleErrors)
    .then(res => res.json())
    .then(json =>{
      setItems(json);
    })
    .catch(error => alert(error));
  
  }



  if (!isLoaded){
    return(
    <div>
      <p> Loading . . . </p>
    </div>
    );
  }

  let entries = items.near_earth_objects;
  
  const asteroid_links = items.links;

  current_page=asteroid_links.self;
  next_page=asteroid_links.next;


  let asteroid_rows = [];



  //Create Asteroids
  for (let i = 0; i < entries.length; i++){
    console.log("New Create Asteroid");
    let item = entries[i];
    let asteroid =  createAsteroid(item.name,
      item.id,
      item.is_potentially_hazardous_asteroid,
      item.absolute_magnitude_h,
      item.estimated_diameter,
      item.orbital_data
      );
    asteroid_rows.push(asteroid);
  }
  
  console.log("Printing asteroid Rows: " + asteroid_rows);


  return (
    
        <div>


        <div className="container">
          <h4 className="center">Asteroids</h4>
          <p>This page shows the NASA API for NeoW</p>
        </div>

      <div className={classes.table}>
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Asteroid Name</TableCell>
            <TableCell align="center">Asteroid ID</TableCell>
            <TableCell align="center">Magnitude</TableCell>
            <TableCell align="center">Hazardous?</TableCell>
            <TableCell align="center">Estimated Diameter&nbsp;(km)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {asteroid_rows.map((row) => (
            <RowAsteroid key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </div>

          <Button type="button" variant="contained" color="primary" onClick = {
            (e) => fetchData(e,'last')}>
            Previous Page
          </Button>
          <Button className={classes.button} type="button" variant="contained" color="primary" onClick={(e) => fetchData(e,'next')}>
            Next Page
          </Button>
      </div>
  );

};


export default BrowseAsteroids; 