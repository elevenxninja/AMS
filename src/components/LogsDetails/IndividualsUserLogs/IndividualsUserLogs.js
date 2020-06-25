import React from 'react';

import classes from './IndividualsUserLogs.css';
import { AiOutlineClose } from 'react-icons/ai';

const IndividualsUserLogs = (props) =>{
    console.log('userLog')
    console.log(props.userLog)
    let attendance= props.userLog.map(attend=>{
        console.log(attend.date)
            return (<p><span>Yes</span>
            <span>{new Date(parseInt(attend.date)).toLocaleDateString()}</span></p>)
    })

    let filterAttendance = props.userLog
    .filter(attend=> attend.date >=Date.parse(props.fromDateVal) && 
        attend.date<= Date.parse(props.toDateVal) + 86400000)
    if(props.fromDateVal && props.toDateVal){
        attendance = filterAttendance.map(attend=>{
            return (<p><span>Yes</span>
            <span>{new Date(parseInt(attend.date)).toLocaleDateString()}</span></p>)
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