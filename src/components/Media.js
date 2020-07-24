import React from 'react';

const Media = (props) => {
    if (props.url.includes("youtube")){
        return(
            <div>
                <iframe src = {props.url} title="Youtube" height="100%" width="100%" allowFullScreen>
                    <p> Your Web browser does not support Iframes </p>
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