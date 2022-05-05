import React from 'react'
import { Avatar, BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
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
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Link to="/"><BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} /></Link>
          <BottomNavigationAction label="Explore" icon={<SearchRoundedIcon />} />
          <BottomNavigationAction label="TikReels" icon={<MusicVideoRoundedIcon />} />
          <BottomNavigationAction label="Store" icon={<ShoppingBagRoundedIcon />} />
          <Link to="/piopiopio"><BottomNavigationAction label="Profile" icon={<Avatar src='https://firebasestorage.googleapis.com/v0/b/insta-clone-7dc70.appspot.com/o/images%2F972ed9a8-6c05-4ed4-a01b-716191a76363?alt=media&token=d3a3daf3-d7f7-43d3-b142-37e0d2f268b3'/>} /></Link>
        </Box>
      </Paper>
  )
}

export default NavBar