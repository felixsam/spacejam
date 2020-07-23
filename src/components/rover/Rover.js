import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {GridList, GridListTile} from '@material-ui/core'
import GridListTileBar from '@material-ui/core/GridListTileBar';

import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';

import Pagination from '@material-ui/lab/Pagination';

import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 100,
        marginRight:100,
        marginBottom:10,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    textField: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    gridList: {
      width: 1400,
      height: 1400,
    },
    toolbar:{
        color: 'red',
        backgroundColor: 'indigo'
    },
    icon:{
        color: 'rgba(255, 255, 255, 0.54)',
    },
    button:{
      margin: 25,
    },
  }));



const Rover = () => {
    const classes = useStyles();

    const [items,setItems] = useState([]);
    const[isLoaded, setLoaded] = useState(false);
    const[page,setPage] = useState(1);
    const[sol,setSol] = useState(1000);
    
    let key = process.env.REACT_APP_NASA_API_KEY;
    let base_url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?'
    let url = base_url
    + 'sol=' + sol
    + '&page=' + page 
    + '&api_key=' + key;
    

    useEffect ( () => {

        fetch(url)
        .then(handleErrors)
        .then((response) => response.json())
        .then(json=>{
            setItems(json);
            setLoaded(true);
        })
        .catch(error => alert(error))
    },[url]);

    const handleChangePage =  (e,newPage) => {
        setPage(newPage);
        console.log("Setting Page to: " + newPage);

        fetchData(e,sol,newPage,key);
      };

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

    function changeURL(baseURL, new_sol, new_page, new_key){
      
      return baseURL + 'sol=' + new_sol  + '&page=' + new_page + '&api_key=' + new_key;
    }

    const handleChange = (e) => {
      console.log("Setting Sol to :" + e.target.value);
      setSol(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("handleSubmit");
      fetchData(e,sol,page,key);
    }

    const fetchData = (e, new_sol, new_page, new_key) =>{
      e.preventDefault();
      console.log('current url: ' + url);
      url = changeURL(base_url,new_sol,new_page,new_key);
      console.log('new url: ' + url);

      console.log("Fetch URL");
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
                <p> Loading ... </p>
            </div>
        );
    }

    //Mars photos
    let photos = items.photos;

    return(
        <div>
            <h3>MARS ROVER PHOTOS</h3>

            <form className={classes.textField} onSubmit={handleSubmit}>
                <TextField
                onChange={handleChange}
                value={sol}
                type="number"
                InputProps={{
                  inputProps: {
                      min: 1,
                      default: sol,
                      shrink:true,
                  }
                }}
                label="sol">
              </TextField>  
              <Button 
                className={classes.button}
                size="large"
                type="button"
                variant="contained"
                color="primary">
                  Change Sol</Button>
            </form>


            <div className={classes.root}>
              <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                  <ListSubheader className={classes.subheader} component="div">Rover Photos</ListSubheader>
                </GridListTile>
                {photos.map((photo) => (
                  <GridListTile key={photo.id}>
                    <img src={photo.img_src} alt={photo.id} />
                    <GridListTileBar
                      title={<span>Photo ID: {photo.id}</span>}
                      subtitle={<span>From: {photo.camera.full_name}</span>}
                      actionIcon={
                        <IconButton aria-label={`info about ${photo.id}`} className={classes.icon} onClick ={() => {alert("Test")}}> 
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>

            <div>
              <Pagination className={classes.toolbar}
              count={20} color="primary" 
              page={page}
              onChange={handleChangePage}/>
            </div>

    </div>
    );

}

export default Rover;