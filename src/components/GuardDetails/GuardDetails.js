import React from 'react';
import ToggleButton from 'react-toggle-button'

import classes from './GuardDetails.css';

const GuardDetails = (props) =>{
    const guardItems = props.guardList.map(list=>{
    const imei = list.imei;
    return (<tr>
            <td>{list.id}</td>
            <td 
            // onClick={()=>props.clicked(list)}
            >{list.name}</td>
            <td>{list.imei}</td>
            <td><ToggleButton
            value={ list.status || false }
            onToggle={(value) =>props.toggle(value, imei) } 
            />
            </td>
            <td>
                <button onClick={()=>props.clickedDelete(list.id, list.email)}>
                    Delete
                </button>
            </td>
        </tr>);
    })
        return(
            <div>
                <div className={classes.GuardDetails}>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name/Username</th>
                            <th>IMEI No.</th>
                            <th>Toggle Button</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                            {guardItems}
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

export default GuardDetails;