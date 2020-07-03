import React from 'react';
import axios from 'axios';

import classes from './Visitor.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Input from '../../components/UI/Input/Input';
import AllVisitors from './AllVisitors/AllVisitors';

import { BsBuilding } from "react-icons/bs";
import { FaUserCircle, FaBusinessTime } from "react-icons/fa";
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
                onfocus:'text',
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
                onfocus:'text',
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
                onfocus:'text',
                value:'',
                valid:false,
            },
            date:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Select date'
                },
                validation:{
                    required:true,
                },
                onfocus:'date',
                value:'',
                valid:false,
            },
            time:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Select time'
                },
                validation:{
                    required:true,
                },
                onfocus:'time',
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
                    length: 10,
                },
                onfocus:'number',
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
                    check: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                },
                onfocus:'email',
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
        isFormOpn: true,
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
        if(rules.check){
            isValid = rules.check.test(value) && isValid;
        }
        if(rules.length){
            isValid = value.length === 10  && isValid;
            }
        return isValid;
    }

    openVisitorHandler = () =>{
        this.setState({
            isFormOpn: false
        })
    }

    backToFormHandler = () =>{
        this.setState({
            isFormOpn: true
        })
    }

    submitHandler = (e) =>{
        e.preventDefault();
        const visitorObj = {};
        const visitorInfo = {...this.state.formInput};
        for(let key in visitorInfo){
                visitorObj[key] = visitorInfo[key].value
        }
        axios.post('https://ams-api.herokuapp.com/addVisitor', null, {params:visitorObj})
        .then(res=>{
            console.log('res')
            console.log(res)
            let input = {...this.state.formInput};
            for(let key in input){
                input[key].value = '';
            }
            this.setState({
                formInput: input,
                isValidate: false,
            })
        }
            )
    }

    render(){
        const visitorFormArray = [];
        for(let key in this.state.formInput){
            visitorFormArray.push({...this.state.formInput[key], id:key})
        }
        const visitorInput = <form onSubmit={this.submitHandler}>
            {visitorFormArray.map(input=>{
            return <Input key={input.id}
            onfocus={input.onfocus}
            changed={(event)=>this.inputChangeHandler(event, input.id)}
            value={input.value}
            elmType={input.elmType}
            elmConfig={input.elmConfig}/>
        })}
        <button type='submit' disabled={!this.state.isValidate}>Save</button>
        </form>
        const form = (
            <div className={classes.Visitor}>
                    <header>
                        <h2>Issue Visitor Pass</h2>
                    </header>
                    <div className={classes.FormCard}>
                        <FaUserCircle/>
                        <BsBuilding />
                        <FaBusinessTime />
                        <FiPhone />
                        <FiFile />
                        <h4>Create new contact</h4>
                        {visitorInput}
                    </div>
                    <h3 onClick={this.openVisitorHandler}>View All Visitor</h3>
                </div>
        )
        return(
            <div>
                <Sidebar />
                {this.state.isFormOpn ? form : <AllVisitors backToForm={this.backToFormHandler}/> }
              
            </div>
        );
    }
}

export default Visitor;