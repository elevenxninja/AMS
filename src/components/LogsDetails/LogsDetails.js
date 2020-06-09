import React from 'react';

import classes from './LogsDetails.css'

const LogsDetails = (props) =>{
    let logs = props.logs.map(log=>{
        return (
            <tr key={log.name}>
                <td onClick={() =>props.clicked(log)}>{log.name}</td>
                <td>{log.designation}</td>
                <td><span>{log.inTimestamp}</span> <span>{log.outTimestamp}</span></td>
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
                        <th>Designation</th>
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