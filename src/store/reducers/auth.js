import * as actionTypes from '../actions/actionTypes';
import { act } from 'react-dom/test-utils';

const initialState = {
    isLogin: false,
    userInfo:null,
    error:null,
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionTypes.LOGIN_SUCCESS:
            return{
                ...state,
                isLogin: true,
                userInfo: action.info,
            }
        case actionTypes.LOGIN_FAIL:
            return{
                ...state,
                isLogin: false,
                error: action.err,
            }
        case actionTypes.LOGOUT:
            return{
                ...state,
                isLogin: false,
                userInfo: null,
            }
        default:
            return{
                state,
            }
    }
}

export default reducer;