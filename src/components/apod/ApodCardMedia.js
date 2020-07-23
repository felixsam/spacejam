import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';

const ApodCardMedia = (props) => {
    if (props.url.includes("youtube")){
        return(
            <CardMedia                  
            component = "iframe"
            height = "600"
            src = {props.url}>
            </CardMedia>
        );
    }else{
        return(
            <CardMedia                  
                component = "img"
                alt = "image"
                height = "600"
                src = {props.url}
            title = "Picture of the Day">
        </CardMedia>
        );
    }
}

export default ApodCardMedia;