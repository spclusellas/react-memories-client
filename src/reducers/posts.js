import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKEPOST } from "../constants/actionTypes"

const reducer = (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload           
        case CREATE:
            // Adds the recived post to the store, which starts as an empty array
            return [...posts, action.payload]
        case UPDATE:
        case LIKEPOST:
            return posts.map(post => post._id === action.payload._id ? action.payload : post)
        case DELETE:
            return posts.filter(post => post._id !== action.payload)
        default:
            return posts
    }
}

export default reducer