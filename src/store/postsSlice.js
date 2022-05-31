import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newPosts: false,
    postPage: false,
    editPost: '',
    posts: [],
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            // console.log(action.payload)
            state.posts = [ ...action.payload ];
            state.newPosts = false;
            state.editPost = ''
        },
        setNewPosts : (state, action) => {
            state.newPosts = action.payload
        },
        setPostPage: (state, action) => {
            state.postPage = action.payload
        },
        setEditPost: (state, action) => {
            state.editPost = action.payload
        }
    }
})

export const { setPosts, setNewPosts, setPostPage, setEditPost } = postsSlice.actions 
export default postsSlice.reducer