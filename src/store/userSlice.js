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
const initialState = {
    bio: '',
    followed: [],
    followers: 0,
    followersList: [],
    fullName: '',
    image: '',
    likedPosts: [],
    posts: [],
    userName: '',
    id: '',
    uid: '',
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            Object.keys(action.payload).forEach( key => {
                state[key] = action.payload[key]
            })
        },
        logoutUser: (state, action) => {
            Object.keys(state).forEach( key => {
                state[key] = initialState[key]
            })
        }
    },
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
export const {setUser, logoutUser} = userSlice.actions
export default userSlice.reducer
