import React, { useEffect, useState } from 'react';
import {Avatar, Box, TextField, Typography, Paper, Modal} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import { getSingleDoc, updateDocument } from '../firebase';
import { openModal } from '../store/modalSlice'
import { useDispatch } from 'react-redux';
function Post({id, userId, url, likedBy, comments, desc}) {

    const [liked, setLiked] = useState(null);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch()

    const handleDoubleClick = (e) => {
        if(e.detail === 2) {
            setLiked(true)
        }
    }

    const handleLike = () => {
        console.log('halo')
        if( likedBy.includes('MTfXXUFnty5Y6l3AaWJY') ) {
            updateDocument('posts', id, {
                likedBy: [...likedBy.filter(userLike => userLike !== 'MTfXXUFnty5Y6l3AaWJY')]
            })
            updateDocument('users', 'MTfXXUFnty5Y6l3AaWJY', {
                likedPosts: [...user.likedPosts.filter(likedPost => likedPost !== id)]
            })
            setLiked(false)
        }  else {
            updateDocument('posts', id, {
                likedBy: [...likedBy, 'MTfXXUFnty5Y6l3AaWJY']
            })
            updateDocument('users', 'MTfXXUFnty5Y6l3AaWJY', {
                likedPosts: [...user.likedPosts, id]
            })
            setLiked(true)
        }
    }

    const handleOpenModal = () => {
        dispatch(openModal(id))
    }
    useEffect( () => {
        // console.log('now')
    }, [liked])

    useEffect( () => {
        const fetchUser = async () => {
            const userFetch = await getSingleDoc('users', userId);
            setUser(userFetch)
            setLiked( userFetch.likedPosts.includes(id) )
        }
        fetchUser()
    }, [])

  return (
    <Paper elevation={2} square sx={{
        display: 'flex',
        flexDirection: 'column',
    }}>
        {user && <>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 10px'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap:'10px'
            }}>
                <Avatar src={user.image} alt={user.userName}/>
                <Typography  variant='subtitle2'>{user.userName}</Typography>
            </Box>
            <MoreVertIcon 
                sx={{
                    cursor: 'pointer'
                }}
                onClick={ handleOpenModal }
            />
        </Box>
        <img onClick={(e)=>handleDoubleClick(e)} src={url} alt="" />
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px 10px',
        }}>
            <Box sx={{
                display: 'flex',
                gap: '5px',
            }}>
                 {/* (user && user.likedPosts.includes(id) ) */}
                { liked ? 
                    <FavoriteIcon 
                        sx={{ 
                            color: 'red'
                        }} 
                        onClick={ () => handleLike() }
                    /> : 
                    <FavoriteBorderIcon 
                        onClick={ () => handleLike() }
                    />
                }
                <ChatBubbleOutlineOutlinedIcon />
                <SendRoundedIcon />
            </Box>
            <BookmarkBorderOutlinedIcon />
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
                {`${likedBy.length} ${likedBy.length === 1 ? 'like' : 'likes'}`}
            </Typography>
            <Typography variant='subtitle2' sx={{ fontWeight: '400'}}component="p">
                <Typography 
                    variant="subtitle2" 
                    sx={{ fontWeight: 'bold', marginRight: '3px'}} 
                    component="span"
                >
                    {user.userName}
                </Typography>
                {desc}
            </Typography>
            {comments.length>0 && <Typography variant='body2' sx={{
                color: 'rgba(0,0,0,0.7)'
            }}>
                See {comments.length} comments
            </Typography>}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <Avatar  src='/images/profile.png' alt='name' sx={{ width: '35px', height: '35px'}}/>
                <TextField placeholder="Add comment..." variant="standard" />
            </Box>
            <Typography variant='caption' sx={{
                color: 'rgba(0,0,0,0.7)'
            }}>
                10 hours ago
            </Typography>
        </Box>
        </>}
    </Paper>
  )
}

export default Post