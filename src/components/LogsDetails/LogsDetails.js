import React from 'react';

import classes from './LogsDetails.css'

const LogsDetails = (props) =>{
    var newLog = [];
    let logs = props.logs.map(log=>{
        let timestamp = new Date(parseInt(log.timestamp));
        let date = timestamp.getDate();
        let filterLogs = props.logs.filter(filterLog=>{
            let timestampFilter = new Date(parseInt(filterLog.timestamp));
            let dateFilter = timestampFilter.getDate();
            return filterLog.emp_id === log.emp_id && dateFilter === date;
        })
        console.log(filterLogs)
        let logObj = {};
        let mapLogs = filterLogs.map(mapLog=>{
            if(mapLog.status === 'IN'){
                logObj.username = mapLog.username;
                logObj.emp_id = mapLog.emp_id;
                logObj.mobile = mapLog.mobile;
                logObj.inTime = new Date(parseInt(mapLog.timestamp)).toISOString().slice(11, -1);
            }
            if(mapLog.status === 'OUT'){
                logObj.outTime = new Date(parseInt(mapLog.timestamp)).toISOString().slice(11, -1);
            }
            else{
               return null;
            } 
        })
        newLog.push(logObj);
        // console.log(newLog)
    })
            let jsonObject = newLog.map(JSON.stringify); 
      
            // console.log(jsonObject); 
      
            let uniqueSet = new Set(jsonObject); 
            let uniqueArray = Array.from(uniqueSet).map(JSON.parse); 
      
            // console.log(uniqueArray); 
            let updatedLogs = uniqueArray.map(log=>{

        return (
            <tr key={log.id}>
                <td onClick={() =>props.clicked(log)}>{log.username}</td>
                <td>{log.mobile}</td>
                <td><span>{log.inTime}</span> 
                <span>{log.outTime}</span></td>  
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
                        <th><span>In-Timestamp</span> <span>Out-Timestamp</span></th>
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
                    </tr>
                </tfoot>
                </table>
            </div>
        </div>
    );
}

export default LogsDetails;