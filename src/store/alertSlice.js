import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alertActive: false, 
    type: '',
    message: ''
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action) => {
            state.alertActive = true;
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
        hideAlert: (state, action) => {
            state.alertActive = false;
            state.type = '';
            state.message = '';
        }
    }
})

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer