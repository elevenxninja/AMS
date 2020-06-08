import React from 'react';
import { GoSearch } from "react-icons/go";

import classes from './Search.css';



const Header = (props) =>{
    return(
        <div className={classes.Header}>
            <div>
                <input type="text" placeholder='search' value={props.value} onChange={props.changed}/>
                <GoSearch className={classes.Icon}/>
            </div>
        </div>
    );
}

export default Header;