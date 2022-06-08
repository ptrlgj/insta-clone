import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { auth } from '../firebase'
import { showAlert } from '../store/alertSlice'
import { changeValue } from '../store/userSlice'

export const useCreateUser = (email, password, confPass) => {
    const dispatch = useDispatch()

    return async () => {
        if(email && password === confPass){
            try {
                const data = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                dispatch(changeValue({uid: data.user.uid}))
            } catch (error) {
                dispatch(showAlert({type: 'error', message: error.message}))
            }
        } else if(email) {
            dispatch(showAlert({type: 'error', message: 'Passwords dont match'}))
        } else if(password === confPass) {
            dispatch(showAlert({type: 'error', message: 'Invalid email'}))
        }
    }
}
