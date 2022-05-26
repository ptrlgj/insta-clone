import { configureStore } from "@reduxjs/toolkit";
import modalReducer from './modalSlice'
import userReducer from './userSlice'
import postsReducer from './postsSlice'
import alertReducer from './alertSlice'
export const store = configureStore({
    reducer: {
        modal: modalReducer,
        user: userReducer,
        posts: postsReducer,
        alert: alertReducer,
    },
});