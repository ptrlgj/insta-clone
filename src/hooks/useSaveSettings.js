import { query, where } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserBy, updateDocument, usersColRef } from '../firebase'
import { showAlert } from '../store/alertSlice'
import { changeValue } from '../store/userSlice'

export const useSaveSettings = (userName, user, avatarUrl, fullName, bio) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return async () => {
        if(userName !== user.userName){
            const q = query(usersColRef, where("userName", "==", userName))
            try {
                const userCheck = await getUserBy(q)
                if(userCheck[0]){
                    dispatch(showAlert({type: 'warning', message: `User name "${userName}" is already taken`}))
                    return
                }
            } catch (error) {
                dispatch(showAlert({type: 'error', message: error.message}))
            }
        }
        try {
            await updateDocument('users', user.id, {
                image: avatarUrl,
                userName,
                fullName,
                bio
            })
            dispatch(changeValue({
                image: avatarUrl,
                userName,
                fullName,
                bio
            }))
            dispatch(showAlert({type: 'info', message: `Changes have been saved for ${userName}`}))
            navigate(`/${userName}`)
        } catch (error) {
            dispatch(showAlert({type: 'error', message: error.message}))
        }
    }
}
