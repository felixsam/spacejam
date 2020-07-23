import React, { useEffect,useState } from 'react'
import { makeStyles } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Media from '../Media'
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import ApodCardMedia from './ApodCardMedia';
import Modal from 'react-modal'
import {KeyboardDatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const useStyles = makeStyles((theme) => ({
  card:{
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 150,
    marginRight: 150,
  },
  button:{
    margin: 15,
  },
  Media:{
    Height: 140
  },
}));

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const Apod = () => {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [selectedDate,setSelectedDate] = useState(moment().format('YYYY/MM/DD'));
 
  const [modalIsOpen,setIsOpen] = React.useState(false);
  
  console.log("The date is set to: " + date);
  let key = process.env.REACT_APP_NASA_API_KEY;
  let url = 'https://api.nasa.gov/planetary/apod?api_key=' + key + "&date=" + date;

  useEffect ( () => {
    fetch(url)
    .then((response) => response.json())
    .then(json =>{
      setItems(json);
      setLoaded(true);
    });
    
  },[url]);


  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal(){
    setIsOpen(false);
  }


  const handleErrors = (response) =>{
    if (!response.ok) {
      let responsetext = " ";
      if (response.status === 404 || response.status === 405){
        responsetext = " Method not allowed";
      }
      if (response.status == 429){
        responsetext =" Too many Requests";
      }
        console.log("Error: " + response.status + responsetext);
        throw Error(response.status + responsetext);
       
    }
    return response;
  }
  
  
  const fetchData = (e, date) =>{
    e.preventDefault();
    
    console.log("date before conversion: " + date);
    date = moment(date,'YYYY/MM/DD').format('YYYY-MM-DD');
    console.log("date after conversion: " + date);

    let url_with_date = url + "&date=" + date;
    console.log("Fetching data with url: " + url_with_date);

    fetch(url_with_date)
    .then(handleErrors)
    .then(response => response.json())
    .then(json => {
      setItems(json);
      setDate(moment(date,'YYYY-MM-DD').format('YYYY/MM/DD'));
    })
    .catch(error => alert(error));
  }

//Jun 16 1995 Earliest Apod
//1995-6-16 
//Format YYYY-MM-DD for URL
//Format YYYY/MM/DD for DatePicker
  const handleDateChange = (e) => {
    if (e!= null){
      let formatted_date = moment(e,'YYYY/MM/DD').format('YYYY-MM-DD');
      console.log("formatted_date: " + formatted_date);
      setDate(formatted_date);
      setSelectedDate(moment(formatted_date,'YYYY-MM-DD').format('YYYY/MM/DD'));
    }
  }

  if (!isLoaded){
    return(
    <div>
      <p> Loading . . . </p>
    </div>
    );
  }

  return (
    <div>
      <h5> APOD CONTENT </h5>

      <form >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            minDate = "06/16/1995"
            maxDate = {moment()}
            value = {selectedDate}
            label = "Select APOD Date MM/DD/YYYY"
            onChange={handleDateChange}/>
        </MuiPickersUtilsProvider>
        <Button size="large" className={classes.button} type="button" variant="contained" color="primary"
        onClick = {(e) => fetchData(e,selectedDate)}>Search</Button>
      </form>


      <Card className={classes.card}>
              <CardActionArea onClick={openModal}>
                <ApodCardMedia url={items.url} className={classes.media}></ApodCardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Picture of the Day: {items.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {items.explanation}
                </Typography>

                </CardContent>
              </CardActionArea>

              <CardActions>
                <Button size="small" color="primary" onClick={openModal}>
                  Open
                </Button>
              </CardActions>

            </Card>


      <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal">

          <div>
            <Media url={items.url}/>
            <button onClick={closeModal}>close</button>
          </div>

      </Modal>
    </div>
  );


}

 export default Apod;