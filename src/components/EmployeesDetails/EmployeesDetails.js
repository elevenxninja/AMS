import React from 'react';
import { Link} from 'react-router-dom';

import classes from './EmployeesDetails.css';


const EmployeesDetails = (props) =>{

    const employees = props.employeesList.map(empl =>{
        return (
                <tr key={empl.name}>
                    <td><Link to="/user-profile">{empl.name}</Link></td>
                    <td>{empl.designation}</td>
                    <td><span><button 
                    onClick={() => props.clickedSms(empl.name, empl.email)}>
                        SEND SMS
                        </button></span> 
                        <span><button
                        onClick={() => props.clickedMail(empl.name, empl.email)}>
                            SEND EMAIL
                        </button></span></td>
                </tr>
        )
    })
    return(
        <div>
            <div className={classes.EmployeesDetails}>
            <table>
                <thead>
                    <tr>
                        <th>Name/Username</th>
                        <th>Designation</th>
                        <th><span>Send SMS</span> <span>Send EMAIL</span></th>
                    </tr>
                </thead>
                <tbody>
                        {employees}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><button>SEND TO ALL</button></td>
                    </tr>
                </tfoot>
                </table>
            </div>
        </div>
    );
}

export default EmployeesDetails;