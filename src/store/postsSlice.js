import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    newPosts: false,
    posts: [],
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = [ ...action.payload ];
            state.newPosts = false;
        },
        setNewPosts : (state, action) => {
            state.newPosts = action.payload
        }
    }
})

export const { setPosts, setNewPosts } = postsSlice.actions 
export default postsSlice.reducer