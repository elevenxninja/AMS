import React from 'react';

import classes from './About.css';
import Sidebar from '../../components/Sidebar/Sidebar';

class About extends React.Component{
    render(){
        return(
            <div>
                <Sidebar />
                <div className={classes.About}>
                    <header>
                        <h2>About</h2>
                    </header>
                </div>
            </div>
        );
    }
}

export default About;