import { Grid, ImageList, ImageListItem, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getSingleDoc } from '../firebase';

const Img = styled('img')({
  height:'151px',
  width: '151px',
  objectFit: 'cover',
});

function PhotoGrid({user}) {
  
  const [posts, setPosts] = useState([])

  const fetchPosts = () => {
    return user.posts.map( async (post) => {
      const response = await getSingleDoc('posts', post );
      // const data = response.data()
      return response
    })
  }
  
  useEffect( () => {
    const fetching = async () => {
      // const resolvedPosts = await Promise.all(fetchPosts())
      // console.log(resolvedPosts)
      let resolvedPosts = []
      const promises = await fetchPosts();
      for (const item of promises) {
        const resolved = await item;
        resolvedPosts.push(resolved)
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