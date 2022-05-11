import React, { useEffect, useState } from 'react';
import {Avatar, Box, TextField, Typography, Paper, Modal} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import { getSingleDoc, updateDocument, db } from '../firebase';
import { openModal } from '../store/modalSlice'
import { useDispatch, useSelector } from 'react-redux';
import { onSnapshot, doc } from 'firebase/firestore';
import { getActiveUser } from '../store/userSlice';
function Post({data}) {

    const [liked, setLiked] = useState(null);
    const [author, setAuthor] = useState(null);
    const user = useSelector( state => state.user);
    const [post, setPost] = useState(data)
    const [passedTime, setPassedTime] = useState('')
    const dispatch = useDispatch()
    
    const timePassed = () => {
        const currDate = Date.now()
        const getPassed = currDate - data.createdAt  
        const years = (Math.floor(getPassed / (1000*60*60*24*31*365)))
        const months = (Math.floor(getPassed / (1000*60*60*24*31)))
        const weeks = (Math.floor(getPassed / (1000*60*60*24*7)))
        const days = (Math.floor(getPassed / (1000*60*60*24)))
        const hours = (Math.floor(getPassed / (1000*60*60)))
        const minutes = (Math.floor(getPassed / (1000*60)))
        const seconds = (Math.floor(getPassed / (1000*60)))
        if(years) return (`${years === 1 ? `${years} year ago` : `${years} years ago`}`)
        else if(months) return (`${months === 1 ? `${months} month ago` : `${months} months ago`}`)
        else if(weeks) return (`${ weeks === 1 ? `${weeks} week ago` : `${weeks} weeks ago`}`)
        else if(days) return (`${ days === 1 ? `${days} day ago` : `${days} days ago`}`)
        else if(hours) return (`${ hours === 1 ? `${hours} hour ago` : `${hours} hours ago`}`)
        else if(minutes) return (`${ minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`}`)
        else if(seconds) return (`${ seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`}`)
    }

    const handleDoubleClick = (e) => {
        if(e.detail === 2) {
            if( !post.likedBy.includes('MTfXXUFnty5Y6l3AaWJY') ){
                updateDocument('posts', post.id, {
                    likedBy: [...post.likedBy, 'MTfXXUFnty5Y6l3AaWJY']
                })
                updateDocument('users', 'MTfXXUFnty5Y6l3AaWJY', {
                    likedPosts: [...user.likedPosts, post.id]
                })
                dispatch(getActiveUser('MTfXXUFnty5Y6l3AaWJY'))
                setLiked(true)
            }
        }
    }

    const handleLike = () => {
        if( post.likedBy.includes('MTfXXUFnty5Y6l3AaWJY') ) {
            updateDocument('posts', post.id, {
                likedBy: [...post.likedBy.filter(userLike => userLike !== 'MTfXXUFnty5Y6l3AaWJY')]
            })
            updateDocument('users', 'MTfXXUFnty5Y6l3AaWJY', {
                likedPosts: [...user.likedPosts.filter(likedPost => likedPost !== post.id)]
            })
            dispatch(getActiveUser('MTfXXUFnty5Y6l3AaWJY'))
            setLiked(false)
        } else {
            updateDocument('posts', post.id, {
                likedBy: [...post.likedBy, 'MTfXXUFnty5Y6l3AaWJY']
            })
            updateDocument('users', 'MTfXXUFnty5Y6l3AaWJY', {
                likedPosts: [...user.likedPosts, post.id]
            })
            dispatch(getActiveUser('MTfXXUFnty5Y6l3AaWJY'))
            setLiked(true)
        }
    }

    const handleOpenModal = () => {
        dispatch(openModal(post.id))
    }

    useEffect( () => {
        const fetchAuthor = async () => {
            const userFetch = await getSingleDoc('users', post.userId);
            setAuthor(userFetch)
        }
        fetchAuthor() 
        setPassedTime(timePassed())

        const postSnapshot = onSnapshot( doc(db, 'posts', post.id), snapshot => {
            if(!snapshot.data()) return
            setPost(currState => ({...currState, likedBy: snapshot.data().likedBy}) )
        }) 
        
        return () => postSnapshot()
    }, [])
    
    useEffect( () => {
        setLiked( user.likedPosts.includes(post.id) )
    } ,[ user ])
  return (
    <Paper elevation={2} square sx={{
        display: 'flex',
        flexDirection: 'column',
    }}>
        {author && <>
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
                <Avatar src={author.image} alt={author.userName}/>
                <Typography  variant='subtitle2'>{author.userName}</Typography>
            </Box>
            <MoreVertIcon 
                sx={{
                    cursor: 'pointer'
                }}
                onClick={ handleOpenModal }
            />
        </Box>
        <img onClick={(e)=>handleDoubleClick(e)} src={post.url} alt="" />
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
                {`${post.likedBy.length} ${post.likedBy.length === 1 ? 'like' : 'likes'}`}
            </Typography>
            <Typography variant='subtitle2' sx={{ fontWeight: '400'}}component="p">
                <Typography 
                    variant="subtitle2" 
                    sx={{ fontWeight: 'bold', marginRight: '3px'}} 
                    component="span"
                >
                    {author.userName}
                </Typography>
                {post.desc}
            </Typography>
            {post.comments.length>0 && <Typography variant='body2' sx={{
                color: 'rgba(0,0,0,0.7)'
            }}>
                See {post.comments.length} comments
            </Typography>}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <Avatar  src={user.image} alt={user.userName} sx={{ width: '35px', height: '35px'}}/>
                <TextField placeholder="Add comment..." variant="standard" />
            </Box>
            <Typography variant='caption' sx={{
                color: 'rgba(0,0,0,0.7)'
            }}>
                {passedTime}
            </Typography>
        </Box>
        </>}
    </Paper>
  )
}

export default Post