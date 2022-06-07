import { useDispatch } from 'react-redux';
import { getSingleDoc, updateDocument } from '../firebase';
import { showAlert } from '../store/alertSlice';
import { closeModal } from '../store/modalSlice';

export const useDeleteComment = (postId, commentId) => {
    const dispatch = useDispatch()
    return async () => {
        try {
        const post = await getSingleDoc('posts', postId);
        await updateDocument('posts', postId, {
            comments: [ ...post.comments.filter(comment => (`${comment.author}${comment.createdAt}` !== commentId))]
        })
        dispatch(closeModal())
        dispatch(showAlert({type: 'success', message: 'Comment has been succesfully deleted'}))
        } catch (error) {
        dispatch(showAlert({type: 'error', message: error.message}))
        }
    }
}
