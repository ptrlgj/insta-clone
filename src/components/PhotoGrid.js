import { styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSingleDoc } from '../firebase';
import { showAlert } from '../store/alertSlice';

const Img = styled('img')({
  maxHeight:'153px',
  maxWidth:'153px',
  height:'100%',
  width: '100%',
  objectFit: 'cover',
});

const Grid = styled('div')({
  maxWidth:'100vw',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '3px'
}) 
function PhotoGrid({user}) {
  
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchPosts = () => {
    return user.posts.map( async (post) => {
      try {
        const response = await getSingleDoc('posts', post );
        return response
      } catch (error) {
        dispatch(showAlert({type: 'error', message: error.message.slice(10)}))
      }
    })
  }
  
  const handleOpenPost = (post) => {
    navigate(`/post/${post.id}`)
  }
  useEffect( () => {
    const fetching = async () => {
      let resolvedPosts = []
      const promises = await fetchPosts();
      for (const item of promises) {
        const resolved = await item;
        resolvedPosts.push({...resolved, id: resolved.id})
      }
      setPosts(resolvedPosts.reverse())
    }
    fetching()
  }, [])

  return (
    <Grid>

    {posts.length >= user.posts.length && posts.map( (item) => {
      return (
        <Img
          key={item.imageId}
          src= {item.url}
          srcSet={item.url}
          alt=''
          loading="lazy"
          sx={{cursor: 'pointer'}}
          onClick={ () => handleOpenPost(item) }
          />
      )
    }
    )}
    
  </Grid>
  )
}

export default PhotoGrid