import React from 'react';
import { FaUsers } from "react-icons/fa";
import { connect } from 'react-redux';

import classes from './Login.css';
import { auth } from '../../store/actions/auth';

class Login extends React.Component{
    state = {
        userName:'',
        password:'',
    }

    componentDidUpdate(){
        if(this.props.authed){
            this.props.history.push('/employees-list')
        }
    }

    changeUserHandler = (e) =>{
        this.setState({
            userName: e.target.value,
        })
    }

    changePasswordHandler = (e) =>{
        this.setState({
            password: e.target.value,
        })
    }

    submitHandler = (e) =>{
        e.preventDefault();
        this.props.onLogin(this.state.userName, this.state.password);
        // alert(`Name: ${this.state.userName}, Password: ${this.state.password}`)
    }

    render(){
        return(
            <div className={classes.Login}>
                <div className={classes.Company}>
                    <h1>COMPANY PROFILE</h1>
                </div>
                <div className={classes.Form}>
                    <div>
                        <div className={classes.User}>
                            <FaUsers size='150px'/>
                            <div className={classes.Input}>
                                <form onSubmit={this.submitHandler}>
                                    <input type='text' placeholder= 'USER NAME' value={this.state.userName} onChange={this.changeUserHandler}/>
                                    <input type='password' placeholder= '*******' value={this.state.password} onChange={this.changePasswordHandler}/>
                                    <div className={classes.Text}>
                                        <p>Change password</p>
                                        <p>Forgot password</p>
                                    </div>
                                    <button type='submit'>LOGIN</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        authed: state.isLogin,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onLogin: (email, password) =>dispatch(auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);