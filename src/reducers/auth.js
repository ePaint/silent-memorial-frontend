import {
    LOGOUT,
    LOGIN_FAIL,
    LOGIN_SUCCESS,

    SIGNUP_FAIL,
    SIGNUP_SUCCESS,

    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS,
    
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,    
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload,
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null,
            }
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null,
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            }
        case ACTIVATION_FAIL:
        case ACTIVATION_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
            return state;
        default:
            return state;
    }
}