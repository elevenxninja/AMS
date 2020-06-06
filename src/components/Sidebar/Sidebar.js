import React from 'react';
import { NavLink } from 'react-router-dom';
import { GoDashboard, GoServer } from "react-icons/go";

import classes from './Sidebar.css';

const Sidebar = () =>{
    return(
        <div className={classes.Sidebar}>
            <div>
                <NavLink to='#' className={classes.Active}>
                    <GoDashboard size='40px'/>
                    <p>
                        DASHBOARD
                    </p>
                </NavLink>
            </div>
            <div>
                <NavLink to='#'>
                <GoServer size='40px'/>
                    <p>
                        LOGS
                    </p>
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;