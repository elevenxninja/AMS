import React from 'react';

import classes from './IndividualsUserLogs.css';
import { AiOutlineClose } from 'react-icons/ai';

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
                        <div className={classes.Close}>
                            <AiOutlineClose onClick={props.closeUser}/>    
                        </div>           
                        <h4>Filters by:</h4>
                        <div>
                            <div>
                                <label>From Date</label>
                                <input type="date" onChange={props.fromDate}/>
                            </div>
                            <div>
                                <label>To Date</label>
                                <input type="date" onChange={props.toDate}/>
                            </div>
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