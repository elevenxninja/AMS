import React from 'react';

import ReactFileReader from 'react-file-reader';
import {FaPlus, FaUser, FaUserFriends, FaUserCircle, FaRegAddressCard } from "react-icons/fa";
import { BsBuilding } from 'react-icons/bs';
import { FiPhone} from 'react-icons/fi';

import classes from './AddGuard.css';
import Popup from '../../../components/UI/Popup/Popup';
import Input from '../../../components/UI/Input/Input';

class AddGuard extends React.Component{
    state = {
        isGuardOption:false,
        isPopup:false,
        guardForm:{
            name:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Name',
                },
                validation:{
                    required:true,
                },
                value:'',
                valid:false,
            },
            imei_no:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'IMEI No.',
                },
                validation:{
                    required:true,
                },
                value:'',
                valid:false,
            },
            status:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Status',
                },
                validation:{
                    required:true,
                },
                value:'',
                valid:false,
            },
            email:{
                elmType:'input',
                elmConfig:{
                    type:'email',
                    placeholder:'E-mail'
                },
                validation:{
                    required:true,
                },
                value:'',
                valid:false,
            },
            mobile:{
                elmType:'input',
                elmConfig:{
                    type:'number',
                    placeholder:'Phone',
                },
                validation:{
                    required:true,
                },
                value:'',
                valid:false,
            },
            purpose:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Purpose',
                },
                validation:{
                    required:true,
                },
                value:'',
                valid:false,
            },
        },
        isValidate:false
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

    ChangedHandler = (event, identifier) =>{
        const guard = {...this.state.guardForm};
        guard[identifier].value = event.target.value;
        guard[identifier].valid = this.validateHandler(guard[identifier].value, guard[identifier].validation);
        let formValidate = true;
        for(let key in guard){
            formValidate = guard[key].valid && formValidate;
        }
        this.setState({
            guardForm: guard,
            isValidate: formValidate
        })
    }

    validateHandler = (value, rules) =>{
        let isValid = true;
        if(rules.required){
            isValid = value !== '' && isValid;
        }
        return isValid;
    }

    cancelFormHandler = () =>{
        this.setState({
            isPopup: false,
        })
    }

    guardSubmitHandler = (e) =>{
        e.preventDefault();
        const objGuard = {...this.state.guardForm}
        const guardDetails = {};
        for(let key in objGuard){
            guardDetails[key] = objGuard[key].value;
        }
        console.log(guardDetails)
    }

    render(){
        const GuardInputArray = [];
        for(let key in this.state.guardForm){
            GuardInputArray.push({...this.state.guardForm[key], id:key})
        }
        const GuardInputVal = GuardInputArray.map(guard=>{
            return <Input 
            key={guard.id}
            changed={(event)=>this.ChangedHandler(event, guard.id)}
            value={guard.value}
            elmConfig={guard.elmConfig}
            elmType={guard.elmType}/>
        })
        const GuardForm = (<form onSubmit={this.guardSubmitHandler}>
                {GuardInputVal}
                <button
                onClick={this.cancelFormHandler} 
                >Cancel</button>
                <button 
                disabled={!this.state.isValidate}
                type='submit'>Save</button>
        </form>)
        let popup = null;
        if(this.state.isPopup){
            popup = (<Popup>
                        <div className={classes.FormCard}>
                            <FaUserCircle/>
                            <FiPhone />
                            <FaRegAddressCard />
                            <BsBuilding />
                            <h4>Create new contact</h4>
                            {GuardForm}
                        </div>
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