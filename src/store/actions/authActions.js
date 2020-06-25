import axios from 'axios'; 
import * as actionTypes from './actionTypes'; 

const API_KEY= "AIzaSyDUAtjF0Tc-VfW4-mY_bRmSuWO3AZ5BBac";

export const authStart = () =>{
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) =>{
    return {
        type: actionTypes.AUTH_SUCCESS, 
        idToken: token, 
        userId: userId
    }
}

export const authFailed = (error) =>{
    return {
        type: actionTypes.AUTH_FAILED, 
        error: error
    }
}


export const authAction = (email, password, isSignup) =>{

    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email, 
            password: password,
            returnSecureToken: true
        }

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
       
       if(!isSignup){
           url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
        }

        axios.post(url, authData)
        .then(response =>{
            dispatch(authSuccess(response.data.idToken, response.data.localId))
        })
        .catch(error =>{
            dispatch(authFailed(error.response.data.error))
        })
    }
}   