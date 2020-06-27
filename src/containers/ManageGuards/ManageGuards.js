import React from 'react';
import axios from 'axios';

import classes from './ManageGuards.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Search from '../../components/Search/Search';
import AddGuard from './AddGuard/AddGuard';
import GuardDetails from '../../components/GuardDetails/GuardDetails';
import Pagination from '../../components/Pagination/Pagination';
import Popup from '../../components/UI/Popup/Popup';
import Input from '../../components/UI/Input/Input';

class ManageGuards extends React.Component{
    state={
        isGuardPopup:false,
        filter:'',
        guardList:[],
        toggle:false,
        currentPage:1,
        dispalyItemsPerPage:2,
        delId:null,
        individualGuard:{
            name:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Name',
                },
                label:'Name',
                value:'',
            },
            imei_no:{
                elmType:'input',
                elmConfig:{
                    type:'number',
                    placeholder:'IMEI No.',
                },
                label:'IMEI No.',
                value:'',
            },
            status:{
                elmType:'input',
                elmConfig:{
                    type:'text',
                    placeholder:'Status',
                },
                label:'Status',
                value:'',
            },
            mobile:{
                elmType:'input',
                elmConfig:{
                    type:'number',
                    placeholder:'Phone',
                },
                label:'Phone',
                value:'',
            },
            email:{
                elmType:'input',
                elmConfig:{
                    type:'email',
                    placeholder:'E-mail',
                },
                label:'E-mail',
                value:'',
            },
        },
        guardId:null,
    }

    componentDidMount(){
        this.getAllGuard();
    }

    getAllGuard = () =>{
        axios.get('https://ams-api.herokuapp.com/getAllGuard')
        .then(response =>{
            this.setState({
                guardList: response.data.data,
            })
        })
    }

    toggleHandler = (value, imei) =>{
        axios.post('https://ams-api.herokuapp.com/updateGuardStatus', null, {params: {imei: imei, status: !value}} )
        .then(res=>{
            this.getAllGuard();
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

    changedGuardHandler = (e, identifier) =>{
        const guardForm = {...this.state.individualGuard};
        guardForm[identifier].value = e.target.value;
        this.setState({
            individualGuard: guardForm
        })
    }

    deleteConfirm = (id) =>{
        this.setState({
            delId: id,
        })
    }

    cancelDeleteHandler = () =>{
        this.setState({
            delId: null,
        })
    }

    deleteEmpHandler = () =>{
        axios.post('https://ams-api.herokuapp.com/deleteEmployee', null, {params:{id:this.state.delId}})
        .then(res=>
            this.setState({
                delId: null,
            }),
            this.getAllEmployees())
    }

    individualGuardHandler = (guard) =>{
        console.log(guard)
        const guardForm = {...this.state.individualGuard};
        guardForm.name.value = guard.name;
        guardForm.email.value = guard.email;
        guardForm.mobile.value = guard.mobile;
        guardForm.imei_no.value = guard.imei_no;
        guardForm.status.value = guard.status;
        this.setState({
            guardId: guard.id,
            guardForm: guardForm,
            isGuardPopup:true,
        })
    }

    hideGuardHandler = () =>{
        this.setState({
            isGuardPopup: false,
        })
    }

    submitGuardHandler = (e) =>{
        e.preventDefault();
        const guard = {...this.state.individualGuard};
        const guardArray = [...this.state.guardList];
        guardArray.map(grd=>{
            if(this.state.guardId === grd.id){
                grd.name = guard.name.value;
                grd.email = guard.email.value;
                grd.mobile = guard.mobile.value;
                grd.status = guard.status.value;
                grd.imei_no = guard.status.value;
            }
        })
        console.log(guardArray);
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

        const {currentPage, dispalyItemsPerPage, guardList, filter} = this.state;

        const lowerFilter = filter.toLowerCase();
        const filterArray = guardList.filter(item=>{
           return item.name.toLowerCase().includes(lowerFilter);
        }) 

        const indexOfLastItem = currentPage * dispalyItemsPerPage;
        const indexOfFirstItem = indexOfLastItem - dispalyItemsPerPage;
        const currentLists = filterArray.slice(indexOfFirstItem, indexOfLastItem);

        const individualGuardInputArray = [];
        const individualGuardInput = {...this.state.individualGuard};
        for(let key in individualGuardInput){
            individualGuardInputArray.push({...individualGuardInput[key], id:key})
        }
        const guardInputVal = individualGuardInputArray.map(guard=>{
            console.log(guard.value);
            return <Input
            key={guard.id}
            label={guard.label}
            changed={(e)=>this.changedGuardHandler(e, guard.id)}
            value={guard.value} 
            elmType={guard.elmType}
            elmConfig={guard.elmConfig}/>
        })
        let individualGuardPopup = null;
        if(this.state.isGuardPopup){
            individualGuardPopup = (<Popup>
                        <div className={classes.FormCard}>
                            <header>
                                <h2>USER PROFILE</h2>
                            </header>
                            <form onSubmit={this.submitGuardHandler} >
                            {guardInputVal}
                            <button type='submit'>Save</button>
                            <button onClick={this.hideGuardHandler}>Cancel</button>
                            </form>
                        </div>
                     </Popup>)
        }

        return(
            <div>
                {deletePop}
                {individualGuardPopup}
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
                clicked={(guard)=>this.individualGuardHandler(guard)}
                value={this.state.toggle}
                clickedDelete={(id)=>this.deleteConfirm(id)}
                toggle = {(value, imei)=>this.toggleHandler(value, imei)}
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