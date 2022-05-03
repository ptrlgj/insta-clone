import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Post from '../components/Post';
import data from '../data.json';
import { postsColRef, getData } from '../firebase'
function Posts() {
    const [posts, setPosts] = useState(null);

    useEffect( ()=> {
        const getPosts = async () => {
            const posts = await getData(postsColRef);
            setPosts(posts)
        }
        getPosts()
    }, [] )
  return (
    <> 
        <Header />
        {posts && posts.map(post=><Post key={post.id} {...post}/>)}
    </>
  )
}

export default Posts