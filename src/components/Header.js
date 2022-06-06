import React from 'react'
import { Typography, Box, Paper, IconButton } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, setOption } from '../store/modalSlice';
import { useUser } from '../hooks/useUser';


function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useUser()
    const handleAddPost = () => {
        if(user.loggedIn) navigate('/add')
        else if(user.uid) navigate('/signup')
        else {
            dispatch(openModal())
            dispatch(setOption('loginModal'))
        }
    }
  return (
    <Paper square sx={{
        display: 'flex',
        flexDirection: 'column',
    }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px 15px'
        }}>
            <Typography variant='h4' component="h1" sx={{
                fontFamily: 'Satisfy',
            }}>
                Instaclone
            </Typography>
            <Box sx={{
                display: 'flex',
                'button' : {
                    color : 'text.primary'
                }
            }}>
                <IconButton onClick={ handleAddPost }>
                    <AddBoxOutlinedIcon />
                </IconButton>
                <IconButton disabled>
                    <FavoriteBorderRoundedIcon />
                </IconButton>
                <IconButton disabled>
                    <SendRoundedIcon />
                </IconButton>
            </Box>
        </Box>
    </Paper>
  )
}

export default Header