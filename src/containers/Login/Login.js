import React from 'react';
import { FaUsers } from "react-icons/fa";

import classes from './Login.css'


class Login extends React.Component{

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
                                <form>
                                    <input type='text' placeholder= 'USER NAME'/>
                                    <input type='password' placeholder= '*******'/>
                                    <div className={classes.Text}>
                                        <p>Change password</p>
                                        <p>Forgot password</p>
                                    </div>
                                    <button>LOGIN</button>
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