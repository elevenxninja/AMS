import React from 'react';

import Search from '../../../components/Search/Search';
import classes from './AllVisitors.css';
import Pagination from '../../../components/Pagination/Pagination';
import axios from 'axios';
import VisitorDetails from '../../../components/VisitorDetails/VisitorDetails';

class Logs extends React.Component{
    state = {
        singleUser:[],
        user:null,
        filter:'',
        currentPage:1,
        fromDate:null,
        toDate:null,
        displayItemsPerPage:8,
        visitorLogs:[],
        updatedForm:[],
        fromDateFilter:null,
        toDateFilter:null,
        actualFromFilterDate: null,
        actualToFilterDate: null,
    }

    
    clearAllFiltersHandler = () =>{
        this.setState({
            fromDateFilter: null,
            toDateFilter: null,
            actualToFilterDate: '',
            actualFromFilterDate: '',
        })
    }

    componentDidMount(){
        axios.get('https://ams-api.herokuapp.com/getAllVisitor')
        .then(res=>{
            this.setState({
                visitorLogs: res.data.data,
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

    // Filters logics
    fromDateFilterHandler = (e) =>{
        this.setState({
            fromDateFilter: Date.parse(e.target.value),
            actualFromFilterDate: e.target.value,
        })
    }

    toDateFilterHandler = (e) =>{
        this.setState({
            toDateFilter: Date.parse(e.target.value),
            actualToFilterDate: e.target.value,
        })
    }

    render(){
        let updatedForm = [...this.state.visitorLogs]
        let updatedEmpForm = [];
        if(this.state.visitorLogs.length > 0){
               
        const {filter, userLogs, fromDateFilter, toDateFilter} = this.state;
        const lowerCaseFilter = filter.toLowerCase();
        updatedForm = updatedForm.filter(log=>{
            return log.name.toLowerCase().includes(lowerCaseFilter)
        })

        if(fromDateFilter!==null || toDateFilter!== null){
            if(fromDateFilter){
                updatedForm = updatedForm.filter(log=>{
                    console.log(log.inTime)
                    return Date.parse(log.date) >= fromDateFilter;
                })
            }
    
            if(toDateFilter){
                updatedForm = updatedForm.filter(log=>{
                    return Date.parse(log.date) <= toDateFilter;
                })
            }
    
            if(fromDateFilter!==null && toDateFilter!== null){
                updatedForm = updatedForm.filter(log=>{
                    return Date.parse(log.date) >= fromDateFilter && Date.parse(log.date) <= toDateFilter;
                })
            }
        }

        const {currentPage, displayItemsPerPage} = this.state;
        const indexOfLastItem = currentPage * displayItemsPerPage;
        const indexOfFirstItem = indexOfLastItem - displayItemsPerPage;
        updatedEmpForm = updatedForm.slice(indexOfFirstItem, indexOfLastItem);
        }
        
        return(
            <div>
                <Search changed={(e)=>this.searchHandler(e)}/>
                <div className={classes.Logs}>
                    <header>
                        <h2 onClick={this.props.backToForm}>Back to Form</h2>
                    </header>
                    <div className={classes.Filters}>
                        <div>
                            <h4>Filters by:</h4>
                            <div>
                             <button onClick={this.clearAllFiltersHandler}>Clear All Filters</button>
                            </div>
                        </div>
                        <div className={classes.FiltersDate}>
                            <div>
                                <label>From Date:</label>
                                <input type="date" onChange={this.fromDateFilterHandler} value={this.state.actualFromFilterDate}/>
                            </div>
                            <div>
                                <label>To Date:</label>
                                <input type="date" onChange={this.toDateFilterHandler} value={this.state.actualToFilterDate}/>
                            </div>
                        </div>
            </div>
                    <VisitorDetails 
                    logs={updatedEmpForm}/>
                    <Pagination
                    clicked={(page)=>this.pageHandler(page)}
                    prev={this.prevHandler}
                    next={this.nextHandler}
                    changed={(e)=>this.changedHandler(e)}
                    crntPage={this.state.currentPage}
                    totalItems={this.state.visitorLogs.length} 
                    itemsPerPage={this.state.displayItemsPerPage}/>
                </div>
            </div>
        );
    }
}

export default Logs;