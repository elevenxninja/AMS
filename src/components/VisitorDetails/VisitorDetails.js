import React from 'react';

import classes from './VisitorDetails.css'

const VisitorDetails = (props) =>{
    
            let updatedLogs = props.logs.map(log=>{

        return (
            <tr key={log.id}>
                <td>{log.name}</td>
                <td>{log.mobile}</td>
                <td>{log.meetingwith}</td>
                <td>{log.companyname}</td>
                <td>{new Date(log.date).toLocaleDateString()}</td>  
            </tr>
        )
    })
    
    return(
        <div>
            <div className={classes.Logs}>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Meeting With</th>
                        <th>Company Name</th>
                        <th>Meeting Date</th>
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

export default VisitorDetails;