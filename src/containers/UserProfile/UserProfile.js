import React from 'react';
import classes from './UserProfile.css';
import Popup from '../../components/UI/Popup/Popup';
import Sidebar from '../../components/Sidebar/Sidebar';
import axios from 'axios';
import {connect} from 'react-redux';

class UserProfile extends React.Component{
    state={
        isPop: false,
        pass: null,
    }

    changePassHandler = () =>{
        this.setState({
            isPop: true,
        })
    }

    changePassCancelHandler = () =>{
        this.setState({
            isPop: false,
        })
    }

    newPassHandler = (e) =>{
        this.setState({
            pass: e.target.value,
        })
    }

    changePasswordHandler = () =>{
        let data = {
            username:this.props.userData[0].userid,
            newPwd:this.state.pass,
            type:this.props.userData[0].type,
        }
        axios.post('https://ams-api.herokuapp.com/updatePassword', null, {params: data})
        .then(res=>{
            console.log('res')
            this.setState({
                isPop: false,
            })
        })
        .catch(err=> console.log(err))
    }

    render(){
           return(
            <div>
                {this.state.isPop ? (<Popup>
                <div className={classes.ChangeBox}>
                    <div>
                        <h3>Change Password</h3>
                    </div>
                    <div>
                        <span>
                            New Password:
                        </span>
                        <span>
                            <input type='text' onChange={this.newPassHandler}/>
                        </span>
                    </div>
                    <div>
                        <button onClick={this.changePasswordHandler}>Submit</button>
                        <button onClick={this.changePassCancelHandler}>Cancel</button>
                    </div>
                </div>
            </Popup>) : null}
        <Sidebar/>
        <div style={{marginTop:'150px', marginLeft:'80px'}}>
            <div style={{backgroundColor:'white', maxWidth: '1000px', margin:'0 auto', borderRadius:'10px'}} className={classes.Profile}>
                <div>
                    <span>Id:</span>
                    <span>{this.props.userData[0].id}</span>
                </div>
                <div>
                    <span>User Id:</span>
                    <span>{this.props.userData[0].userid}</span>
                </div>
                <div>
                    <span>Password:</span>
                    <span><input type='password' disabled value={this.props.userData[0].password} /></span>
                </div>
                <div>
                    <span>Type:</span>
                    <span>{this.props.userData[0].type}</span>
                </div>
                <p onClick={this.changePassHandler}>Change Password</p>
            </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        userData: state.userInfo,
    }
}

export default connect(mapStateToProps)(UserProfile);