import React from 'react';

import classes from './Analytics.css';
import Sidebar from '../../components/Sidebar/Sidebar';

class Analytics extends React.Component{
    render(){
        return(
            <div>
                <Sidebar />
                <div className={classes.Analytics}>
                    <header>
                        <h2>Analytics</h2>
                    </header>
                </div>
            </div>
        );
    }
}

export default Analytics;