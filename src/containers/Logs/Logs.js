import React from 'react';

import Sidebar from '../../components/Sidebar/Sidebar';
import Search from '../../components/Search/Search';
import classes from './Logs.css';
import LogsDetails from '../../components/LogsDetails/LogsDetails';
import Pagination from '../../components/Pagination/Pagination';
import Popup from '../../components/UI/Popup/Popup';
import IndividualsUserLogs from '../../components/LogsDetails/IndividualsUserLogs/IndividualsUserLogs';
import axios from 'axios';

class Logs extends React.Component{
    state = {
        singleUser:[],
        user:null,
        isPopup:false,
        filter:'',
        currentPage:1,
        fromDate:null,
        toDate:null,
        displayItemsPerPage:8,
        userLogs:[]
    }

    componentDidMount(){
        axios.get('https://ams-api.herokuapp.com/getAllEmployeesLogs')
        .then(res=>{
            this.setState({
                userLogs: res.data.data
            })
        })
        .catch(err=> console.log(err))
    }

    changedHandler = (e) =>{
        this.setState({
            displayItemsPerPage: e.target.value,
        })
    }

    nextHandler = () =>{
        this.setState((prevState)=>({
            currentPage: prevState.currentPage + 1,
        }))
    }

    prevHandler = () =>{
        this.setState((prevState)=>({
            currentPage: prevState.currentPage -1,
        }))
    }

    pageHandler = (page) =>{
        this.setState({
            currentPage: page,
        })
    }

    searchHandler = (e) =>{
        this.setState({
            filter:e.target.value
        })
    }

    opneDatePicker = () =>this._calendar.setOpen(true);

    popupHandler = (logVal) =>{
        axios.get('https://ams-api.herokuapp.com/getSingleEmployeesLogs', {params: {emp_id: logVal.emp_id, mobile: logVal.mobile}})
        .then(res=>{
            this.setState({
                singleUser: res.data.data,
                isPopup: true,
            })
        })
        .catch(err=>console.log(err))
    }

    fromDateHandler = (e) =>{
        this.setState({
            fromDate: e.target.value
        })
    }

    toDateHandler = (e) =>{
        this.setState({
            toDate: e.target.value
        })
    }

    closeUserHandler= () =>{
        this.setState({
            isPopup:false,
        })
    }

    // Filters logics

    render(){
        

        
        var singleUserLog = [];
        let logs = this.state.singleUser.map(log=>{
            let timestamp = new Date(parseInt(log.timestamp));
            let date = timestamp.getDate();
            let filterLogs = this.state.singleUser.filter(filterLog=>{
                let timestampFilter = new Date(parseInt(filterLog.timestamp));
                let dateFilter = timestampFilter.getDate();
                return dateFilter === date;
            })
            console.log(filterLogs)
            let logObj = {};
            let mapLogs = filterLogs.map(mapLog=>{
                if(mapLog.status === 'IN'){
                    logObj.username = mapLog.username;
                    logObj.emp_id = mapLog.emp_id;
                    logObj.mobile = mapLog.mobile;
                    logObj.date =mapLog.timestamp;
                }
                // if(mapLog.status === 'OUT'){
                //     logObj.outTime = new Date(parseInt(mapLog.timestamp)).toISOString().slice(11, -1);
                // }
                else{
                   return null;
                } 
            })
            singleUserLog.push(logObj);
        })
                let jsonObject = singleUserLog.map(JSON.stringify); 
          
                // console.log(jsonObject); 
          
                let uniqueSet = new Set(jsonObject); 
                let uniqueArray = Array.from(uniqueSet).map(JSON.parse); 
        



        let popup = null;
        if(this.state.isPopup){
            popup = (<Popup>
                <IndividualsUserLogs 
                closeUser ={this.closeUserHandler}
                fromDateVal={this.state.fromDate}
                toDateVal={this.state.toDate}
                fromDate={(e) =>this.fromDateHandler(e)}
                toDate={(e)=>this.toDateHandler(e)}
                userLog={uniqueArray}/>
            </Popup>)
        }

        const {filter, userLogs} = this.state;
        const lowerCaseFilter = filter.toLowerCase();
        const updatedForm = userLogs.filter(log=>
            log.username.toLowerCase().includes(lowerCaseFilter)
            )


        const {currentPage, displayItemsPerPage} = this.state;
        const indexOfLastItem = currentPage * displayItemsPerPage;
        const indexOfFirstItem = indexOfLastItem - displayItemsPerPage;
        const updatedEmpForm = updatedForm.slice(indexOfFirstItem, indexOfLastItem);
        
        return(
            <div>
                {popup}
                <Sidebar/>
                <Search changed={(e)=>this.searchHandler(e)}/>
                <div className={classes.Logs}>
                    <header>
                        <h2>User Logs</h2>
                    </header>
                    <div className={classes.Filters}>
                        <h4>Filters by:</h4>
                        <div>
                            <div>
                                <label>From Date</label>
                                <input type="date" onChange={this.fromDateFilter}/>
                            </div>
                            <div>
                                <label>To Date</label>
                                <input type="date" />
                            </div>
                            <div>
                                <label>Designation</label>
                                <select>
                                    <option>
                                        Please select
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label>Department</label>
                                <select>
                                    <option>
                                        Please select
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label>Employee Type</label>
                                <select>
                                    <option>
                                        Please select
                                    </option>
                                </select>
                            </div>
                        </div>
            </div>
                    <LogsDetails 
                    clicked={(log)=>this.popupHandler(log)}
                    logs={updatedEmpForm}/>
                    <Pagination
                    clicked={(page)=>this.pageHandler(page)}
                    prev={this.prevHandler}
                    next={this.nextHandler}
                    changed={(e)=>this.changedHandler(e)}
                    crntPage={this.state.currentPage}
                    totalItems={this.state.userLogs.length} 
                    itemsPerPage={this.state.displayItemsPerPage}/>
                </div>
            </div>
        );
    }
}

export default Logs;