import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newPosts: false,
    postPage: false,
    loading: false,
    editPost: '',
    posts: [],
    followedPosts: [],
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = [ ...action.payload ];
            state.newPosts = false;
            state.editPost = ''
        },
        setFollowedPosts: (state, action) => {
            state.followedPosts = [ ...action.payload ];
        },
        setNewPosts : (state, action) => {
            state.newPosts = action.payload
        },
        setPostPage: (state, action) => {
            state.postPage = action.payload
        },
        setEditPost: (state, action) => {
            state.editPost = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { setPosts, setFollowedPosts, setNewPosts, setPostPage, setEditPost, setLoading } = postsSlice.actions 
export default postsSlice.reducer