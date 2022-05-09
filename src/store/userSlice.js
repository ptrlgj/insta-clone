import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSingleDoc } from "../firebase";

export const getActiveUser = createAsyncThunk(
    'user/getActiveUser',
    async (dispatch, getState) => {
        const user = await getSingleDoc('users', dispatch);
        // console.log(dispatch, getState)
        return user;
    }
)
const userSlice = createSlice({
    name: 'user',
    initialState: {
        bio: '',
        followed: [],
        followers: 0,
        followersList: [],
        fullName: '',
        image: '',
        likedPosts: [],
        posts: [],
        userName: '',
        id: ''
    },
    reducers: {},
    extraReducers: {
        [getActiveUser.pending]: (state, action) => {
            // console.log('pending')
        },
        [getActiveUser.fulfilled]: (state, action) => {
            // console.log(action.payload)
            for (const key of Object.keys(action.payload)) {
                state[key] = action.payload[key]
            }
        },
        [getActiveUser.rejected]: (state, action) => {
            console.log('rejected')
        }
    }
})

export default userSlice.reducer
