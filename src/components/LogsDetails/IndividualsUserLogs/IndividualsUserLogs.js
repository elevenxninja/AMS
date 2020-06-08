import React from 'react';

import classes from './IndividualsUserLogs.css';

const IndividualsUserLogs = (props) =>{
    return(
        <div className={classes.UserLogs}>
            <div className={classes.Filters}>
                        <h4>Filters by:</h4>
                        <div>
                            <button>From Date</button>
                            <button>To Date</button>
                            <button>Weekly</button>
                            <button>Monthly</button>
                            <button>Designation</button>
                            <button>Name</button>
                            <button>Time</button>
                            <button>Leaves</button>
                        </div>
            </div>
            <div>
                {props.name}
            </div>
        </div>
    );
}

export default IndividualsUserLogs;