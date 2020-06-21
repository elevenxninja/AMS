import React from 'react';
import axios from 'axios';

import classes from './Visitor.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Input from '../../components/UI/Input/Input';

import { BsBuilding } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { GoMail } from 'react-icons/go';
import { FiPhone, FiFile } from 'react-icons/fi';

class Visitor extends React.Component{
    state = {
        formInput:{
            name:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Name'
                },
                validation:{
                    required:true,
                },
                value:'',
                valid:false,
            },
            companyname:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Company'
                },
                validation:{
                    required:true,
                },
                value:'',
                valid:false,
            },
            meetingwith:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Meeting with'
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
                    placeholder:'Email'
                },
                validation:{
                    required:true,
                },
                value:'',
                valid:false,
            },
            timestamp:{
                elmType:'input',
                elmConfig:{
                    type:'time',
                    placeholder:'Time stamp'
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
                    placeholder:'Phone'
                },
                validation:{
                    required:true,
                },
                value:'',
                valid:false,
            },
            purpose:{
                elmType:'textarea',
                elmConfig:{
                    type:'text',
                    placeholder:'Purpose'
                },
                validation:{
                    required:true,
                },
                value:'',
                valid:false,
            },
        },
        isValidate:false,
    }

    inputChangeHandler = (e, identifier) =>{
        const inputForm = {...this.state.formInput};
        inputForm[identifier].value = e.target.value;
        inputForm[identifier].valid = this.validationHandler(inputForm[identifier].value, inputForm[identifier].validation);
        let formValidation = true;
        for(let key in inputForm){
            formValidation = inputForm[key].valid && formValidation
        }
        this.setState({
            formInput: inputForm,
            isValidate: formValidation,
        })
    }

    validationHandler = (value, rules) =>{
        let isValid = true;
        if(rules.required){
            isValid = value !== '' && isValid;
        }
        return isValid;
    }

    submitHandler = (e) =>{
        e.preventDefault();
        const visitorObj = {};
        const visitorInfo = {...this.state.formInput};
        for(let key in visitorInfo){
                visitorObj[key] = visitorInfo[key].value
        }
        axios.post('https://ams-api.herokuapp.com/addVisitor', null, {params:visitorObj})
    }

    render(){
        const visitorFormArray = [];
        for(let key in this.state.formInput){
            visitorFormArray.push({...this.state.formInput[key], id:key})
        }
        const visitorInput = <form onSubmit={this.submitHandler}>
            {visitorFormArray.map(input=>{
            return <Input key={input.id}
            changed={(event)=>this.inputChangeHandler(event, input.id)}
            value={input.value}
            elmType={input.elmType}
            elmConfig={input.elmConfig}/>
        })}
        <button type='submit' disabled={!this.state.isValidate}>Save</button>
        </form>
        return(
            <div>
                <Sidebar />
                <div className={classes.Visitor}>
                    <header>
                        <h2>Issue Visitor Pass</h2>
                    </header>
                    <div className={classes.FormCard}>
                        <FaUserCircle/>
                        <BsBuilding />
                        <GoMail />
                        <FiPhone />
                        <FiFile />
                        <h4>Create new contact</h4>
                        {visitorInput}
                    </div>
                </div>
            </div>
        );
    }
}

export default Visitor;