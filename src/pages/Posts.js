import { Box, Fab, Paper, Typography } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Post from '../components/Post';
import { db } from '../firebase'
import { setPosts, setNewPosts } from '../store/postsSlice';
import { collection, onSnapshot } from 'firebase/firestore';
function Posts() {
    const { posts, newPosts } = useSelector( state => state.posts )
    const dispatch = useDispatch();

    useEffect( ()=> {
        const postsSnapshot = onSnapshot( collection(db, 'posts'), snapshot => {
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
        {/* <ModalOptions /> */}
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
        {posts.length > 0 ? 
          posts.map( post => <Post key={post.id} data={post}/> ) 
          :
          <Paper
            sx={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography variant='h5'>No posts to show</Typography>
          </Paper>
          }
    </Box>
  )
}

export default Posts