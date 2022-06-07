import { Avatar, Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db, getSingleDoc, updateDocument } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import Comment from '../components/Comment';
import { timePassed } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, setOption } from '../store/modalSlice';
import { showAlert } from '../store/alertSlice';
import { useUser } from '../hooks/useUser';

function Comments() {
    const postId = useParams().id
    const [post, setPost] = useState(null)
    const [author, setAuthor] = useState(null)
    const [passedTime, setPassedTime] = useState('');
    const [inputComment, setInputComment] = useState('');
    const user = useUser()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmitComment = async (e) => {
        e.preventDefault()
        if(user.loggedIn){
            try {
                await updateDocument('posts', post.id, {
                    comments: [...post.comments, {
                        comment: inputComment,
                        createdAt: Date.now(),
                        author: user.id
                    }]
                })
                dispatch(showAlert({type: 'info', message: 'Comment has been added'}))
                setInputComment('')
            } catch (error) {
                dispatch(showAlert({type: 'error', message: error.message}))
            }
        } else if( user.uid ){
            navigate('/signup')
        } else {
            dispatch(openModal())
            dispatch(setOption('loginModal'))
        }
    }
    
    useEffect( () => {
        const commentSnapshot = onSnapshot( doc( db, 'posts', postId ), snapshot => {
            if(!snapshot.data()) return
            setPost({...snapshot.data(), id: postId})
        }) 

        return () => commentSnapshot()
    }, [])
    
    useEffect( () => {
        if(!post) return
        const fetchUser = async () => {
            const data = await getSingleDoc('users', post.userId)
            setAuthor(data)
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
            paddingBottom: '20px',
            minHeight: '95vh'
        }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px 10px',
            gap:'20px',
            'button' : {
                color : 'text.primary'
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
        {post && author && <>
        <Box 
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '5px 20px',
                gap:'10px',
            }}>
            <Avatar src={author.image} alt={author.fullName}/>
            <Typography variant='subtitle2' sx={{ fontWeight: '400'}}>
                <Typography 
                    variant="subtitle2" 
                    sx={{ fontWeight: 'bold', marginRight: '3px'}} 
                    component="span"
                >
                    <Link to={`/${author.userName}`}>
                        {author.userName}
                    </Link>
                </Typography>
                {post.desc}
                <Typography 
                    variant='caption' 
                    component='p'
                    sx={{
                        color: 'text.secondary'
                    }}
                >
                    {passedTime}
                </Typography>
            </Typography>
        </Box>
        <hr width='100%' color='gray'/>
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