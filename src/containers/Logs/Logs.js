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
        user:null,
        isPopup:false,
        filter:'',
        currentPage:1,
        fromDate:null,
        toDate:null,
        displayItemsPerPage:8,
        userLogs:[],
    }

    componentDidMount(){
        axios.get('https://ams-api.herokuapp.com/getAllEmployeesLogs')
        .then(res=>{
            console.log(res.data.data)
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

    popupHandler = (log) =>{
        console.log(log)
        this.setState({
            isPopup: true,
            user: {...log, attendance:[
                {date:'2020-06-18',
                Present: 'yes'},
                {date:'2020-06-19',
                Present: 'yes'},
                {date:'2020-06-20',
                Present: 'yes'},
                {date:'2020-06-21',
                Present: 'yes'},
                {date:'2020-06-22',
                Present: 'yes'},
                {date:'2020-06-23',
                Present: 'yes'},
                {date:'2020-06-24',
                Present: 'yes'},
                {date:'2020-06-25',
                Present: 'yes'},
            ]}
        })
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

    render(){
        let popup = null;
        if(this.state.isPopup){
            popup = (<Popup>
                <IndividualsUserLogs 
                closeUser ={this.closeUserHandler}
                fromDateVal={this.state.fromDate}
                toDateVal={this.state.toDate}
                fromDate={(e) =>this.fromDateHandler(e)}
                toDate={(e)=>this.toDateHandler(e)}
                userLog={this.state.user}/>
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