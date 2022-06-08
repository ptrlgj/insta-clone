import { doc, onSnapshot } from "firebase/firestore"
import { useEffect } from "react"
import { db } from "../firebase"

export const useSubscribeTo = (postId, setPost) => {
    useEffect( () => {
        const commentSnapshot = onSnapshot( doc( db, 'posts', postId ), snapshot => {
            if(!snapshot.data()) return
            setPost({...snapshot.data(), id: postId})
        }) 
        return () => commentSnapshot()
    }, [])
}
