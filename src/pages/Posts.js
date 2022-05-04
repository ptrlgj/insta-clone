import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Post from '../components/Post';
import data from '../data.json';
import { postsColRef, getData, getSortedData } from '../firebase'
function Posts() {
    const [posts, setPosts] = useState(null);

    useEffect( ()=> {
        const getPosts = async () => {
            const posts = await getSortedData(postsColRef, 'createdAt', 'desc');
            console.log(posts)
            setPosts(posts)
        }
        getPosts()
    }, [] )
  return (
    <Box sx={{paddingBottom: '20px'}}> 
        <Header />
        {posts && posts.map(post=><Post key={post.id} {...post}/>)}
    </Box>
  )
}

export default Posts