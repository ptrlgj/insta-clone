import {initializeApp} from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, where, getDoc, orderBy, updateDoc, onSnapshot } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY, 
    authDomain: process.env.REACT_APP_AUTH_DOMAIN, 
    projectId: process.env.REACT_APP_PROJECT_ID, 
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET, 
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID, 
    appId: process.env.REACT_APP_APP_ID, 
  };

//init

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
// init services

export const db = getFirestore()

// auth 

export const auth = getAuth(app)

//collection references 

export const usersColRef = collection(db, 'users')
export const postsColRef = collection(db, 'posts')

// get collections data

export const getData = async (colRef) => {
    const response = await getDocs(colRef)
    return(response.docs.map(doc=>( { ...doc.data(), id: doc.id } )))
}

// export const getSortedData = async (colRef, field, operator, value, orderField, orderValue) => {
//     const q = query(colRef, where(field, operator, value), orderBy(orderField, orderValue));
//     const response = await getDocs(q);
//     return response.docs.map(doc=> ({...doc.data(), id: doc.id}))
// }

export const getSortedData = async (colRef, orderField, orderValue) => {
    const q = query(colRef, orderBy(orderField, orderValue));
    const response = await getDocs(q);
    return response.docs.map(doc=> ({...doc.data(), id: doc.id}))
}

export const getSingleDoc = async (collection, id) => {
    const docRef = doc(db, collection, id);
    const response = await getDoc(docRef);
    // console.log(response.id)
    return { ...response.data(), id: response.id }
}

//query get document by 

export const getUserBy = async (q) => {

    // const q = query(usersColRef, where("userName", "==", userName))
    const response = await getDocs(q)
    return response.docs.map(doc=>( { ...doc.data(), id: doc.id } ))
}


// update document 

export const updateDocument = async (collection, id, updatedValue) => {
    const docRef = doc(db, collection, id)
    return updateDoc(docRef, updatedValue)
}

// add collections data

export const addPost = async ( imageId, userId, url, desc ) => {
    const timestamp = Date.now()
    const result = await addDoc(postsColRef, {
        imageId,
        userId,
        url,
        likedBy: [],
        desc,
        comments: [],
        createdAt: timestamp
    })
    return result
}

export const createUserProfile = async ( userName, fullName, bio, imageUrl, uid) => {
    const result = await addDoc(usersColRef, {
        uid,
        userName,
        fullName,
        bio,
        image: imageUrl,
        followed:[],
        followers: 0,
        followersList: [],
        likedPosts: [],
        posts: [],
    })
    return result
}

const uploadImage = ( imageFile, imageId ) => {
    if(!imageFile) return;
    const imageRef = ref(storage, `images/${imageId}`)
    return uploadBytes(imageRef, imageFile)
}

export const getImageUrl = async ( imageFile, imageId ) => {
    const imageListRef = ref(storage, `images/${imageId}`);
    await uploadImage( imageFile, imageId)
    const imageUrl = await getDownloadURL(imageListRef)
    return imageUrl;
}

// delete document 

export const deleteSingleDoc = async (collection, id) => {
    const docRef = doc(db, collection, id);
    const response = await deleteDoc(docRef)
    return response
}

export const deleteUserPosts = async (userId) => {
    const q = query(postsColRef, where("userId", "==", userId));
    const userPosts = await getData(q)
    for (const post of userPosts) {
        await deleteSingleDoc('posts', post.id)
    }
}
// subscription

export const subscribeTo = async ( colName ) => {
    const colRef = collection(db, colName)
    onSnapshot( colRef, ( snapshot ) => {
        // console.log(snapshot)
        const data = snapshot.docs.map(doc => doc.data())
        console.log(data)
    })
}

 //loggin in 

// export const logInUser = async (email, pass) => {
//     try {
//         const user = await signInWithEmailAndPassword(
//             auth,
//             email,
//             pass
//         )

//         return user
//     } catch (error) {
//         console.log('error',error.message)
//     }
// }

export const signUpUser = async ( email, pass ) => {
    try {
        const user = await createUserWithEmailAndPassword(
            auth,
            email,
            pass
        )
        return user
    } catch (error) {
        console.log('error', error.message)
    }
}

export const fetchLoggedUser = async (uid) => {
    console.log(uid)
    const q = query(usersColRef, where("uid", "==", uid));
    const response = await getUserBy(q)
    if(response && response[0]) return (response[0])
  }
