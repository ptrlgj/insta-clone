import React from 'react'
import { Avatar, BottomNavigationAction, Box, IconButton, Paper } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MusicVideoRoundedIcon from '@mui/icons-material/MusicVideoRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import {Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { openModal, setOption } from '../store/modalSlice';
function NavBar() {
  const { uid, userName, image } = useSelector(state => state.user);
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
          <IconButton><SearchRoundedIcon /></IconButton>
          <IconButton><MusicVideoRoundedIcon /></IconButton>
          <IconButton><ShoppingBagRoundedIcon /></IconButton>
          <IconButton 
            onClick={ handleProfileButton }
          ><Avatar src={image} /></IconButton>
          {/* <Link to="/"><BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} /></Link>
          <BottomNavigationAction label="Explore" icon={<SearchRoundedIcon />} />
          <BottomNavigationAction label="TikReels" icon={<MusicVideoRoundedIcon />} />
          <BottomNavigationAction label="Store" icon={<ShoppingBagRoundedIcon />} />
          <BottomNavigationAction label="Profile" icon={<Avatar src={image} />} 
            onClick={ () => {
              if(userName) navigate(`/${userName}`)
              else {
                dispatch(openModal())
                dispatch(setOption('loginModal'))
              }
            }}
          /> */}
        </Box>
      </Paper>
  )
}

export default NavBar