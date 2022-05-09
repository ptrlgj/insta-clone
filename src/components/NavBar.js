import React from 'react'
import { Avatar, BottomNavigationAction, Box, Paper } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MusicVideoRoundedIcon from '@mui/icons-material/MusicVideoRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import {Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
function NavBar() {
  const {userName, image} = useSelector(state => state.user)
  return (
    <Paper 
        sx={{ 
            position: 'fixed', 
            bottom: 0, 
            left: '50%',
            transform: 'translateX(-50%)', 
            width: '466px' 
        }} 
        elevation={1}
    >
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Link to="/"><BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} /></Link>
          <BottomNavigationAction label="Explore" icon={<SearchRoundedIcon />} />
          <BottomNavigationAction label="TikReels" icon={<MusicVideoRoundedIcon />} />
          <BottomNavigationAction label="Store" icon={<ShoppingBagRoundedIcon />} />
          <Link to={`/${userName}`}><BottomNavigationAction label="Profile" icon={<Avatar src={image}/>} /></Link>
        </Box>
      </Paper>
  )
}

export default NavBar