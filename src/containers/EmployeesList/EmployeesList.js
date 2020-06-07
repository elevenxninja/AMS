import React from 'react';

import classes from './EmployeesList.css';
import EmployeesDetails from '../../components/EmployeesDetails/EmployeesDetails';
import Pagination from '../../components/Pagination/Pagination';
import Header from '../../components/EmployeesDetails/Header/Header';
import AddEmployees from '../AddEmployee/AddEmployee';

class EmployeesList extends React.Component{
    state = {
        filter:'',
        currentPage: 1,
        displayItemPerPage:8,
        employeesList:[
            {name: 'Employee 1',
            email :'abc@gmail.com',
            mobile : 123456, 
            designation: 'Designer'
            },
            {name: 'Employee 2',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'UI'
            },
            {name: 'Employee 3',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'Developer'
            },
            {name: 'Employee 4',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'Designer'
            },
            {name: 'Employee 5',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'UX'
            },
            {name: 'Employee 6',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'Developer'
            },
            {name: 'Employee 7',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'UX'
            },
            {name: 'Employee 8',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'Designer'
            },
            {name: 'Employee 9',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'Designer'
            },
            {name: 'Employee 10',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'UI'
            },
            {name: 'Employee 11',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'Developer'
            },
            {name: 'Employee 12',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'Designer'
            },
            {name: 'Employee 13',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'UX'
            },
            {name: 'Employee 14',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'Developer'
            },
            {name: 'Employee 15',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'UX'
            },
            {name: 'Employee 16',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'Designer'
            },
            {name: 'Employee 17',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'Designer'
            },
            {name: 'Employee 18',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'UI'
            },
            {name: 'Employee 19',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'Developer'
            },
            {name: 'Employee 20',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'Designer'
            },
            {name: 'Employee 21',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'UX'
            },
            {name: 'Employee 22',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'Developer'
            },
            {name: 'Employee 23',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'UX'
            },
            {name: 'Employee 24',
            email :'abc@gmail.com',
            mobile : 123456,
            designation: 'Designer'
            },
        ]
    }

    changedHandler = (e) =>{
        this.setState({
            displayItemPerPage: e.target.value
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
                <Header value={filter} changed={this.searchHandler}/>
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