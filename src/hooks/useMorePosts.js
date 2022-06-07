import { getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { postsColRef } from '../firebase'
import { setPosts } from '../store/postsSlice'

export const useMorePosts = (lastVisible, setLastVisible, posts, setNoMorePosts) => {
    const dispatch = useDispatch()
    return async () => {
        const q = query( postsColRef, 
        orderBy("createdAt", "desc"),  
        startAfter(lastVisible),
        limit(4) 
        )
        const data = await getDocs(q)
        if(data.empty){
            setNoMorePosts(true)
            return 
        }
        dispatch( setPosts( [...posts, ...data.docs.map( doc => ({ ...doc.data(), id: doc.id }) ) ] ) )
        setLastVisible(data.docs[data.docs.length - 1 ])
    }
}
