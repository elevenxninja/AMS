import React from 'react';

import classes from './IndividualsUserLogs.css';
import { AiOutlineClose } from 'react-icons/ai';

const IndividualsUserLogs = (props) =>{

    let formatAMPM = (date) =>{
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours < 10 ? '0'+hours : hours
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        seconds = seconds < 10 ? '0'+seconds : seconds;
        let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
        return strTime;
      }

      let dateFormat = (date) =>{
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        month = month +1;
        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day : day;
        let actualDate = day + '/' + month + '/' + year;
        return actualDate;
      }
    
    let filterAttendance = [...props.userLog];
    if(props.fromDateVal !== null && props.toDateVal !== null){
        filterAttendance = filterAttendance.filter(attend=>{
        return  attend.in_time >=Date.parse(props.fromDateVal) && 
        attend.out_time<= Date.parse(props.toDateVal) + 86400000
        })
    }
    if(props.toDateVal){
        filterAttendance = filterAttendance.filter(attend=>{
            return attend.in_time<= Date.parse(props.toDateVal) + 86400000
        })
    }
    if(props.fromDateVal){
        filterAttendance = filterAttendance.filter(attend=>{
            return attend.out_time >=Date.parse(props.fromDateVal)
        })
    }
    let userName = null;
       let attendance = filterAttendance.map(attend=>{
           userName = attend.username;
            return <tr>
                <td>Yes</td>
                <td>{dateFormat(new Date(parseInt(attend.in_time)))}</td>
                <td>
                    <span>{formatAMPM(new Date(parseInt(attend.in_time)))}</span>
                    <span>{formatAMPM(new Date(parseInt(attend.out_time)))}</span>
                </td>
            </tr>
    })

    return(
        <div className={classes.UserLogs}>
            <div className={classes.Filters}>
                        <div className={classes.Close}>
                            <AiOutlineClose onClick={props.closeUser}/>    
                        </div>           
                        <h4>Filters by:</h4>
                        <div>
                            <div>
                                <label>From Date:</label>
                                <input type="date" onChange={props.fromDate}/>
                            </div>
                            <div>
                                <label>To Date:</label>
                                <input type="date" onChange={props.toDate}/>
                            </div>
                        </div>
            </div>
            <div className={classes.Attendance}>
                <h3>
                    {userName}
                </h3>
                <table>
                    <thead>
                        <tr>
                            <th>Present</th>
                            <th>Date</th>
                            <th>
                                <span>Entry Time</span>
                                <span>Exit Time</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

export default IndividualsUserLogs;