import { query, where } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { getUserBy, usersColRef } from '../firebase';
import { showAlert } from '../store/alertSlice';
import { closeModal } from '../store/modalSlice';
import { setUser } from '../store/userSlice';

export const useLogInUserGetData = (loginUser) => {
    const dispatch = useDispatch()
    return async () => {
        try {
            const userToken = await loginUser();
            if(userToken){
                const q = query(usersColRef, where('uid','==',userToken.user.uid))
                const response = await getUserBy(q)
                dispatch(setUser(response[0]))
                dispatch(closeModal())
            }
        } catch (error) {
            dispatch(showAlert({type: 'error', message: error.message}))
        }
    }
}
