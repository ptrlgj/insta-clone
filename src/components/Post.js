import React, { useEffect, useState } from 'react';
import { Avatar, Box, TextField, Typography, Paper, Button, IconButton, styled } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { getSingleDoc, db } from '../firebase';
import { openModal, setOption } from '../store/modalSlice'
import { setLoading } from '../store/postsSlice';
import { useDispatch } from 'react-redux';
import { onSnapshot, doc } from 'firebase/firestore';
import { timePassed } from '../utils'
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { usePosts } from '../hooks/usePosts';
import { useSubmitComment } from '../hooks/useSubmitComment';
import { useUpdateDesc } from '../hooks/useUpdateDesc';
import { useLikePost } from '../hooks/useLikePost';
import { useDoubleClickLike } from '../hooks/useDoubleClickLike';
import { useIsPostLiked } from '../hooks/useIsPostLiked';

const Img = styled('img')({
    position: 'relative',
    width: '100%',
    objectFit: 'contain'
})

const Post = React.forwardRef(({data}, ref) => {

    const user = useUser()
    const [post, setPost] = useState(data);
    const liked = useIsPostLiked(user, post)
    const [author, setAuthor] = useState(null);
    const passedTime = timePassed(data);
    const [inputComment, setInputComment] = useState('');
    const [readMore, setReadMore] = useState(false);
    const { editPost } = usePosts()
    const [newDesc, setNewDesc] = useState(post.desc);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitComment = useSubmitComment(user, post, inputComment, setInputComment)
    const updateDesc = useUpdateDesc(post, newDesc)
    const likePost = useLikePost(user, post)
    const doubleClickLike = useDoubleClickLike(user, post)
    const handleDoubleClick = async (e) => doubleClickLike(e)

    const handleLike = async () => likePost()

    const handleOpenModal = () => {
        dispatch(openModal(post))
        dispatch(setOption('postModal'))
    }

    const handleSubmitComment = async () => submitComment()

    const handleChangeDesc = async () => updateDesc()

    useEffect( () => {
        const fetchAuthor = async () => {
            const userFetch = await getSingleDoc('users', post.userId);
            setAuthor(userFetch)
        }
        fetchAuthor() 

        const postSnapshot = onSnapshot( doc(db, 'posts', post.id), snapshot => {
            if(!snapshot.data()) return
            setPost(currState => ({...currState, likedBy: snapshot.data().likedBy, comments: snapshot.data().comments, desc: snapshot.data().desc}) )
        }) 
        
        if(ref){
            dispatch(setLoading(false))
        }
        return () => postSnapshot()
    }, [])

  return (
    <>
    {author?.userName &&
    <Paper 
        elevation={2} 
        square 
        sx={{
            display: 'flex',
            flexDirection: 'column',
        }}
        ref={ref}
    >
        {author && <>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 10px',
            'button' : {
                color: 'text.primary'
            }
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
            'button' : {
                color: 'text.primary'
            }
        }}>
            <Box sx={{
                display: 'flex',
            }}>
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
                <IconButton disabled>
                    <SendRoundedIcon />
                </IconButton>
            </Box>
            <IconButton disabled>
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
            {editPost === post.id ? 
                <Box 
                    sx={{
                        display: 'flex',
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
                    <TextField label="caption" value={newDesc}  onChange={ (e) => setNewDesc(e.target.value) }multiline />
                    {newDesc !== post.desc ? 
                        <Button onClick={ handleChangeDesc }>Save</Button>
                        :
                        <Button disabled>Save</Button>
                    }
                </Box>
                :
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
            }
            {post.comments.length > 0 && 
                <Typography 
                    variant='body2' 
                    sx={{
                        color: 'text.secondary'
                    }}
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
                sx={{
                    color: 'text.secondary'
                }}
            >
                {passedTime}
            </Typography>
        </Box>
        </>}
    </Paper>
    }
    </>
  )
})

export default Post