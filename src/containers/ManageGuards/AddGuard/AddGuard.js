import React from 'react';

import ReactFileReader from 'react-file-reader';
import { FaPlus, FaUserFriends, FaUser } from 'react-icons/fa';

import classes from './AddGuard.css';
import Popup from '../../../components/UI/Popup/Popup';
import Input from '../../../components/UI/Input/Input';

class AddGuard extends React.Component{
    state = {
        isGuardOption:false,
        isPopup:false,
    }

    toggleAddGuardHandler = () =>{
        this.setState((prevState)=>({
            isGuardOption: !prevState.isGuardOption,
        }))
    }

    popUpHandler = () =>{
        this.setState({
            isPopup:true,
        })
    }

    render(){
        let popup = null;
        if(this.state.isPopup){
            popup = (<Popup>
                <form>
                    <input type='text' placeholder='no'/>
                </form>
            </Popup>)
        }

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
            <div className={classes.AddGuard} onClick={this.toggleAddGuardHandler}>
                {popup}
                <div className={classes.AddGuardButton}>
                    <FaPlus />
                    Add Guard
                </div>
                <div>
                    {addGuard}
                </div>
            </div>
        );
    }
}

export default AddGuard;