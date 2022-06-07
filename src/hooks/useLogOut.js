import { signOut } from 'firebase/auth';
import { showAlert } from '../store/alertSlice';
import { closeModal } from '../store/modalSlice';
import { logoutUser } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export const useLogOut = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return async () => {
        try {
            await signOut(auth)
            dispatch(showAlert({type: 'info', message: 'User has logged out'}))
            dispatch(closeModal())
            dispatch(logoutUser())
        } catch (error) {
            dispatch(showAlert({type: 'error', message: error.message}))
        }
        navigate('/')
    }
}
