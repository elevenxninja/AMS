import React from 'react';
import ReactFileReader from 'react-file-reader';

import { FaPlus } from "react-icons/fa";
import { FaUser, FaUserFriends } from "react-icons/fa";

import classes from './AddEmployee.css';
import Popup from '../../components/UI/Popup/Popup';

class AddEmployee extends React.Component{
    state = {
        isAddEmpOption: false,
        isPopup: false,
    }

    AddEmpHandler = () =>{
        this.setState((prevState)=>
            ({
                isAddEmpOption: !prevState.isAddEmpOption,
            })
        )
    }

    popUpHandler = () =>{
        this.setState({
            isPopup: true,
        })
    }

    hidePopUpHandler = () =>{
        this.setState({
            isPopup: false,
        })
    }

    render(){
        let popUp = null;
        if(this.state.isPopup){
            popUp = <Popup clicked={this.hidePopUpHandler}>AddEmployee Popup</Popup>
        }
        let addEmplyOption = null;
        if(this.state.isAddEmpOption){
            addEmplyOption = (<div className={classes.EmpOptionsCard}>
                                <p onClick={this.popUpHandler}><FaUser/> Create a contact</p>
                                <ReactFileReader handleUploadedFiles={(files) =>this.props.clicked(files)} fileTypes={'.csv'}>
                                <button><FaUserFriends/> Create multiple contacts</button>
                                </ReactFileReader>
                            </div>)
        }
        
        return(
            <div className={classes.AddEmployee}>
                {popUp}
                <div className={classes.AddEmpButton} onClick={this.AddEmpHandler}>
                    <FaPlus />
                    Add Employee
                </div>
                <div>
                    {addEmplyOption}
                </div>
            </div>
        );
    }
}

export default AddEmployee;