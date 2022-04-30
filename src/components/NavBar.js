import React from 'react'
import { Avatar, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MusicVideoRoundedIcon from '@mui/icons-material/MusicVideoRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import {Link } from 'react-router-dom';
function NavBar() {
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
        <BottomNavigation sx={{display: 'flex', alignItems: 'center'}}>
          <Link to="/"><BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} /></Link>
          <BottomNavigationAction label="Explore" icon={<SearchRoundedIcon />} />
          <BottomNavigationAction label="TikReels" icon={<MusicVideoRoundedIcon />} />
          <BottomNavigationAction label="Store" icon={<ShoppingBagRoundedIcon />} />
          <Link to="/user/123"><BottomNavigationAction label="Profile" icon={<Avatar />} /></Link>
        </BottomNavigation>
      </Paper>
  )
}

export default NavBar