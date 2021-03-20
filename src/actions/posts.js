import * as api from "../api"
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKEPOST } from "../constants/actionTypes"


// Actions Creators
export const getPosts = () => async (dispatch) => {
    try {
        const {data} = await api.fetchPosts()
        dispatch({ type: FETCH_ALL, payload: data })
    } catch (error) {
        console.log(error)
    }
}

// Actions because its async has to return a function, the first one recives the post and the second one the dispatch function -> you can use the first argument in the second function
export const createPost = (post) => async (dispatch) => {
    try {
        // Calls the api using axios and creates a post
        const {data} = await api.createPost(post)
        // Dispatches the action to the reducer in order to update the store -> type is the action dispatched and in the payload yo have the actual data that is being update
        dispatch({ type: CREATE, payload: data })    
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({ type: DELETE, payload: id})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: LIKEPOST, payload : data })
    } catch (error) {
        console.log(error)
    }
}