import React, { useEffect, useState } from 'react'
import { makeStyles} from '@material-ui/core/styles'


import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  accordion: {
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 150,
    marginRight: 150,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Donki = () => {
  const classes = useStyles();

  const[items, setItems] = useState([]);
  const[isLoaded,setLoaded] = useState(false);
  let key = process.env.REACT_APP_NASA_API_KEY;
  let url = 'https://api.nasa.gov/DONKI/notifications?startDate=2014-05-01&endDate=2014-05-08&type=report&api_key=' + key

  useEffect( () => {

    fetch(url)
    .then(handleErrors)
    .then( (response) => response.json())
    .then(json => {
      setItems(json);
      setLoaded(true);
    })
    .catch(error => alert(error));
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

  if (!isLoaded){
    return(
    <div>
      <p> Loading . . . </p>
    </div>
    );
  }


  //MESSAGEBODY PARSING
  for (let i = 0; i < items.length; i++){
    let filtered_string = items[i].messageBody;
    console.log("Filtered String: " + typeof(filtered_string));
    //replace '.' with new line
    filtered_string = filtered_string.replace(/\./g,".\n");
    items[i].messageBody = filtered_string;
  }

  return(
    <div>
      <h3> Database of Notifications, Knowledge, Information (DONKI) </h3>
      <p> Reports from May 01 2014 to May 08 2014</p>


      <div className={classes.accordion}>
        {items.map( item =>
            <Accordion key = {item.messageID}>

              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
              <Typography className={classes.heading}>{item.messageType}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography align = 'center' noWrap='false'>
                  <pre style={{fontFamily: 'inherit'}}>
                    {item.messageBody}
                  </pre>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}

      </div>

    </div>

  );


}



export default Donki