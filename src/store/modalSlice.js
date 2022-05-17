import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    postId: '',
    userId: '',
    commentId: '',
    options: {
        postModal: false,
        commentModal: false,
        userModal: false,
        loginModal: false,
    }
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            if(action.payload?.userId) state.userId = action.payload.userId;
            if(action.payload?.id) state.postId = action.payload.id;
            if(action.payload?.commentId) state.commentId = action.payload.commentId
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.postId = '';
            state.userId = '';
            state.commentId = '';
            state.options = initialState.options;
        },
        setOption: (state, action) => {
            state.options = { ...state.options, [action.payload]: true}
        }
    }
})

export const { openModal, closeModal, setOption } = modalSlice.actions;
export default modalSlice.reducer