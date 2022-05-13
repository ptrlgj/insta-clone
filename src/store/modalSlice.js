import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    postId: '',
    authorId: ''
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.postId = action.payload.id;
            state.authorId = action.payload.userId;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.postId = '';
            state.authorId = ''
        }
    }
})

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer