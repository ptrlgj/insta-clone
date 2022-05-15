import { Avatar, Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db, getSingleDoc, updateDocument } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import Comment from '../components/Comment';
import { timePassed } from '../utils';

function Comments() {
    const postId = useParams().id
    const [post, setPost] = useState(null)
    const [user, setUser] = useState(null)
    const [passedTime, setPassedTime] = useState('');
    const [inputComment, setInputComment] = useState('')
    const navigate = useNavigate()
    // console.log(postId)

    const handleSubmitComment = async (e) => {
        e.preventDefault()
        await updateDocument('posts', post.id, {
            comments: [... post.comments, {
                comment: inputComment,
                createdAt: Date.now(),
                author: user.id
            }]
        })
        setInputComment('')
    }
    
    useEffect( () => {
        const commentSnapshot = onSnapshot( doc( db, 'posts', postId ), snapshot => {
            if(!snapshot.data()) return
            // console.log(snapshot.data())
            setPost({...snapshot.data(), id: postId})
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
            paddingBottom: '20px',
            
        }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px 10px',
            gap:'20px',
            'button' : {
                color : 'black'
            }
        }}>
            <IconButton onClick={ () => navigate(-1) }>
                <ArrowBackRoundedIcon />
            </IconButton>
            <Typography variant='h6' sx={{
                flex: '1'
            }}>Comments</Typography>
            <IconButton>
                <SendRoundedIcon />
            </IconButton>
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
                    <Link to={`/${user.userName}`}>
                        {user.userName}
                    </Link>
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
                <Comment key={`${comment.author}${comment.createdAt}`} commentId={`${comment.author}${comment.createdAt}`} data={comment} postId={postId}/>
            ))}
        </Box>
        <Box sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px 20px',
                gap:'15px',
            }}>
                <Avatar  src={user.image} alt={user.userName} sx={{ width: '35px', height: '35px'}}/>
                <TextField 
                    id='commentField'
                    placeholder="Add comment..." 
                    variant="standard"
                    autoComplete='off' 
                    value={inputComment}
                    onChange={(e) => setInputComment(e.target.value)}
                />
                {inputComment ? <Button 
                    htmlFor='commentField' 
                    variant="text" 
                    onClick={(e) => handleSubmitComment(e)}>
                        Post
                    </Button> : 
                    <Button 
                    htmlFor='commentField' 
                    variant="text" 
                    disabled
                    > 
                        Post
                    </Button>
                }
            </Box>
        </>}
    </Paper>
  )
}


export default Comments