import { useDispatch } from "react-redux";
import { getSingleDoc } from "../firebase";
import { showAlert } from "../store/alertSlice";

export const useSinglePost = (postId, setPost) => {
    const dispatch = useDispatch()
    return async () => {
        try {
            const fetchPost = await getSingleDoc('posts', postId);
            setPost(fetchPost)
        } catch (error) {
            dispatch(showAlert({type: 'error', message: error.message}))
        }
    } 
}
