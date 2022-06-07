import { getDocs, limit, orderBy, query } from "firebase/firestore"
import { useDispatch } from "react-redux"
import { postsColRef } from "../firebase"
import { setPosts } from "../store/postsSlice"

export const useFirstPosts = (setLastVisible, setNoMorePosts) => {
    const dispatch = useDispatch()
    return async () => {
        const q = query( postsColRef, 
        orderBy("createdAt", "desc"),  
        limit(4) 
        )
        const data = await getDocs(q)
        if(data.empty){
            setNoMorePosts(true)
            return 
        }
        dispatch( setPosts( data.docs.map( doc => ({ ...doc.data(), id: doc.id }) ) ) )
        setLastVisible(data.docs[data.docs.length - 1 ])
    }
}
