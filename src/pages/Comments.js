import { Avatar, Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useParams } from 'react-router-dom';
import { db, getSingleDoc } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import Comment from '../components/Comment';
import { timePassed } from '../utils';

function Comments() {
    const postId = useParams().id
    const [post, setPost] = useState(null)
    const [user, setUser] = useState(null)
    const [passedTime, setPassedTime] = useState('');

    // console.log(postId)

    useEffect( () => {
        const commentSnapshot = onSnapshot( doc( db, 'posts', postId ), snapshot => {
            if(!snapshot.data()) return
            // console.log(snapshot.data())
            setPost(snapshot.data())
        }) 

        return () => commentSnapshot()
    }, [])
    
    useEffect( () => {
        if(!post) return
        const fetchUser = async () => {
            const data = await getSingleDoc('users', post.userId)
            setUser(data)
        }
        fetchUser()
        setPassedTime(timePassed(post))
    }, [post])

  return (
    <Paper 
        elevation={2}
        sx={{ 
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            paddingBottom: '20px'

        }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px 20px',
            alignItems: 'center',
            gap:'20px',
        }}>
            <ArrowBackRoundedIcon />
            <Typography variant='h6' sx={{
                flex: '1'
            }}>Comments</Typography>
            <SendRoundedIcon />
        </Box>    
        {post && user && <>
        <Box 
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '5px 20px',
                gap:'10px',
            }}>
            <Avatar src={user.image} alt={user.fullName}/>
            <Typography variant='subtitle2' sx={{ fontWeight: '400'}}>
                <Typography 
                    variant="subtitle2" 
                    sx={{ fontWeight: 'bold', marginRight: '3px'}} 
                    component="span"
                >
                    {user.userName}
                </Typography>
                {post.desc}
                <Typography 
                    variant='caption' 
                    component='p'
                    sx={{
                        color: 'rgba(0,0,0,0.7)'
                    }}
                >
                    {passedTime}
                </Typography>
            </Typography>
        </Box>
        <hr width='100%' color='lightgrey'/>
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px 20px',
                gap:'10px',
            }}
        >
            {post.comments.map( comment => (
                <Comment key={`${comment.author}${comment.timestamp}`} data={comment} />
            ))}
        </Box>
        </>}
    </Paper>
  )
}


export default Comments