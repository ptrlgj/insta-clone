import { Box, Fab, FormControlLabel, Paper, Switch, Typography } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import Post from '../components/Post';
import { setNewPosts, setLoading, setFollowedPosts } from '../store/postsSlice';
import { useUser } from '../hooks/useUser';
import { usePosts } from '../hooks/usePosts';
import { useToggleShowFollowed } from '../hooks/useToggleShowFollowed';
import { useFirstPosts } from '../hooks/useFirstPosts';
import { useMorePosts } from '../hooks/useMorePosts';

function Posts( {lastVisible, setLastVisible} ) {
    const { posts, newPosts, followedPosts } = usePosts()
    const user = useUser()
    const dispatch = useDispatch(); 
    const [noMorePosts, setNoMorePosts] = useState(false)
    const observer = useRef()
    const showFollowed = useToggleShowFollowed(user)
    const fetchFirstPosts = useFirstPosts(setLastVisible)
    const fetchMorePosts = useMorePosts(lastVisible, setLastVisible, posts, setNoMorePosts) 

    const lastPostRef = useCallback( node => {
      if(observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver( entries => {
        if(entries[0].isIntersecting){
          if(!noMorePosts) {
            fetchMorePosts()
          }
        }
      })
      if(node) observer.current.observe(node)
    })

    const handleShowFollowed = () => showFollowed()

    const handleShowNew = () => dispatch(setNewPosts(false))

    useEffect( ()=> {
        dispatch(setLoading(true))
        if(posts.length === 0 && !lastVisible){
          fetchFirstPosts()
        } 
    }, [] )

    useEffect( () => {
      if(user.loggedIn){
        dispatch( setFollowedPosts( posts.filter( doc => {
          if( user.followed.includes(doc.userId) || doc.userId === user.id ) return { ...doc }
        })))
      }
    }, [user.loggedIn, posts])
    
  return (
    <Box sx={{paddingBottom: '10px'}}> 
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
        {user.loggedIn && 
        <Paper square sx={{padding: '0 10px'}}>
          <FormControlLabel 
            control={ <Switch checked={ user.settings.showFollowed } value={ user.settings.showFollowed } onChange={ handleShowFollowed }/> } 
            label="Show only followed" 
          />
        </Paper>
        }
        {posts.length > 0 ? 
          user.settings.showFollowed ?
            followedPosts.length > 0 ?
              followedPosts.map( (post, index) => {
                if(followedPosts.length === index+1) return  <Post key={post.id} data={post} ref={lastPostRef} />
                else return <Post key={post.id} data={post} />
              }) 
              :
              <Paper 
                sx={{
                  height: '95vh'
                }}
                ref={lastPostRef}
              >
              </Paper>
            :
            posts.map( (post, index) => {
              if(posts.length === index+1) return  <Post key={post.id} data={post} ref={lastPostRef} />
              else return <Post key={post.id} data={post} />
            } ) 
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