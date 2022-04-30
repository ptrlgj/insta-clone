import React, { useState } from 'react';
import {Avatar, Box, TextField, Typography, Paper} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

function Post({id, author, download_url, profile, comments, likes}) {
    const [liked, setLiked] = useState(false);
    const handleClick = (e) => {
        if(e.detail === 2) {
            setLiked(true)
        }
    }
  return (
    <Paper elevation={2} square sx={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10px'
    }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px 10px'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap:'10px'
            }}>
               <Avatar src={profile} alt="Name"/>
                <Typography  variant='subtitle2'>{author}</Typography>
            </Box>
            <MoreVertIcon />
        </Box>
        <img onClick={(e)=>handleClick(e)} src={download_url} alt="" />
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px 10px',
        }}>
            <Box sx={{
                display: 'flex',
                gap: '5px',
            }}>
                {liked ? 
                    <FavoriteIcon 
                        sx={{ 
                            color: 'red'
                        }} 
                        onClick={()=>setLiked(!liked)}
                    /> : 
                    <FavoriteBorderIcon 
                        onClick={()=>setLiked(!liked)}
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
                {`${likes} ${likes === 1 ? 'like' : 'likes'}`}
            </Typography>
            <Typography variant='subtitle2' sx={{ fontWeight: '400'}}component="p">
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginRight: '3px'}} component="span">name</Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, quas.
            </Typography>
            <Typography variant='body2' sx={{
                color: 'rgba(0,0,0,0.7)'
            }}>
                See {10} comments
            </Typography>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <Avatar  src='/images/profile.png' alt='name' sx={{ width: '35px', height: '35px'}}/>
                <TextField placeholder="Add comment..."variant="standard" />
            </Box>
            <Typography variant='caption' sx={{
                color: 'rgba(0,0,0,0.7)'
            }}>
                10 hours ago
            </Typography>
        </Box>
    </Paper>
  )
}

export default Post