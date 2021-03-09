import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPosts = async () => await axios.get(url);
export const createPost = async (newPost) => {
    return await axios.post(url, newPost)
}
