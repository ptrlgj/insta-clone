import React from 'react'
import { Avatar, Box, IconButton, Paper } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MusicVideoRoundedIcon from '@mui/icons-material/MusicVideoRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { openModal, setOption } from '../store/modalSlice';
import { useUser } from '../hooks/useUser';
function NavBar() {
  const { uid, userName, image } = useUser()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleProfileButton = () => {
    if(userName) navigate(`/${userName}`)
    else if (uid) navigate('/signup')
    else {
      dispatch(openModal())
      dispatch(setOption('loginModal'))
    }
  }
  return (
    <Paper 
        sx={{ 
            position: 'fixed', 
            bottom: 0, 
            left: '50%',
            transform: 'translateX(-50%)', 
            width: { xs: '100vw', sm: '466px'},
        }} 
        elevation={1}
    >
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
          <IconButton
            onClick={ () => navigate(`/`)}
          ><HomeRoundedIcon /></IconButton>
          <IconButton disabled><SearchRoundedIcon /></IconButton>
          <IconButton disabled><MusicVideoRoundedIcon /></IconButton>
          <IconButton disabled><ShoppingBagRoundedIcon /></IconButton>
          <IconButton 
            onClick={ handleProfileButton }
          >
            <Avatar src={image} />
          </IconButton>
        </Box>
      </Paper>
  )
}

export default NavBar