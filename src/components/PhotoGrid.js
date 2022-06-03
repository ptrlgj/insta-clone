import { ImageList, ImageListItem, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSingleDoc } from '../firebase';
import { showAlert } from '../store/alertSlice';

const Img = styled('img')({
  height:'151px',
  width: '151px',
  objectFit: 'cover',
});

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
      // this way i keep them in order
      setPosts(resolvedPosts.reverse())
    }
    fetching()
  }, [])

  return (
    <ImageList sx={{ width: '99%' }} cols={3} rowHeight={151}>
    {posts.length >= user.posts.length && posts.map( (item) => {
      return (<ImageListItem key={item.imageId}>
        <Img
          src= {item.url}
          srcSet={item.url}
          alt=''
          loading="lazy"
          sx={{cursor: 'pointer'}}
          onClick={ () => handleOpenPost(item) }
          />
      </ImageListItem>)
    }
    )}
    
  </ImageList>
  // <>
  //   <p>{posts}</p>
  // </>
  )
}

export default PhotoGrid