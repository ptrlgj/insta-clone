import { useDispatch } from "react-redux"
import { updateDocument } from "../firebase"
import { showAlert } from "../store/alertSlice"
import { changeValue } from "../store/userSlice"

export const useToggleShowFollowed = (user) => {
    const dispatch = useDispatch()
    return async () => {
        try {
            await updateDocument('users', user.id, {
                settings: {
                    darkTheme: user.settings.darkTheme,
                    showFollowed: !user.settings.showFollowed
                }
            })
            dispatch(changeValue({
                settings: {
                    darkTheme: user.settings.darkTheme,
                    showFollowed: !user.settings.showFollowed
                }
            }))
        } catch (error) {
            dispatch(showAlert({type: 'error', message: error.message}))
        }
    }
}
