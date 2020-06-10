import React from 'react';

import ReactFileReader from 'react-file-reader';
import { FaPlus, FaUserFriends, FaUser } from 'react-icons/fa';

import classes from './AddGuard.css';

class AddGuard extends React.Component{
    state = {
        isGuardOption:false,
    }

    AddGuardHandler = () =>{
        this.setState({
            isGuardOption:true,
        })
    }

    render(){
        let addGuard = null;
        if(this.state.isGuardOption){
            addGuard = (<div className={classes.GuardOptionsCard}>
                                <p onClick={this.popUpHandler}><FaUser/> Create a contact</p>
                                <ReactFileReader handleUploadedFiles={(files) =>this.props.clicked(files)} fileTypes={'.csv'}>
                                <button><FaUserFriends/> Create multiple contacts</button>
                                </ReactFileReader>
                            </div>)
        }
        return(
            <div className={classes.AddGuard}>
                {}
                <div className={classes.AddGuardButton} onClick={this.AddGuardHandler}>
                    <FaPlus />
                    Add Employee
                </div>
                <div>
                    {addGuard}
                </div>
            </div>
        );
    }
}

export default AddGuard;