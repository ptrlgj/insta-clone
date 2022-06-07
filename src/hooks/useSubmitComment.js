import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateDocument } from "../firebase"
import { showAlert } from "../store/alertSlice"
import { openModal, setOption } from "../store/modalSlice"

export const useSubmitComment = (user, post, inputComment, setInputComment) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
  
    return async () => {
        if(user.loggedIn){
            try {
                await updateDocument('posts', post.id, {
                    comments: [...post.comments, {
                        comment: inputComment,
                        createdAt: Date.now(),
                        author: user.id
                    }]
                })
                dispatch(showAlert({type: 'info', message: 'Comment has been added'}))
                setInputComment('')
            } catch (error) {
                dispatch(showAlert({type: 'error', message: error.message}))
            }
        } else if( user.uid ){
            navigate('/signup')
        } else {
            dispatch(openModal())
            dispatch(setOption('loginModal'))
        }
  }
}
