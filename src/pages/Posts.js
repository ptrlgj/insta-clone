import { Box, Button, Fab, Paper, Typography } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Post from '../components/Post';
import { db, postsColRef } from '../firebase'
import { setPosts, setNewPosts } from '../store/postsSlice';
import { collection, getDocs, limit, onSnapshot, orderBy, query, startAfter, startAt } from 'firebase/firestore';
import { showAlert } from '../store/alertSlice';
function Posts( {lastVisible, setLastVisible} ) {
    const { posts, newPosts } = useSelector( state => state.posts )
    const dispatch = useDispatch(); 
    // const [lastVisible, setLastVisible] = useState(null)
    const [noMorePosts, setNoMorePosts] = useState(false)

    const fetchFirstPosts = async () => {
      const q = query( postsColRef, 
        orderBy("createdAt", "desc"),  
        limit(3) 
      )
      const data = await getDocs(q)
      dispatch( setPosts( data.docs.map( doc => ({ ...doc.data(), id: doc.id }) ) ) )
      setLastVisible(data.docs[data.docs.length - 1 ])
    }

    const fetchMorePosts = async () => {
      const q = query( postsColRef, 
        orderBy("createdAt", "desc"),  
        startAfter(lastVisible),
        limit(3) 
      )
      const data = await getDocs(q)
      if(data.empty){
        setNoMorePosts(true)
        return 
      }
      dispatch( setPosts( [...posts, ...data.docs.map( doc => ({ ...doc.data(), id: doc.id }) ) ] ) )
      setLastVisible(data.docs[data.docs.length - 1 ])
    }
    useEffect( ()=> {
        if(posts.length === 0 && !lastVisible){
          fetchFirstPosts()
        } 
        // const postsSnapshot = onSnapshot( collection(db, 'posts'), snapshot => {
        //   if(!snapshot.docs) return
        //   dispatch( setPosts( snapshot.docs.map( doc => ({ ...doc.data(), id: doc.id }) ).sort( (a, b) => b.createdAt - a.createdAt ) ) )
        // })

      // return () => postsSnapshot()
    }, [] )

    const handleShowNew = () => {
      dispatch(setNewPosts(false))
    }
  return (
    <Box sx={{paddingBottom: '20px'}}> 
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
        {noMorePosts ? 
          <Button disabled>no more</Button>
          :
          <Button onClick={ fetchMorePosts }>load more</Button>
        }
    </Box>
  )
}

export default Posts