import React from 'react';
import ToggleButton from 'react-toggle-button'

import classes from './GuardDetails.css';

const GuardDetails = (props) =>{
    const guardItems = props.guardList.map(list=>{
    return (<tr>
            <td onClick={()=>props.clicked(list)}>{list.name}</td>
            <td>{list.mobile}</td>
            <td><ToggleButton
  value={ props.value || false }
  onToggle={(value) =>props.toggle(value) } 
/>
            </td>
        </tr>);
    })
        return(
            <div>
                <div className={classes.GuardDetails}>
                <table>
                    <thead>
                        <tr>
                            <th>Name/Username</th>
                            <th>IMEI No.</th>
                            <th>Toggle Button</th>
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
                        </tr>
                    </tfoot>
                    </table>
                </div>
            </div>
        );
}

export default GuardDetails;