import { useDispatch } from "react-redux";
import { deleteSingleDoc, updateDocument } from "../firebase";
import { showAlert } from "../store/alertSlice";
import { closeModal } from "../store/modalSlice";
import { setPosts } from "../store/postsSlice";
import { getActiveUser } from "../store/userSlice";

export const useDeletePost = (user, posts, postId) => {
    const dispatch = useDispatch()
    return async () => {
        try {
        await deleteSingleDoc('posts', postId);
        await updateDocument('users', user.id, {
            posts: [ ...user.posts.filter( post => post !== postId)], 
            })
        dispatch(getActiveUser(user.id))
        dispatch(closeModal())
        dispatch(showAlert({type: 'success', message: 'Post has been succesfully deleted'}))
        dispatch(setPosts([ ...posts.filter( post => post.id !== postId)]))
        } catch (error) {
        dispatch(showAlert({type: 'error', message: error.message}))
        }
    }
}
