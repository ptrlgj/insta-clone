import { query, where } from "firebase/firestore"
import { useDispatch } from "react-redux"
import { getUserBy, usersColRef } from "../firebase"
import { showAlert } from "../store/alertSlice"

export const useGetUser = (user, userName, setLoading, setUserData, setFollowed, setNoUser) => {
    const dispatch = useDispatch()
    return async () =>{
        setLoading(true)
        setUserData(null)
        const q = query(usersColRef, where("userName", "==", userName))
        try {
            const response = await getUserBy(q)
            if(response.length > 0){
                setUserData(response[0]);
                setFollowed(user.followed.includes(response[0].id))
                setLoading(false)
            }else{
                setLoading(false)
                setNoUser(true)
                return
            }
        } catch (error) {
            dispatch(showAlert({type: 'error', message: error.message}))
        }
    }
}
