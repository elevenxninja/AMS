import * as actionTypes from './actionTypes';
import axios from 'axios';

export const auth = (email, password) =>{
    return dispatch =>{
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNnmuNyChtrPMW28Oj2Y8wqVYOkZQXZlo', authData)
        .then(res=>{
            console.log(res.data)
            localStorage.setItem('token', res.data.idToken)
            dispatch(loginSuccess())
        })
        .catch(err=>{
            dispatch(loginFail())
        })
    }
}

export const loginSuccess = () =>{
    return{
        type: actionTypes.LOGIN_SUCCESS
    }
}

export const loginFail = () =>{
    return{
        type: actionTypes.LOGIN_FAIL
    }
}

export const authAutoCheck = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(loginFail())
            console.log('fail')
        }
        else{
            console.log('pass')
            dispatch(loginSuccess())
        }
    }
}

export const logOut = () =>{
    return dispatch =>{
        localStorage.removeItem('token');
        dispatch(loginFail())
    }
}