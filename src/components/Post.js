import React, { useEffect, useState } from 'react';
import {Avatar, Box, TextField, Typography, Paper, Button, IconButton, styled} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import { getSingleDoc, updateDocument, db } from '../firebase';
import { openModal, setOption } from '../store/modalSlice'
import { useDispatch, useSelector } from 'react-redux';
import { onSnapshot, doc } from 'firebase/firestore';
import { getActiveUser } from '../store/userSlice';
import { timePassed } from '../utils'
import { Link, useNavigate } from 'react-router-dom';
import { showAlert } from '../store/alertSlice';

const Img = styled('img')({
    position: 'relative',
    width: '100%',
    objectFit: 'contain'
})

function Post({data}) {

    const [liked, setLiked] = useState(null);
    const [author, setAuthor] = useState(null);
    const user = useSelector( state => state.user);
    const [post, setPost] = useState(data);
    const [passedTime, setPassedTime] = useState('');
    const [inputComment, setInputComment] = useState('');
    const [readMore, setReadMore] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDoubleClick = (e) => {
        if(e.detail === 2) {
            if(!user.loggedIn){
                dispatch(openModal());
                dispatch(setOption('loginModal'))
            } else if( !post.likedBy.includes(user.id) ){
                updateDocument('posts', post.id, {
                    likedBy: [...post.likedBy, user.id]
                })
                updateDocument('users', user.id, {
                    likedPosts: [...user.likedPosts, post.id]
                })
                dispatch(getActiveUser(user.id))
                setLiked(true)
            }
        }
    }

    const handleLike = () => {
        if(!user.loggedIn){
            dispatch(openModal());
            dispatch(setOption('loginModal'))
        } else if( post.likedBy.includes(user.id) ) {
            updateDocument('posts', post.id, {
                likedBy: [...post.likedBy.filter(userLike => userLike !== user.id)]
            })
            updateDocument('users', user.id, {
                likedPosts: [...user.likedPosts.filter(likedPost => likedPost !== post.id)]
            })
            dispatch(getActiveUser(user.id))
            setLiked(false)
        } else {
            updateDocument('posts', post.id, {
                likedBy: [...post.likedBy, user.id]
            })
            updateDocument('users', user.id, {
                likedPosts: [...user.likedPosts, post.id]
            })
            dispatch(getActiveUser(user.id))
            setLiked(true)
        }
    }

    const handleOpenModal = () => {
        dispatch(openModal(post))
        dispatch(setOption('postModal'))
    }

    const handleSubmitComment = async (e) => {
        e.preventDefault()
        if(user.loggedIn){
            await updateDocument('posts', post.id, {
                comments: [...post.comments, {
                    comment: inputComment,
                    createdAt: Date.now(),
                    author: user.id
                }]
            })
            setInputComment('')
            dispatch(showAlert({type: 'info', message: 'Comment has been added'}))
        } else {
            dispatch(openModal())
            dispatch(setOption('loginModal'))
        }
    }

    useEffect( () => {
        const fetchAuthor = async () => {
            const userFetch = await getSingleDoc('users', post.userId);
            setAuthor(userFetch)
        }
        fetchAuthor() 
        setPassedTime(timePassed(data))

        const postSnapshot = onSnapshot( doc(db, 'posts', post.id), snapshot => {
            if(!snapshot.data()) return
            setPost(currState => ({...currState, likedBy: snapshot.data().likedBy, comments: snapshot.data().comments}) )
        }) 

        return () => postSnapshot()
    }, [])

    useEffect( () => {
        setLiked( user.likedPosts.includes(post.id) )
    } ,[ user ])

  return (
    <>
    {author?.userName &&
    <Paper elevation={2} square sx={{
        display: 'flex',
        flexDirection: 'column',
    }}>
        {author && <>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 10px',
            // 'button' : {
            //     color: 'black'
            // }
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap:'10px',
            }}>
                <Avatar src={author.image} alt={author.userName}/>
                <Typography  variant='subtitle2'>
                    <Link to={`/${author.userName}`}>
                        {author.userName}
                    </Link>
                </Typography>
            </Box>
            <IconButton onClick={ handleOpenModal }>
                <MoreVertIcon />
            </IconButton>
        </Box >
        <Box>
            <Img onClick={(e)=>handleDoubleClick(e)} src={post.url} alt="" />
        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            // 'button' : {
            //     color: 'black'
            // }
        }}>
            <Box sx={{
                display: 'flex',
            }}>
                {/* (user && user.likedPosts.includes(id) ) */}
                <IconButton onClick={ () => handleLike() }>
                    { liked ? 
                        <FavoriteIcon 
                            sx={{ 
                                color: 'red'
                            }} 
                        /> : 
                        <FavoriteBorderIcon />
                    }
                </IconButton>
                <IconButton onClick={ () => navigate(`/comments/${post.id}`)}>
                    <ChatBubbleOutlineOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SendRoundedIcon />
                </IconButton>
            </Box>
            <IconButton>
                <BookmarkBorderOutlinedIcon />
            </IconButton>
        </Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0 10px',
            gap: '2px',
        }}>
            <Typography 
                variant="subtitle2" 
                sx={{
                    fontWeight: 'bold'
                }}
            >
                {`${post.likedBy.length} ${post.likedBy.length === 1 ? 'like' : 'likes'}`}
            </Typography>
            <Typography 
                variant='subtitle2' 
                sx={{ fontWeight: '400'}}
                component="p"
                onClick={ (e) => {
                    if(!(e.target === e.currentTarget)) return 
                    if(readMore || post.desc.length < 100 ) navigate(`/comments/${post.id}`)
                    else setReadMore(true)
                    }}
                >
                <Typography 
                    variant="subtitle2" 
                    sx={{ fontWeight: 'bold', marginRight: '3px'}} 
                    component="span"
                    onClick={ () => navigate(`/${author.userName}`) }
                >
                        {author.userName}
                </Typography>
                    {readMore ? post.desc : 
                        post.desc.length >= 100 ? `${post.desc.slice(0,100)}...more` : post.desc }
            </Typography>
            {post.comments.length > 0 && 
                <Typography 
                    variant='body2' 
                    // sx={{
                    //     color: 'rgba(0,0,0,0.7)'
                    // }}
                >
                <Link to={`/comments/${post.id}`}>
                    See {post.comments.length} comments
                </Link>
            </Typography>}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
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
            <Typography variant='caption' 
                // sx={{
                //     color: 'rgba(0,0,0,0.7)'
                // }}
            >
                {passedTime}
            </Typography>
        </Box>
        </>}
    </Paper>
    }
    </>
  )
}

export default Post