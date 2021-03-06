import React from 'react';
import axios from 'axios';

import classes from './EmployeesList.css';
import EmployeesDetails from '../../components/EmployeesDetails/EmployeesDetails';
import Pagination from '../../components/Pagination/Pagination';
import Search from '../../components/Search/Search';
import AddEmployees from './AddEmployee/AddEmployee';
import Sidebar from '../../components/Sidebar/Sidebar';
import Popup from '../../components/UI/Popup/Popup';
import Input from '../../components/UI/Input/Input';
import QrCode from '../../components/QrCode/QrCode';

class EmployeesList extends React.Component{
    state = {
        isPopup:false,
        filter:'',
        currentPage: 1,
        displayItemPerPage:8,
        employeesList:[],
        QRCodeData: '',
        UserId:null,
        delId:null,
        email: null,
        userProfileForm:{
            emp_id:{
                elmType:'input',
                label:'Employee ID',
                elmConfig:{
                    type:'text',
                },
                value:''
            },
            name:{
                elmType:'input',
                label:'Name',
                elmConfig:{
                    type:'text',
                },
                value:''
            },
            designation:{
                elmType:'input',
                label:'Designation',
                elmConfig:{
                    type:'text',
                },
                value:''
            },
            email:{
                elmType:'input',
                label:'Email - ID',
                elmConfig:{
                    type:'email',
                    disabled: true,
                },
                value:''
            },
            department:{
                elmType:'input',
                label:'Department',
                elmConfig:{
                    type:'text',
                },
                value:''
            },
            employee_type:{
                elmType:'select',
                label:'Employee Type',
                elmConfig:{
                    options:[
                        {name: 'Permanent', value: 'Permanent'},
                        {name: 'Contractual', value: 'Contractual'}
                ]
                },
                value:''
            },
            mobile:{
                elmType:'input',
                label:'Contact Number',
                elmConfig:{
                    type:'number',
                },
                value:''
            }
        }
    }

    componentDidMount(){
        this.getAllEmployees();
    }

    getAllEmployees = () =>{
        axios.get('https://ams-api.herokuapp.com/getAllEmployees')
        .then(response =>{
            this.setState({
                employeesList: response.data.data,
            })
        })
    }

    qrCodeGenerator = () =>{
        axios.get(`https://ams-api.herokuapp.com/getQrCodeDetails?userid=${this.state.userProfileForm.email.value}`).
        then((data) =>{
            console.log('Qr code ')
        console.log(data.data.data[0])
        let QRDATA = JSON.stringify(data.data.data[0])
        if(data.data.data.length > 0){
            this.setState({QRCodeData : QRDATA})
        }
        }).catch((error) => {
          console.log(error)
        })
       
    }

    changedHandler = (e) =>{
        let val = e.target.value;
        if(e.target.value <=1){
            val = 1;
        }
        this.setState({
            displayItemPerPage: val
        })
    }

    ClickedHandler = (pageNumber) =>{
        this.setState({
            currentPage: pageNumber
        })
    }

    numberUpdateHandler = (num) =>{
        this.setState({
            currentPage: num
        })
    }

    prevHandler = () =>{
        this.setState((prevState)=>({
            currentPage: prevState.currentPage-1,
        }))
    }

    nextHandler = () =>{
        this.setState((prevState)=>({
            currentPage: prevState.currentPage+1,
        }))
    }

    searchHandler = event => {
        this.setState({ filter: event.target.value });
        this.ClickedHandler(1)
      };

      sendSmsHandler = (name, email) =>{
        alert(`Name: ${name}, email: ${email}`)
      }

      sendEmailHandler = (name, email) =>{
        alert(`Name: ${name}, email: ${email}`)
      }

      handleUploadedFiles = files => {
        var reader = new FileReader();
        reader.onload = (e) => {
            let jsonData = reader.result.split('\n');    
            let updatedData = this.state.employeesList;
            let data = [];
            jsonData.forEach((element, index) => {
                if(index) {
                    const elementRaw = element.split(',');
                    console.log(element, index);
                    if(element) {
                        let param = {
                            'name' : elementRaw[0],
                            'email' : elementRaw[1],
                            'mobile' : elementRaw[2],
                            'designation' : elementRaw[3],
                            'department' : elementRaw[4],
                            'emp_id' : elementRaw[5],
                            'employee_type' : elementRaw[6]
                        }
                        data.push(param);
                    }
                }
            });
        updatedData.push(data);
        this.setState({
            employeesList: updatedData,
        })
        }
    }

    hideFormHandler = () =>{
        this.setState({
            isPopup: false,
        })
    }

    userHandler = (user) =>{
        const userVal = {...this.state.userProfileForm}
        userVal.employee_type.value = user.emp_type;
        userVal.emp_id.value = user.emp_id;
        userVal.name.value = user.name;
        userVal.email.value = user.email;
        userVal.mobile.value = user.mobile;
        userVal.designation.value = user.designation;
        userVal.department.value = user.department;
        this.setState({
            userId: user.id,
            isPopup:true,
            userProfileForm: userVal,
        })
        this.qrCodeGenerator();
    }

    changedUserHandler = (e, identifier) =>{
        const userData = {...this.state.userProfileForm}
        userData[identifier].value = e.target.value;
        this.setState({
            userProfileForm: userData,
        })
    }

    submitHandler = (event) =>{
        event.preventDefault();
        if(this.validateInputHandler()){
            const userFormVal = {...this.state.userProfileForm}
            const userObj = {};
            for(let key in userFormVal){
                userObj[key] = userFormVal[key].value
            }
            userObj.id = this.state.userId;
            axios.post('https://ams-api.herokuapp.com/editProfile', null, {params:userObj})
            .then(res=>
                {
                    this.setState({
                        isPopup:false
                    }),
                    this.getAllEmployees()
                })
        }
        else{
            alert('Please fill all the required field')
        }
       
    }

    validateInputHandler = () =>{
        let isEmpty = true;
        const userFormVal = {...this.state.userProfileForm};
        for(let key in userFormVal){
            isEmpty = userFormVal[key].value !== '' && isEmpty;
        }
        return isEmpty;
    }

    deleteConfirm = (id, email) =>{
        this.setState({
            delId: id,
            email: email,
        })
    }

    cancelDeleteHandler = () =>{
        this.setState({
            delId: null,
        })
    }

    deleteEmpHandler = () =>{
        this.deleteQrData();
        this.deleteLoginData();
        this.deleteUserLogsData();
        axios.post('https://ams-api.herokuapp.com/deleteEmployee', null, {params:{id:this.state.delId}})
        .then(res=>
            this.setState({
                delId: null,
            }),
            this.getAllEmployees())
    }

    deleteQrData = () =>{
        axios.post('https://ams-api.herokuapp.com/deleteEmployeeFromQR', null, {params: {username: this.state.email}})
        .then(res=>{
            console.log(res)
        } )
        .catch(err=> console.log(err))
    }

    deleteLoginData = () =>{
        axios.post('https://ams-api.herokuapp.com/deleteEmployeeFromLogin', null, {params: {userid: this.state.email}})
        .then(res=> 
            {
            console.log(res)})
        .catch(err=> console.log(err))
    }

    deleteUserLogsData = () =>{
        axios.post('https://ams-api.herokuapp.com/deleteEmployeeFromUserlogs', null, {params: {email: this.state.email}})
        .then(res=>{
            console.log('delte logs')
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    render(){
        let deletePop = null;
        if(this.state.delId){
            deletePop = (<Popup>
                            <div className={classes.DeleteBox}>
                                <h3>
                                    Are you sure you want to delete this?
                                </h3>
                                <div>
                                    <button onClick={this.deleteEmpHandler}>Yes</button>
                                    <button onClick={this.cancelDeleteHandler}>No</button>
                                </div>
                            </div>
                        </Popup>)
        }

        const  userProfileArray = [];
        for(let key in this.state.userProfileForm){
            userProfileArray.push({...this.state.userProfileForm[key], id:this.state.UserId, inputId:key});
        }
        const userForm = userProfileArray.map(user=>{
            return <Input
                    changed={(event)=>this.changedUserHandler(event, user.inputId)}
                    key={user.inputId}
                    label={user.label}
                    elmType={user.elmType}
                    value={user.value}
                    elmConfig={user.elmConfig}/>
        })

        let popup = null;
        if(this.state.isPopup){
            popup = (<Popup>
                        <div className={classes.FormCard}>
                            <header>
                                <h2>USER PROFILE</h2>
                            </header>
                            <div className={classes.QrWrapper}>
                                <form onSubmit={this.submitHandler}>
                                    {userForm}
                                    <button type='submit'>Save</button>
                                    <button onClick={this.hideFormHandler}>Cancel</button>
                                </form>
                                <QrCode value={this.state.QRCodeData}/>
                            </div>
                        </div>
                    </Popup>)
        }

        const { filter, employeesList } = this.state;
        const lowercasedFilter = filter.toLowerCase();
        const filteredData = employeesList.filter(item => 
            item.name.toLowerCase().includes(lowercasedFilter)
            );

        const indexOfLastItem =this.state.currentPage * this.state.displayItemPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.displayItemPerPage;
        const currnetItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
        return(
            <div>
                {deletePop}
                {popup}
                <Sidebar />
                <Search value={filter} changed={this.searchHandler}/>
                <div className={classes.EmployeesList}>
                    <header>
                        <h2>All Employees List</h2>
                    </header>
                    <AddEmployees 
                    getAllEmployees = {this.getAllEmployees}
                    clicked={(files)=> this.handleUploadedFiles(files)}/>
                    <EmployeesDetails employeesList={currnetItems}
                    clicked={(user)=>this.userHandler(user)} 
                    clickedSms={(name, email) => this.sendSmsHandler(name, email)}
                    clickedDelete ={(id, email)=>this.deleteConfirm(id, email)}
                    clickedMail={(name, email) => this.sendEmailHandler(name, email)}/>
                    <Pagination totalItems={filteredData.length} 
                    itemsPerPage={this.state.displayItemPerPage} 
                    clicked={(pageNumber) =>this.ClickedHandler(pageNumber)} 
                    changed={(e) => this.changedHandler(e)} 
                    prev={this.prevHandler} 
                    next={this.nextHandler}
                    crntPage={this.state.currentPage}/>
                </div>
            </div>
        );
    }
}

export default EmployeesList;