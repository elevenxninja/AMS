import React from 'react';
import { NavLink } from 'react-router-dom';
import { GoDashboard, GoServer } from "react-icons/go";
import { connect } from 'react-redux';

import { logOut } from '../../store/actions/auth';
import classes from './Sidebar.css';
import  about from '../../Images/about.png'
import  logout from '../../Images/logout.png';
import  analytics from '../../Images/analytics.png';
import  manageGuards from '../../Images/manage guards.png';
import  visitor from '../../Images/visitor.png';
import  logo from '../../Images/FINALSNAP.png';

const Sidebar = (props) =>{
    return(
        <div className={classes.Header}>
            <header>
                <img src={logo} alt='logo'/>
                <h2>SNAP</h2>
            </header>
            <div className={classes.Sidebar}>
                <div>
                    <NavLink to='/employees-list' activeClassName={classes.ActiveI}>
                        <GoDashboard size='35px'/>
                        <p>
                            CONTACTS
                        </p>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/logs' activeClassName={classes.ActiveI}>
                    <GoServer size='35px'/>
                        <p>
                            LOGS
                        </p>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/visitor-pass' activeClassName={classes.Active}>
                        <img src={visitor} alt='visitor'/>
                        <p>
                            VISITOR <br/>
                            PASS
                        </p>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/analytics' activeClassName={classes.Active}>
                        <img src={analytics} alt='visitor'/>
                        <p>
                            ANALYTICS
                        </p>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/manage-guards' activeClassName={classes.Active}>
                        <img src={manageGuards} alt='visitor'/>
                        <p>
                            MANAGE <br/>
                            GUARDS
                        </p>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/about' activeClassName={classes.Active}>
                        <img src={about} alt='visitor'/>
                        <p>
                            ABOUT
                        </p>
                    </NavLink>
                </div>
                <div onClick={props.onLogout}>
                    {/* <NavLink to='/'> */}
                        <img src={logout} alt='visitor'/>
                        <p>
                            LOGOUT
                        </p>
                    {/* </NavLink> */}
                </div>
            </div>
        </div>
        );
}

const mapDispatchToProps = dispatch =>{
    return{
        onLogout: () =>dispatch(logOut())
    }
}

export default connect(null, mapDispatchToProps)(Sidebar);