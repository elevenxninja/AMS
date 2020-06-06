import React from 'react';
import { Link } from 'react-router-dom';

import { FaPlus } from "react-icons/fa";

import classes from './AddEmployee.css';

const AddEmployee = () =>{
    return(
        <div className={classes.AddEmployee}>
            <div className={classes.AddEmpButton}>
                <FaPlus />
                Add Employee
            </div>

        </div>
    );
}

export default AddEmployee;