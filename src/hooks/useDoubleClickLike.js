import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateDocument } from "../firebase";
import { showAlert } from "../store/alertSlice";
import { openModal, setOption } from "../store/modalSlice";
import { getActiveUser } from "../store/userSlice";

export const useDoubleClickLike = (user, post) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return async (e) => {
        if(e.detail === 2) {
            try {
                if(!user.loggedIn && user.uid){
                    navigate('/signup')
                } else if(!user.loggedIn){
                    dispatch(openModal());
                    dispatch(setOption('loginModal'))
                } else if( !post.likedBy.includes(user.id) ){
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
}
