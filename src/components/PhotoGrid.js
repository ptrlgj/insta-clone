import { styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetUserPosts } from '../hooks/useGetUserPosts'; 
import { useResolveUserPosts } from '../hooks/useResolveUserPosts'; 

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
  const getUserPosts = useGetUserPosts(user)
  const resolvePosts = useResolveUserPosts(getUserPosts, setPosts)
  
  const handleOpenPost = (post) => {
    navigate(`/post/${post.id}`)
  }
  useEffect( () => {
    resolvePosts()
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