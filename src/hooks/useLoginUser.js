import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { auth } from '../firebase'
import { showAlert } from '../store/alertSlice'

export const useLogInUser = (email, pass) => {
    const dispatch = useDispatch()
    return async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                pass
            )
            dispatch(showAlert({type: 'success', message: 'User logged in successfully'}))
            return user
        } catch (error) {
            dispatch(showAlert({type: 'error', message: error.message}))
        }
    }
}
