import { Box, FormControlLabel, IconButton, Modal, Paper, Switch, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useDispatch } from 'react-redux';
import { openModal, setOption } from '../store/modalSlice';

function Settings() {
    const navigate = useNavigate();
    const [darkTheme, setDarkTheme] = useState(false);
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(openModal())
        dispatch(setOption('deleteUserModal'))
    }
  return (
    <Paper 
        elevation={2}
        sx={{ 
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            paddingBottom: '20px',
            height: '100vh',
            // 'button' : {
            //     color : 'black'
            // }
        }}
    >
        <Box 
            sx={{
                display: 'flex',
                // justifyContent: 'space-between',
                padding: '5px 10px',
                alignItems: 'center',
                gap:'20px',
            }}
        > 
            <IconButton onClick={ () => navigate(-1) }>
                <ArrowBackRoundedIcon />
            </IconButton>
            <Typography variant='h6' component="h1">
                Settings
            </Typography>
        </Box>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <FormControlLabel
            control={
                <Switch checked={darkTheme} onChange={ () => setDarkTheme(!darkTheme) } name="Dark theme" />
            }
            label="Dark theme"
            />
            <FormControlLabel
                control={
                    <IconButton onClick={ handleOpenModal }>
                        <DeleteRoundedIcon />
                    </IconButton>
                }
                label="Delete account"
            >
            </FormControlLabel>
        </Box>
    </Paper>
  )
}

export default Settings