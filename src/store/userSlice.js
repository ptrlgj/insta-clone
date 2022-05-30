import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSingleDoc } from "../firebase";

export const getActiveUser = createAsyncThunk(
    'user/getActiveUser',
    async (userId) => {
        const user = await getSingleDoc('users', userId);
        // console.log(userId, getState)
        return user;
    }
)
const initialState = {
    loggedIn: false,
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
    settings: {
        darkTheme: false,
    }
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            Object.keys(action.payload).forEach( key => {
                state[key] = action.payload[key]
            })
            state.loggedIn = true;
        },
        logoutUser: (state, action) => {
            Object.keys(state).forEach( key => {
                state[key] = initialState[key]
            })
        },
        changeValue: (state, action) => {
            Object.keys(action.payload).forEach( key => {
                state[key] = action.payload[key]
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
export const {setUser, logoutUser, changeValue} = userSlice.actions
export default userSlice.reducer
