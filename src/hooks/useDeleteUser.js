import { deleteUser } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth, deleteSingleDoc, deleteUserPosts } from '../firebase'
import { showAlert } from '../store/alertSlice'
import { closeModal } from '../store/modalSlice'
import { logoutUser } from '../store/userSlice'

export const useDeleteUser = (user) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return async () => {
        try {
            await deleteUser(auth.currentUser)
            await deleteSingleDoc('users', user.id)
            await deleteUserPosts(user.id)
            dispatch(showAlert({type: 'success', message: 'User has been succesfully deleted'}))
        } catch (error) {
            console.log(error.message)
            dispatch(showAlert({type: 'error', message: error.message}))
        }
        dispatch(closeModal())
        dispatch(logoutUser())
        navigate('/')
    }
}
