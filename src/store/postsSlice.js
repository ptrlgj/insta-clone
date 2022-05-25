import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newPosts: false,
    postPage: false,
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
        },
        setNewPosts : (state, action) => {
            state.newPosts = action.payload
        },
        setPostPage: (state, action) => {
            state.postPage = action.payload
        }
    }
})

export const { setPosts, setNewPosts, setPostPage } = postsSlice.actions 
export default postsSlice.reducer