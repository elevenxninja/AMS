import React from 'react';

import classes from './IndividualsUserLogs.css';

const IndividualsUserLogs = (props) =>{
    let attendance= props.userLog.attendance.map(attend=>{
            return (<p><span>{attend.Present}</span>
            <span>{attend.date}</span></p>)
    })

    let filterAttendance = props.userLog.attendance
    .filter(attend=> (Date.parse(attend.date) >=Date.parse(props.fromDateVal) && 
        Date.parse(attend.date)<= Date.parse(props.toDateVal)) )
    if(props.fromDateVal && props.toDateVal){
        attendance = filterAttendance.map(attend=>{
            return (<p><span>{attend.Present}</span>
            <span>{attend.date}</span></p>)
    })}

    return(
        <div className={classes.UserLogs}>
            <div className={classes.Filters}>
                        <h4>Filters by:</h4>
                        <div>
                            <button>
                                From Date
                                <input type="date" onChange={props.fromDate}/>
                            </button>
                            <button>
                                To Date
                                <input type="date" onChange={props.toDate}/>
                            </button>
                            <button>Weekly</button>
                            <button>Monthly</button>
                            <button>Designation</button>
                            <button>Name</button>
                            <button>Time</button>
                            <button>Leaves</button>
                        </div>
            </div>
            <div className={classes.Attendance}>
                <h3>
                    {props.userLog.name}
                </h3>
                <p>
                    <span>Present</span>
                    <span>Date</span>
                </p>
                {attendance}
            </div>
        </div>
    );
}

export default IndividualsUserLogs;