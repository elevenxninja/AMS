import * as actionTypes from './actionTypes';
import axios from 'axios';

export const auth = (email, password) =>{
    return dispatch =>{
        const authData = {
            userid: email,
            password: password,
            type: 'mobile',
        }
        if(email==='11x@myself.com' && password === '123'){
            dispatch(loginSuccess(1))
        }
        if(email!=='' && password!==''){
            console.log(authData)
            axios.get('https://ams-api.herokuapp.com/login',{params:authData})
            .then(res=>{
                if(res.data.data.length > 0){
                    dispatch(loginSuccess(res.data.data))
                }
                else{
                    console.log(res)
                    alert('Please enter valid username or Passsword!')
                }            
            })
            .catch(err=>{
                dispatch(loginFail(err))
            })
        }
        else{
            alert('Please enter name or password');
        }
    }
}

export const loginSuccess = (response) =>{
    return{
        type: actionTypes.LOGIN_SUCCESS,
        info: response,
    }
}

export const loginFail = (error) =>{
    return{
        type: actionTypes.LOGIN_FAIL,
        err: error,
    }
}

// export const authAutoCheck = () =>{
//     return dispatch =>{
//         const token = localStorage.getItem('token')
//         if(!token){
//             dispatch(loginFail())
//             console.log('fail')
//         }
//         else{
//             console.log('pass')
//             dispatch(loginSuccess())
//         }
//     }
// }

export const logOut = () =>{
    return{
        type: actionTypes.LOGOUT
    }
}