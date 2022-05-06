import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    postId: ''
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.postId = action.payload
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.postId = ''
        }
    }
})

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer