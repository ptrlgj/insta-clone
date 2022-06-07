import { useDispatch } from "react-redux"
import { updateDocument } from "../firebase"
import { showAlert } from "../store/alertSlice"
import { changeValue } from "../store/userSlice"

export const useToggleFollowUser = ( follower, followTo, setFollowed ) => {
    const dispatch = useDispatch()
    return async () => {
        try {
            if( follower.followed.includes(followTo.id) ){
                await updateDocument( 'users', follower.id, {
                    followed: [...follower.followed.filter( followedUser => followedUser !== followTo.id )]
                })
                dispatch( changeValue({
                    followed: [...follower.followed.filter( followedUser => followedUser !== followTo.id )]
                }) )
                await updateDocument( 'users', followTo.id, {
                    followersList: [...followTo.followersList.filter( followerUser => followerUser !== follower.id )],
                })
                setFollowed(false)
            } else{
                await updateDocument( 'users', follower.id, {
                    followed: [...follower.followed, followTo.id]
                })
                dispatch( changeValue({
                    followed: [...follower.followed, followTo.id]
                }) )
                await updateDocument( 'users', followTo.id, {
                    followersList: [...followTo.followersList.filter( id => id !== follower.id), follower.id],
                })
                setFollowed(true)
            }
        } catch (error) {
            dispatch(showAlert({type: 'error', message: error.message}))
        }
    }
}
