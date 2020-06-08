import React from 'react';
import axios from 'axios';

import classes from './EmployeesList.css';
import EmployeesDetails from '../../components/EmployeesDetails/EmployeesDetails';
import Pagination from '../../components/Pagination/Pagination';
import Search from '../../components/Search/Search';
import AddEmployees from '../AddEmployee/AddEmployee';
import Sidebar from '../../components/Sidebar/Sidebar';

class EmployeesList extends React.Component{
    state = {
        filter:'',
        currentPage: 1,
        displayItemPerPage:8,
        employeesList:[]
    }

    componentDidMount(){
        axios.get('https://ams-api.herokuapp.com/getAllEmployees')
        .then(response =>{
            this.setState({
                employeesList: response.data,
            })
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
                            'department' : elementRaw[3],
                            'emp_id' : elementRaw[4],
                            'employee_type' : elementRaw[5]
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

    render(){
        const { filter, employeesList } = this.state;
        const lowercasedFilter = filter.toLowerCase();
        const filteredData = employeesList.filter(item => 
            item.name.toLowerCase().includes(lowercasedFilter)
            );

        const indexOfLastItem = this.state.currentPage * this.state.displayItemPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.displayItemPerPage;
        const currnetItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
        return(
            <div>
                <Sidebar />
                <Search value={filter} changed={this.searchHandler}/>
                <div className={classes.EmployeesList}>
                    <header>
                        <h2>All Employees List</h2>
                    </header>
                    <AddEmployees clicked={(files)=> this.handleUploadedFiles(files)}/>
                    <EmployeesDetails employeesList={currnetItems} 
                    clickedSms={(name, email) => this.sendSmsHandler(name, email)}
                    clickedMail={(name, email) => this.sendEmailHandler(name, email)}/>
                    <Pagination totalItems={this.state.employeesList.length} 
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