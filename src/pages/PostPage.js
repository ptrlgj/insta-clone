import { Box, IconButton, Paper, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Post from '../components/Post'
import { useDispatch } from 'react-redux';
import { setPostPage } from '../store/postsSlice';
import { useSinglePost } from '../hooks/useSinglePost';
import { useAuthor } from '../hooks/useAuthor';

function PostPage() {
    const postId = useParams().id
    const [post, setPost] = useState(null)
    const [user, setUser] = useState(null)
    const getPost = useSinglePost(postId, setPost)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getAuthor = useAuthor(post, setUser)
    
    useEffect( () => {
        dispatch(setPostPage(true))
        getPost()
        return () => dispatch(setPostPage(false))
    }, [])

    useEffect( () => {
        getAuthor()
    }, [post])
    
  return (
    <>
        {post && user &&
        <Paper 
        elevation={2}
        sx={{ 
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: '20px',
            minHeight: '95vh',
            'button' : {
                color : 'text.primary'
            }
        }}>
            <Box sx={{
                display: 'flex',
                padding: '5px 10px',
                alignItems: 'center',
                gap:'20px',
            }}> 
                <IconButton onClick={ () => navigate(-1) }>
                    <ArrowBackRoundedIcon />
                </IconButton>
                <Typography variant='h4' component="h1" sx={{
                fontFamily: 'Satisfy',
            }}>
                Instaclone
            </Typography>
            </Box>
            <Post data={post} />
        </Paper> 
        }
    </>
  )
}

export default PostPage