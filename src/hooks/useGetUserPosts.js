import { useDispatch } from "react-redux";
import { getSingleDoc } from "../firebase";
import { showAlert } from "../store/alertSlice";

export const useGetUserPosts = (user) => {
    const dispatch = useDispatch()
    return () => {
        return user.posts.map( async (post) => {
            try {
                const response = await getSingleDoc('posts', post );
                return response
        } catch (error) {
            dispatch(showAlert({type: 'error', message: error.message}))
        }
        })
    }
}
