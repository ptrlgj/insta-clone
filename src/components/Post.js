import React from 'react';
import {Avatar, Box, TextField, Typography} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

function Post() {
  return (
    <Box sx={{
        width: '466px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'lightcoral'
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
               <Avatar alt="Name"/>
               <h4>name</h4>
            </Box>
            <MoreVertIcon />
        </Box>
        <img src="/images/post0.jpg" alt="" />
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px 10px',
        }}>
            <Box sx={{
                display: 'flex',
                gap: '5px',
            }}>
                <FavoriteBorderIcon />
                <ChatBubbleOutlineOutlinedIcon />
                <SendOutlinedIcon />
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
                666 likes
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
                <Avatar alt='name'/>
                <TextField placeholder="Add comment..."variant="standard" />
            </Box>
            <Typography variant='caption' sx={{
                color: 'rgba(0,0,0,0.7)'
            }}>
                10 hours ago
            </Typography>
        </Box>
    </Box>
  )
}

export default Post