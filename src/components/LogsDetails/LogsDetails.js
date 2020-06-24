import React from 'react';

import classes from './LogsDetails.css'

const LogsDetails = (props) =>{
    let logs = props.logs.map(log=>{
        return (
            <tr key={log.name}>
                <td onClick={() =>props.clicked(log)}>{log.username}</td>
                <td>{log.mobile}</td>
                <td><span>{log.status === 'IN' ? log.timestamp : null}</span> 
                <span>{log.status === 'OUT' ? log.timestamp : null}</span></td>
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
                        <th><span>In-Timestamp</span> <span>Our-Timestamp</span></th>
                    </tr>
                </thead>
                <tbody>
                        {logs}
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