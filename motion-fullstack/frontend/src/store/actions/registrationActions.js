import Axios from '../../axios';
import { SIGNUP, SIGNUP_ERROR, VERIFICATION_ERROR } from "../actionTypes";
import { setError } from './errorActions';

export const signUpSuccess = email => {
  return {
    type: SIGNUP,
    payload: email
  }
};

export const signUpError = error => {
  return {
    type: SIGNUP_ERROR,
    payload: error
  }
};

export const signUpAction = email => async (dispatch) => {
  try {
    const response = await Axios.post('auth/registration/', { email: email });
    await dispatch(signUpSuccess(email))
    return response
  } catch (e) {
    await dispatch(signUpError(e.response.data.email[0]));
    return e.response
  };
};

export const verificationError = errors => {
  return {
    type: VERIFICATION_ERROR,
    payload: errors
  }
};

export const registrationVerificationAction = data => async (dispatch) => {
  try {
    const response = await Axios.patch('auth/registration/validation/', { ...data });
    return response
  } catch (e) {
    // Network Error
    if (!e.response) {
      await dispatch(setError(e.message));
      return e;
    };
    let errors = {};
    // cleaning up error messages from backend - getting rid of nested array's.
    for (let key of Object.keys(e.response.data)) {
      errors[key] = e.response.data[key].join(' ');
    };
    await dispatch(verificationError(errors));
    return e.response;
  };
};
