import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLogin: false,
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionTypes.LOGIN_SUCCESS:
            return{
                ...state,
                isLogin: true,
            }
        case actionTypes.LOGIN_FAIL:
            return{
                ...state,
                isLogin: false,
            }
        default:
            return{
                state,
            }
    }
}

export default reducer;