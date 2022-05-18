import React from 'react'
import { Typography, Box, Paper, Avatar, Tabs, Tab, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, setOption } from '../store/modalSlice';

const StyledBox = styled(Box)(({theme}) => ({
    
    '.MuiTabScrollButton-root': {
        'alignSelf': 'center',
        'width': '20px',
        'height': '20px',
        'backgroundColor': 'white',
        'borderRadius': '50%',
      },
    '.MuiTabs-root': {
      'backgroundColor': 'none',
    },
    '.MuiTab-root': {
        'minWidth': '55px',
        'minHeight': '50px',
    },
}))
function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector( state => state.user )
    const handleAddPost = () => {
        if(user.loggedIn) navigate('/add')
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
                    color : 'black'
                }
            }}>
                <IconButton onClick={ handleAddPost }>
                    <AddBoxOutlinedIcon />
                </IconButton>
                <IconButton>
                    <FavoriteBorderRoundedIcon />
                </IconButton>
                <IconButton>
                    <SendRoundedIcon />
                </IconButton>
            </Box>
        </Box>
        {/* <StyledBox>
            <Tabs
                // value={value}
                // onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab label={<Avatar src='/images/profile.png' />} />
                <Tab label={<Avatar />} />
                <Tab label={<Avatar />} />
                <Tab label={<Avatar />} />
                <Tab label={<Avatar />} />
                <Tab label={<Avatar />} />
                <Tab label={<Avatar />} />
                <Tab label={<Avatar />} />
                <Tab label={<Avatar />} />
                <Tab label={<Avatar />} />
                <Tab label={<Avatar />} />
                <Tab label={<Avatar />} />
                <Tab label={<Avatar />} />
                <Tab label={<Avatar />} />
            </Tabs>
        </StyledBox> */}
    </Paper>
  )
}

export default Header