import React from 'react';

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
                value:'',
                valid:false,
            },
            company:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Company'
                },
                value:'',
                valid:false,
            },
            jobTitle:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Job title'
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
                value:'',
                valid:false,
            },
            phone:{
                elmType:'input',
                elmConfig:{
                    type:'number',
                    placeholder:'Phone'
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
                value:'',
                valid:false,
            },
        }
    }
    render(){
        const visitorFormArray = [];
        for(let key in this.state.formInput){
            visitorFormArray.push({...this.state.formInput[key], id:key})
        }
        const visitorInput = <form>
            {visitorFormArray.map(input=>{
            return <Input 
            value={input.value}
            elmType={input.elmType}
            elmConfig={input.elmConfig}/>
        })}
        <button type='submit'>Save</button>
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