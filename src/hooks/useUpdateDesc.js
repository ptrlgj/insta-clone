import React from 'react'
import { useDispatch } from 'react-redux';
import { updateDocument } from '../firebase';
import { showAlert } from '../store/alertSlice';
import { setEditPost } from '../store/postsSlice';

export const useUpdateDesc = (post, newDesc) => {
    const dispatch = useDispatch()
    
    return async () => {
        try {
            await updateDocument('posts', post.id, {
                desc: newDesc,
            })
            dispatch(setEditPost(''));
            dispatch(showAlert({type: 'success', message: 'Post has been succesfully edited'}))
        } catch (error) {
            dispatch(showAlert({type: 'error', message: error.message}))
        }
  }
}
