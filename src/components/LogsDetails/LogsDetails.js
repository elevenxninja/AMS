import React from 'react';

import classes from './LogsDetails.css'

const LogsDetails = (props) =>{

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

    
            let updatedLogs = props.logs.map(log=>{

        return (
            <tr key={log.id}>
                <td onClick={() =>props.clicked(log)}>{log.username}</td>
                <td>{log.mobile}</td>
                <td>{log.email}</td>
                <td>{log.inTime ? dateFormat(new Date(parseInt(log.inTime))) : null}</td>
                <td><span>{log.inTime ? formatAMPM(new Date(parseInt(log.inTime))) : null}</span> 
                <span>{log.outTime ? formatAMPM(new Date(parseInt(log.outTime))) : null}</span></td>  
            </tr>
        )
    })
    
    return(
        <div>
            <div className={classes.Logs}>
            <table>
                <thead>
                    <tr>
                        <th>Name/Username</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th><span>Entry Time</span> <span>Exit Time</span></th>
                    </tr>
                </thead>
                <tbody>
                        {updatedLogs}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
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

export default LogsDetails;