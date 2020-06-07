import React from 'react';

import classes from './Popup.css';

const Popup = (props) =>{
    return(
        <div className={classes.Popup} onClick={props.clicked}>
            {props.children}   
        </div>
    );
}

export default Popup;