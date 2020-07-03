import React from 'react';
import ReactFileReader from 'react-file-reader';
import axios from 'axios';
import {connect} from 'react-redux';

import {FaPlus, FaUser, FaUserFriends, FaUserCircle, FaRegAddressCard } from "react-icons/fa";
import { BsBuilding } from 'react-icons/bs';
import { FiPhone} from 'react-icons/fi';

import classes from './AddEmployee.css';
import Popup from '../../../components/UI/Popup/Popup';
import Input from '../../../components/UI/Input/Input';

class AddEmployee extends React.Component{
    state = {
        isAddEmpOption: false,
        isPopup: false,
        empForm:{
            name:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Name'
                },
                validation:{
                    required: true,
                },
                onfocus:'text',
                valid:false,
                value:'',
            },
            emp_id:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Employee ID'
                },
                validation:{
                    required: true,
                },
                onfocus:'text',
                valid:false,
                value:'',
            },
            employee_type:{
                elmType:'select',
                elmConfig:{
                    type:'text',
                    placeholder:'Please Select',
                    options: [
                        {name:'Employee type', value: ''},
                        {name:'Permanent', value: 'Permanent'},
                        {name:'Contractual', value: 'Contractual'}
                    ]
                },
                validation:{
                    required: true,
                },
                valid: false,
                value: '',
            },
            mobile:{
                elmType:'input',
                elmConfig:{
                    type:'number',
                    placeholder:'Phone'
                },
                valid:false,
                validation:{
                    required: true,
                    length: 10,
                },
                onfocus:'number',
                value:'',
            },
            email:{
                elmType:'input',
                elmConfig:{
                    type:'email',
                    placeholder:'E-mail'
                },
                validation:{
                    required: true,
                    check: true,
                },
                onfocus:'email',
                valid:false,
                value:'',
            },
            designation:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Designation'
                },
                validation:{
                    required: true,
                },
                onfocus:'text',
                valid:false,
                value:'',
            },
            department:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Department',
                },
                validation:{
                    required: true,
                },
                onfocus:'text',
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

    toggleOptionHandler = () =>{
        this.setState((prevState)=>({
            isAddEmpOption: !prevState.isAddEmpOption
        }))
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
    }

    checkValidtyHandler = (value, rules) =>{
        let isValid = true;
        if(rules.required){
            isValid = value !== '' && isValid;
        }
        if(rules.check){
            let lastVal = value.split('@');
            isValid = lastVal[1] === 'nhai.org';
        }
        if(rules.length){
            isValid = value.length === 10;
            }
        return isValid;
    }

    submitHandler = (e) =>{
        e.preventDefault();
        let empDetails ={};
        let empForm = {...this.state.empForm};
        for(let key in empForm){
            empDetails[key] = empForm[key].value
        }
        axios.post('https://ams-api.herokuapp.com/postAddEmployee', null, {params: empDetails})
        .then(res=>{
            const emptyEmp = {...this.state.empForm};
            for(let key in emptyEmp){
                emptyEmp[key].value = '';
            }
            console.log(res.data)
            this.setState({
                isPopup:false,
                empForm: emptyEmp
            })
            this.props.getAllEmployees();
            this.postQrData();
            axios.post('https://ams-api.herokuapp.com/addToLoginMaster', null, {params: 
            {username: empDetails.email,
                pwd: 'nhai@123',
                type: 'mobile',
            }})
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
        })
        .catch(err=>{
            console.log(err)
            this.setState({
                isPopup:false,
            })
        })
    }

    postQrData = () =>{
        let QrObj = {
            emp_name : this.state.empForm.name.value,
            email: this.state.empForm.email.value,
            mobile: this.state.empForm.mobile.value,
            emp_id: this.state.empForm.emp_id.value,
            designation: this.state.empForm.designation.value,
            department: this.state.empForm.department.value,
            emp_type: this.state.empForm.employee_type.value
        }
        console.log('QrObj')
        console.log(QrObj)
        axios.post('https://ams-api.herokuapp.com/postQrCodeData', null, {params: QrObj})
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
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
                            onfocus={empVal.onfocus}
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
                    <FiPhone />
                    <FaRegAddressCard />
                    <BsBuilding />
                    <h4>Create new contact</h4>
                    {empInput}
                </div>
                </Popup>
        }
        let addEmplyOption = null;
        if(this.state.isAddEmpOption){
            addEmplyOption = (<div className={classes.EmpOptionsCard}>
                                <p onClick={this.popUpHandler}><FaUser/> Create a contact</p>
                                <ReactFileReader handleFiles={(files) =>this.props.clicked(files)} fileTypes={'.xlsx'}>
                                {/* <button><FaUserFriends/> Create multiple contacts</button> */}
                                </ReactFileReader>
                            </div>)
        }
        
        return(
            <div className={classes.AddEmployee}>
                {popUp}
                <div onClick={this.toggleOptionHandler}>

                <div className={classes.AddEmpButton} >
                        <FaPlus />
                        Add Employee
                </div>
                <div>
                    {addEmplyOption}
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        userInfo: state.userInfo,
    }
}

export default connect(mapStateToProps)(AddEmployee);