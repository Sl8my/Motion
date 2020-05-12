// import { STORE_POSTS, STORE_USERS } from '../actionTypes';
// import { convertArrayToHashmap } from '../../helpers/converters';

// NOTE: this reducer is NOT used to keep the solutions a bit simpler.
// read this to see benefits of storing your data as dictionaries instead of arrays
// https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape/ 
const initial = {
    posts: {},
    users: {},
    comments: {}
};


// this is the normalized data store for all data (data like posts, or users) 
// whenever you fetch a list of posts, users, comments, store them only here reference them by id in other places
// this prevents the duplication of data. 
// for the sake of simplicity, this was not implemented in the solutions but it is worth reading about the benefits:


export const normalizedDataReducer = (data = initial, action) => {
    switch (action.type) {
        case STORE_POSTS:
            const postsDict = convertArrayToDict(action.payload);
            return { ...data, posts: { ...data.posts, ...postsDict } };
        case STORE_USERS:
            const usersDict = convertArrayToDict(action.payload);
            return { ...data, users: { ...data.users, ...usersDict } };
        default:
            return data;
    }
};
