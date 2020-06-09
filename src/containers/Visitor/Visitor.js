import React from 'react';

import classes from './Visitor.css';
import Sidebar from '../../components/Sidebar/Sidebar';

class Visitor extends React.Component{
    render(){
        return(
            <div>
                <Sidebar />
                <div className={classes.Visitor}>
                    <header>
                        <h2>Issue Visitor Pass</h2>
                    </header>
                </div>
            </div>
        );
    }
}

export default Visitor;