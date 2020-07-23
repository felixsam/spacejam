import React from 'react';

const Media = (props) => {
    if (props.url.includes("youtube")){
        return(
            <div>
                <iframe src = {props.url} title="Youtube" height="50%" width="50%">

                </iframe>
            </div>
        );
    }else{
        return(
            <div height="50%" width="50%">
                <img src = {props.url} alt = "APOD"/>
            </div>
        );
    }
}

export default Media;