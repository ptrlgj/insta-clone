import { useDispatch } from "react-redux"
import { showAlert } from "../store/alertSlice"
import { closeModal } from "../store/modalSlice"

export const useCopyToClipboard = (postModal, postPage, postId) => {
    const dispatch = useDispatch()
    return () => {
            let link = window.location.href
        if(postModal){
            link = postPage ? link : `${link}post/${postId}`
        }
        navigator.clipboard.writeText(link)
        dispatch(showAlert({type: 'info', message: 'Link has been added to the clipboard'}))
        dispatch(closeModal())
    }
}
