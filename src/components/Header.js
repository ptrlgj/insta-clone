import React from 'react'
import { Typography, Box, Paper, Avatar, Tabs, Tab } from '@mui/material'
import { styled } from '@mui/material/styles';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Link } from 'react-router-dom';

function Header() {
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
                gap: '20px'
            }}>
                <Link to="/add">
                    <AddBoxOutlinedIcon />
                </Link>
                <FavoriteBorderRoundedIcon />
                <SendRoundedIcon />
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