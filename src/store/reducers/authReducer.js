import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    lading: false
}


const authStartHelper = (state, action) =>{

    return updateObject(state,{error: null,loading: true});
}

const authSuccessHelper = (state, action) =>{

    return updateObject(state, {
        loading: false, 
        token: action.idToken,
        userId: action.userId,
        error: null
    });
}

const authFailHelper = (state, action) =>{
    return updateObject(state, {

        error: action.error,
        loading: false

    })
}
const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.AUTH_START: return authStartHelper(state, action);
        case actionTypes.AUTH_SUCCESS:  return authSuccessHelper(state, action); 
        case actionTypes.AUTH_FAILED: return authFailHelper(state, action);
        default: return state;
        
    }
}

export default authReducer;