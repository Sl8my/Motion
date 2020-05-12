import Axios from '../../axios';
import { ADD_POST_TO_LIST, DELETE_POST, FEED_ERROR, STORE_POSTS, SET_ACTIVE_FILTER, LIKE_POST } from "../actionTypes";

export const likePost = (postId, postData) => {
    return {
        type: LIKE_POST,
        payload: { postId, postData }
    }
};


export const storePosts = (namespaceOverride, data) => {
    return {
        type: STORE_POSTS,
        payload: { namespaceOverride, data } // remember: this is a shorthand for { namespaceOverride: namespaceOverride, data: data} 
    }
};


/**
 * changes which posts will be fetched when you dispatch "getPostsAction()"
 * @param {string} filterId the id of the filter you want to activate
 */
export const setActiveFilter = filterId => {
    return {
        type: SET_ACTIVE_FILTER,
        payload: { filterId }
    };
};

export const feedError = error => {
    return {
        type: FEED_ERROR,
        payload: error
    }
};

const addPostToList = (postData) => {
    return {
        type: ADD_POST_TO_LIST,
        payload: { postData }
    }
};

const removePostfromList = (postId) => {
    return {
        type: DELETE_POST,
        payload: { postId }
    }
};


/**
 * Fetch posts from the backend. The API Endpoint that will be used is determined by the activeFilter.
 *  Use the action creator "setActiveFilter" to change the active filter.
 * @param {string} filterIdOverride Override the activeFilter. By default feedReducer.filter.activeFilterId will be used
 */
export const getPostsAction = (filterIdOverride = null) => async (dispatch, getState) => {

    try {
        const state = getState();
        const filter = state.feedReducer.filter.filters[filterIdOverride] || state.feedReducer.filter.getActiveFilter();

        const response = await Axios.get(filter.path);
        let namespaceOverride = filterIdOverride ? (filter.namespace || filter.id) : null;

        // handle edge case where user changes filter tabs while posts were being fetched (resulting in post being stored in wrong place)
        if (filter.id === state.feedReducer.filter.getActiveFilter().id && !filterIdOverride) {
            namespaceOverride = filter.namespace || filter.id;
        }

        dispatch(storePosts(namespaceOverride, response.data));
    } catch (e) {
        dispatch(feedError(e.response));
    };
};


export const createPostAction = data => async (dispatch, getState) => {
    try {
        const response = await Axios.post('/social/posts/', data);
        dispatch(addPostToList(response.data))
        return response
    } catch (e) {
        dispatch(feedError(`Content: ${e.response.data.content.join(' ')}`))
        return e.response
    };
};


export const likePostAction = postId => async (dispatch, getState) => {
    try {
        const response = await Axios.post(`social/posts/toggle-like/${postId}/`);
        if (response.status === 200) {
            dispatch(likePost(postId, response.data));
            return response.data;
        }
    } catch (e) {
        console.error('catch in likePostAction:', e)
    };
};

export const deletePostAction = postId => async (dispatch, useState) => {
    try {
        const response = await Axios.delete(`social/posts/${postId}/`);
        dispatch(removePostfromList(postId))
        return response
    } catch (e) {
        console.error('catch in deletePostAction:', e)
    };
};



// TODO cancel dispatch in getPostsAction if filterId changes while fetch is running. 