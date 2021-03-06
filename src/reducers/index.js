import { combineReducers } from 'redux'
import posts from './posts'
import auth from './auth'

// You can create one file for each component that may dispatch actions and combine them in the index
// Reducers always return the updated store
export default combineReducers({
    posts,
    auth,
})