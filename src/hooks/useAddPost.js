import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPost, getSingleDoc, updateDocument } from '../firebase';
import { showAlert } from '../store/alertSlice';
import { setPosts } from '../store/postsSlice';
import { getActiveUser } from '../store/userSlice';
import { usePosts } from './usePosts';
import { useUser } from './useUser';

export function useAddPost(imageId, imageUrl, desc) {
    const user = useUser()
    const { posts } = usePosts()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return async () => {
        try {
            const createdPost = await addPost(imageId, user.id, imageUrl, desc);
            await updateDocument('users', user.id, { posts: [...user.posts, createdPost.id] })
            dispatch(getActiveUser(user.id))
            dispatch(showAlert({type: 'success', message: 'New post has been succesfully added'}))
            const createdPostData = await getSingleDoc('posts', createdPost.id)
            dispatch(setPosts([createdPostData, ...posts]))
            navigate('/')
        } catch (error) {
            dispatch(showAlert({type: 'error', message: error.message}))
        }
    }
}