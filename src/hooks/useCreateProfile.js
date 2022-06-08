import { signInWithEmailAndPassword } from "firebase/auth"
import { query, where } from "firebase/firestore"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { auth, createUserProfile, fetchLoggedUser, getUserBy, usersColRef } from "../firebase"
import { showAlert } from "../store/alertSlice"
import { setUser } from "../store/userSlice"

export const useCreateProfile = (email, password, imageUrl, userName, fullName, bio, uid) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return async () => {
        if(imageUrl && userName){
            //check if username is taken
            const q = query(usersColRef, where("userName", "==", userName))
            try {
                const userCheck = await getUserBy(q)
                if(userCheck[0]){
                    dispatch(showAlert({type: 'warning', message: `User name "${userName}" is already taken`}))
                    return
                }
                await createUserProfile( userName, fullName, bio, imageUrl, uid)
                !uid && await signInWithEmailAndPassword(auth, email, password)
                dispatch(showAlert({type: 'success', message: 'New user has been created and logged in'}))
                fetchLoggedUser(uid).then( res => dispatch(setUser(res)))
            } catch (error) {
                dispatch(showAlert({type: 'error', message: error.message}))
            }
            navigate(`/`)
        } 
        else if(imageUrl) dispatch(showAlert({type: 'warning', message: 'Username is required'}))
        else if(userName) dispatch(showAlert({type: 'warning', message: 'Avatar is required'}))
        else dispatch(showAlert({type: 'warning', message: 'Profile has to have an avatar and a username'}))
    }
}
