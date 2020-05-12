import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { signUpReducer } from './registrationReducer'
import { feedReducer } from "./feedReducer";
import { errorReducer } from './errorReducer';
import { usersReducer } from './usersReducer';
import { userProfileReducer } from './userProfileReducer';
// import { normalizedDataReducer } from './normalizedDataReducer';
import { modalReducer } from './modalReducer';


export const rootReducer = combineReducers({
    loginReducer,
    signUpReducer,
    feedReducer,
    errorReducer,
    usersReducer,
    userProfileReducer,
    // normalizedDataReducer,
    modalReducer
});
