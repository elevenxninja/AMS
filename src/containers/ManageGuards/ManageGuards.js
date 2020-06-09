import React from 'react';

import classes from './ManageGuards.css';
import Sidebar from '../../components/Sidebar/Sidebar';

class ManageGuards extends React.Component{
    render(){
        return(
            <div>
                <Sidebar/>
                <div className={classes.ManageGuards}>
                        <header>
                            <h2>Manage Guards</h2>
                        </header>
                </div>
            </div>
        );
    }
}

export default ManageGuards;