import { useDispatch } from "react-redux";
import { getSingleDoc } from "../firebase";
import { showAlert } from "../store/alertSlice";

export const useAuthor = (post, setAuthor) => {
    const dispatch = useDispatch()
    return async () => {
        if(post){
            try {
                const data = await getSingleDoc('users', post.userId)
                setAuthor(data)
            } catch (error) {
                dispatch(showAlert({type: 'error', message: error.message}))
            }
        }
    } 
}
