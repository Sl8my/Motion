import Axios from '../../axios';
import { LOGIN, LOGIN_ERROR, LOGOUT } from "../actionTypes";

export const login = (token, user) => {
    return {
        type: LOGIN,
        payload: {
            token,
            user
        }
    }
};

export const LoginError = error => {
    return {
        type: LOGIN_ERROR,
        payload: error
    }
};

export const logout = () => {
    return {
        type: LOGOUT
    }
};

export const loginAction = ({ email, password }) => async (dispatch) => {
    try {
        const response = await Axios.post('auth/token/', { email, password });
        console.log("LOGIN ACTION RES", response);

        const token = response.data.access;
        const user = response.data.user
        if (token) {
            dispatch(login(token, user)); // send the token to the reducer
            localStorage.setItem('token', token); // set the token in localStorage
        }
        return response
    } catch (e) {
        dispatch(LoginError('The credentials are not valid'));
        return e
    }
};
