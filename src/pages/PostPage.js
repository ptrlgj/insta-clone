import { Box, IconButton, Paper, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Post from '../components/Post'
import { getSingleDoc } from '../firebase'
import { useDispatch, useSelector } from 'react-redux';
import { setPostPage } from '../store/postsSlice';

function PostPage() {
    const postId = useParams().id
    const [post, setPost] = useState(null)
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect( () => {
        dispatch(setPostPage(true))
        const fetchData = async () => {
            const fetchPost = await getSingleDoc('posts', postId);
            setPost(fetchPost)
        } 
        fetchData()
        return () => dispatch(setPostPage(false))
    }, [])

    useEffect( () => {
        if(!post) return
        const fetchData = async () => {
            const fetchUser = await getSingleDoc('users', post.userId)
            setUser(fetchUser)
        } 
        fetchData()
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
                // justifyContent: 'space-between',
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