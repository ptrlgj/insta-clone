import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { openModal, setOption } from '../store/modalSlice'
import { getActiveUser } from '../store/userSlice';
import { showAlert } from '../store/alertSlice';
import { updateDocument } from '../firebase';

export const useLikePost = (user, post) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    return async () => {
        try {
            if(!user.loggedIn && user.uid){
                navigate('/signup')
            } else if(!user.loggedIn){
                dispatch(openModal());
                dispatch(setOption('loginModal'))
            } else if( post.likedBy.includes(user.id) ) {
                await updateDocument('posts', post.id, {
                    likedBy: [...post.likedBy.filter(userLike => userLike !== user.id)]
                })
                await updateDocument('users', user.id, {
                    likedPosts: [...user.likedPosts.filter(likedPost => likedPost !== post.id)]
                })
                dispatch(getActiveUser(user.id))
            } else {
                await updateDocument('posts', post.id, {
                    likedBy: [...post.likedBy, user.id]
                })
                await updateDocument('users', user.id, {
                    likedPosts: [...user.likedPosts, post.id]
                })
                dispatch(getActiveUser(user.id))
            }
        } catch (error) {
            dispatch(showAlert({type: 'error', message: error.message}))
        }
  }
}
