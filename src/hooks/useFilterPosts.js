import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setFollowedPosts } from '../store/postsSlice'

export const useFilterPosts = (user, posts) => {
    const dispatch = useDispatch()
    useEffect( () => {
        if(user.loggedIn){
          dispatch( setFollowedPosts( posts.filter( doc => {
            if( user.followed.includes(doc.userId) || doc.userId === user.id ) return { ...doc }
          })))
        }
      }, [user.loggedIn, posts])
}
