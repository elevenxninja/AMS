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
            firstName:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'First name'
                },
                validation:{
                    required: true,
                },
                value:'',
            },
            lastName:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Last name'
                },
                validation:{
                    required: true,
                },
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
                value:'',
            },
            email:{
                elmType:'input',
                elmConfig:{
                    type:'email',
                    placeholder:'Email'
                },
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
                value:'',
            },
            notes:{
                elmType:'textarea',
                elmConfig:{
                    type:'number',
                    placeholder:'Notes',
                },
                validation:{
                    required: true,
                },
                value:'',
            },
        }
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
        let empFormArray = [];
        for(let key in this.state.empForm){
            empFormArray.push({...this.state.empForm[key], id:key})
        }
        let empInput = 
                    <form>
                        {empFormArray.map(empVal=>{
                            return <Input elmType={empVal.elmType} elmConfig={empVal.elmConfig} key={empVal.id}/>
                        })}
                        <button>Cancel</button>
                        <button>Save</button>
                    </form>


        let popUp = null;
        if(this.state.isPopup){
            popUp = <Popup clicked={this.hidePopUpHandler}>
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