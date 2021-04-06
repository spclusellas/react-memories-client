import axios from "axios";

const API = axios.create({
    baseURL: 'https://spc-mern-memories.herokuapp.com/'
})

API.interceptors.request.use(req => {
    if(localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }

    return req
})
//const url = "https://spc-mern-memories.herokuapp.com/posts";

export const fetchPosts = async () => await API.get('/posts');
export const createPost = async (newPost) => await API.post('/posts', newPost)
export const updatePost = async (id, updatedPost) => await API.patch(`/posts/${id}`, updatedPost)
export const deletePost = async (id) => await API.delete(`posts/${id}`)
export const likePost = async (id) => await API.patch(`posts/${id}/like-post`)

export const signin = (formData) => API.post('/users/signin', formData)
export const signup = (formData) => API.post('/users/signup', formData)