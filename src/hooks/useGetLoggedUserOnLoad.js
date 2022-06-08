import { onAuthStateChanged } from 'firebase/auth';
import { query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { auth, getUserBy, usersColRef } from '../firebase';
import { changeValue, setUser } from '../store/userSlice';

export function useGetLoggedUserOnLoad() {
    const dispatch = useDispatch();
    const [uid, setUid] = useState(null);
    useEffect( () => {
        const fetchLoggedUser = async () => {
        const q = query(usersColRef, where("uid", "==", uid));
        const response = await getUserBy(q)
        if(uid && response[0]) dispatch(setUser(response[0]))
        else if(uid) dispatch(changeValue({uid}))
        }
        if(uid){
        fetchLoggedUser()
        }
    }, [uid] )
    onAuthStateChanged(auth, async (currentUser) => {
        if(currentUser){
        setUid(currentUser.uid)
        }
    })
}