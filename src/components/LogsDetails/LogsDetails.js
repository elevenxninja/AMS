import React from 'react';

import classes from './LogsDetails.css'

const LogsDetails = (props) =>{
    
            let updatedLogs = props.logs.map(log=>{

        return (
            <tr key={log.id}>
                <td onClick={() =>props.clicked(log)}>{log.username}</td>
                <td>{log.mobile}</td>
                <td><span>{log.inTime ? new Date(parseInt(log.inTime)).toISOString().slice(11, -1) : null}</span> 
                <span>{log.outTime ? new Date(parseInt(log.outTime)).toISOString().slice(11, -1) : null}</span></td>  
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
                    </tr>
                </tfoot>
                </table>
            </div>
        </div>
    );
}

export default LogsDetails;