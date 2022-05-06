import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: '',
    userName: '',
    imageUrl: '',
    posts: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    }
})

export default userSlice.reducer
