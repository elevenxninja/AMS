import React from 'react';
import ReactFileReader from 'react-file-reader';

import { BsBuilding } from "react-icons/bs";
import {FaPlus, FaUser, FaUserFriends, FaUserCircle } from "react-icons/fa";
import { GoMail } from 'react-icons/go';
import { FiPhone, FiFile } from 'react-icons/fi';

import classes from './AddEmployee.css';
import Popup from '../../components/UI/Popup/Popup';
import Input from '../../components/UI/Input/Input';

class AddEmployee extends React.Component{
    state = {
        isAddEmpOption: false,
        isPopup: false,
        empForm:{
            Name:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Name'
                },
                validation:{
                    required: true,
                },
                valid:false,
                value:'',
            },
            company:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Company'
                },
                validation:{
                    required: true,
                },
                valid:false,
                value:'',
            },
            jobTitle:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Job title'
                },
                validation:{
                    required: true,
                },
                valid:false,
                value:'',
            },
            email:{
                elmType:'input',
                elmConfig:{
                    type:'email',
                    placeholder:'Email'
                },
                valid:false,
                validation:{
                    required: true,
                },
                value:'',
            },
            phone:{
                elmType:'input',
                elmConfig:{
                    type:'number',
                    placeholder:'Phone'
                },
                validation:{
                    required: true,
                },
                valid:false,
                value:'',
            },
            notes:{
                elmType:'textarea',
                elmConfig:{
                    type:'number',
                    placeholder:'Purpose',
                },
                validation:{
                    required: true,
                },
                valid:false,
                value:'',
            },
        },
        isValidate:false
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

    changedEmpHandler = (event, identifier) =>{
        const formObj = {...this.state.empForm}
        formObj[identifier].value = event.target.value;
        formObj[identifier].valid= this.checkValidtyHandler(formObj[identifier].value, formObj[identifier].validation);
        let isFormValid = true;
        for(let key in formObj){
            isFormValid = formObj[key].valid && isFormValid;
        }
        this.setState({
            empForm: formObj,
            isValidate: isFormValid
        })
        console.log(this.state.isValidate);
    }

    checkValidtyHandler = (value, rules) =>{
        let isValid = true;
        if(rules.required){
            isValid = value !== '' && isValid;
        }
        return isValid;
    }

    submitHandler = () =>{
        let empDetails =[];
        let empForm = {...this.state.empForm};
        for(let key in empForm){
            empDetails.push({
                key: empForm[key].value
            })
        }
        console.log(empDetails);
    }

    render(){
        let empFormArray = [];
        for(let key in this.state.empForm){
            empFormArray.push({...this.state.empForm[key], id:key})
        }
        let empInput = 
                    <form onSubmit={this.submitHandler}>
                        {empFormArray.map(empVal=>{
                            return <Input elmType={empVal.elmType} 
                            elmConfig={empVal.elmConfig} 
                            key={empVal.id}
                            changed={(event) =>this.changedEmpHandler(event, empVal.id)}/>
                        })}
                        <button 
                        onClick={this.hidePopUpHandler}
                        >Cancel</button>
                        <button 
                        disabled={!this.state.isValidate}
                        type="submit"
                        >Save</button>
                    </form>


        let popUp = null;
        if(this.state.isPopup){
            popUp = <Popup>
                <div className={classes.FormCard}>
                    <FaUserCircle/>
                    <BsBuilding />
                    <GoMail />
                    <FiPhone />
                    <FiFile />
                    <h4>Create new contact</h4>
                    {empInput}
                </div>
                </Popup>
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