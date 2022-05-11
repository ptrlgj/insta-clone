import { Box, Fab } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import ModalOptions from '../components/ModalOptions';
import Post from '../components/Post';
import data from '../data.json';
import { postsColRef, getData, getSortedData, db } from '../firebase'
import { setPosts, setNewPosts } from '../store/postsSlice';
import { collection, onSnapshot } from 'firebase/firestore';
function Posts() {
    // const [posts, setPosts] = useState(null);
    const { posts, newPosts } = useSelector( state => state.posts )
    const dispatch = useDispatch();

    useEffect( ()=> {
        // const getPosts = async () => {
        //     const posts = await getSortedData(postsColRef, 'createdAt', 'desc');
        //     // console.log(posts)
        //     dispatch(setPosts(posts))
        // }
        // getPosts()

        const postsSnapshot = onSnapshot( collection(db, 'posts'), snapshot => {
          console.log(snapshot.docs)
          if(!snapshot.docs) return
          dispatch( setPosts( snapshot.docs.map( doc => ({ ...doc.data(), id: doc.id }) ).sort( (a, b) => b.createdAt - a.createdAt ) ) )
        }) 
      
      return () => postsSnapshot()
    }, [] )

    const handleShowNew = () => {
      dispatch(setNewPosts(false))
    }
  return (
    <Box sx={{paddingBottom: '20px'}}> 
        <ModalOptions />
        <Header />
        {newPosts && 
        <Fab 
          variant="extended" 
          size="small" 
          color="primary" 
          aria-label="add" 
          sx ={{position: 'fixed', left: '50%', transform: 'translateX(-50%)'}}
          onClick={handleShowNew}
        >
          <NavigationIcon sx={{ mr: 1 }} />
          show new
        </Fab>}
        {posts && posts.map(post=><Post key={post.id} data={post}/>)}
    </Box>
  )
}

export default Posts