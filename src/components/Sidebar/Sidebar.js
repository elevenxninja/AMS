import React from 'react';
import { NavLink } from 'react-router-dom';
import { GoDashboard, GoServer } from "react-icons/go";

import classes from './Sidebar.css';

const Sidebar = () =>{
    return(
        <div className={classes.Sidebar}>
            <div>
                <NavLink to='/employees-list' activeClassName={classes.Active}>
                    <GoDashboard size='40px'/>
                    <p>
                        CONTACTS
                    </p>
                </NavLink>
            </div>
            <div>
                <NavLink to='/logs' activeClassName={classes.Active}>
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