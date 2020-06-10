import React from 'react';
import axios from 'axios';

import classes from './ManageGuards.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Search from '../../components/Search/Search';
import AddGuard from './AddGuard/AddGuard';
import GuardDetails from '../../components/GuardDetails/GuardDetails';
import Pagination from '../../components/Pagination/Pagination';

class ManageGuards extends React.Component{
    state={
        filter:'',
        guardList:[],
        toggle:false,
        currentPage:1,
        dispalyItemsPerPage:2,
    }

    componentDidMount(){
        axios.get('https://ams-api.herokuapp.com/getAllEmployees')
        .then(response =>{
            this.setState({
                guardList: response.data,
            })
        })
    }

    toggleHandler = (value) =>{
        this.setState({
            toggle: !value
        })
    }

    nextHandler = () =>{
        this.setState((prevState)=>({
            currentPage: prevState.currentPage + 1,
        }))
    }

    prevHandler = () =>{
        this.setState((prevState)=>({
            currentPage: prevState.currentPage - 1,
        }))
    }

    clickedHandler = (num) =>{
        this.setState({
            currentPage: num,
        })
    }

    itemsControlHandler = (e) =>{
        let value = e.target.value;
        if(value <= 1){
            value = 1;
        }
        this.setState({
            dispalyItemsPerPage: value,
        })
    }

    searchHandler = (e) =>{
        this.setState({
            filter: e.target.value
        })
    }

    render(){
        const {currentPage, dispalyItemsPerPage, guardList, filter} = this.state;

        const lowerFilter = filter.toLowerCase();
        const filterArray = guardList.filter(item=>{
           return item.name.toLowerCase().includes(lowerFilter);
        }) 

        const indexOfLastItem = currentPage * dispalyItemsPerPage;
        const indexOfFirstItem = indexOfLastItem - dispalyItemsPerPage;
        const currentLists = filterArray.slice(indexOfFirstItem, indexOfLastItem);


        return(
            <div>
                <Sidebar/>
                <Search 
                changed={this.searchHandler}
                value={this.state.filter}/>
                <div className={classes.ManageGuards}>
                        <header>
                            <h2>Manage Guards</h2>
                        </header>
                <AddGuard />
                <GuardDetails 
                value={this.state.toggle}
                toggle = {(value)=>this.toggleHandler(value)}
                guardList={currentLists}/>
                <Pagination 
                changed = {this.itemsControlHandler}
                clicked = {(num)=>this.clickedHandler(num)}
                prev={this.prevHandler}
                next={this.nextHandler}
                crntPage={this.state.currentPage}
                itemsPerPage={this.state.dispalyItemsPerPage}
                totalItems={this.state.guardList.length}/>
                </div>
            </div>
        );
    }
}

export default ManageGuards;