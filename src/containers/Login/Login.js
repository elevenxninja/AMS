import React from 'react';
import { FaUsers } from "react-icons/fa";

import classes from './Login.css'


class Login extends React.Component{
    state = {
        userName:'',
        password:'',
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

    submitHandler = () =>{
        alert(`Name: ${this.state.userName}, Password: ${this.state.password}`)
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

export default Login;