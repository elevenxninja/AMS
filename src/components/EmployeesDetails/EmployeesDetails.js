import React from 'react';

import classes from './EmployeesDetails.css';


const EmployeesDetails = (props) =>{

    const employees = props.employeesList.map(empl =>{
        return (
                <tr key={empl.id}>
                    <td>{empl.id}</td>
                    <td 
                    onClick={()=>props.clicked(empl)}>{empl.name}</td>
                    <td>{empl.designation}</td>
                    <td>
                        {/* <span><button 
                    onClick={() => props.clickedSms(empl.name, empl.email)}>
                        SEND SMS
                        </button></span> 
                        <span><button
                        onClick={() => props.clickedMail(empl.name, empl.email)}>
                            SEND EMAIL
                        </button></span> */}
                        {empl.mobile}
                        </td>
                    <td>
                        <button onClick={()=>props.clickedDelete(empl.id)}>Delete</button>
                    </td>
                </tr>
        )
    })
    return(
        <div>
            <div className={classes.EmployeesDetails}>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name/Username</th>
                        <th>Designation</th>
                        <th>Mobile</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                        {employees}
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

export default EmployeesDetails;