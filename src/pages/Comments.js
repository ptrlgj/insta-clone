import { Avatar, Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import { timePassed } from '../utils';
import { useUser } from '../hooks/useUser';
import { useSubmitComment } from '../hooks/useSubmitComment';
import { useAuthor } from '../hooks/useAuthor';
import { useSubscribeTo } from '../hooks/useSubscribeTo';

function Comments() {
    const postId = useParams().id
    const [post, setPost] = useState(null)
    const [author, setAuthor] = useState(null)
    const [passedTime, setPassedTime] = useState('');
    const [inputComment, setInputComment] = useState('');
    const user = useUser()
    const navigate = useNavigate()
    const submitComment = useSubmitComment(user, post, inputComment, setInputComment);
    const getAuthor = useAuthor(post, setAuthor)
    
    useSubscribeTo(postId, setPost)

    const handleSubmitComment = async () => {
        submitComment()
    }
    
    useEffect( () => {
        if(!post) return
        getAuthor()
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