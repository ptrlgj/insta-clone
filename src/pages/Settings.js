import { Avatar, Box, FormControlLabel, IconButton, Paper, styled, Switch, TextField, Typography } from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useDispatch } from 'react-redux';
import { openModal, setOption } from '../store/modalSlice';
import { showAlert } from '../store/alertSlice';
import { v4 } from 'uuid';
import { useUser } from '../hooks/useUser';
import { useImageUrl } from '../hooks/useImageUrl';
import { useChangeTheme } from '../hooks/useChangeTheme';
import { useSaveSettings } from '../hooks/useSaveSettings';

const Input = styled('input')({
    display: 'none'
})

function Settings() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useUser()
    const id = v4()
    const [imageFile, setImageFile] = useState(null)
    const avatarUrl = useImageUrl(imageFile, id) || user.image
    const [userName, setUserName] = useState(user.userName)
    const [fullName, setFullName] = useState(user.fullName)
    const [bio, setBio] = useState(user.bio)
    const isChanged = (userName !== user.userName || fullName !== user.fullName || bio !== user.bio || avatarUrl !== user.image) && (userName !== '' && fullName !== '' && bio !== '' && avatarUrl !== '');
    const changeTheme = useChangeTheme(user)
    const saveChanges = useSaveSettings(userName, user, avatarUrl, fullName, bio)

    const handleOpenModal = () => {
        dispatch(openModal());
        dispatch(setOption('deleteUserModal'));
        dispatch(showAlert({type: 'warning', message: 'This user and its posts will be permamently deleted'}));
    }

    useEffect( () => {
        if(!user.loggedIn){
            dispatch(openModal());
            dispatch(setOption('loginModal'));
        }
    }, [])

    const handleChangeTheme = () => changeTheme()

    const handleSaveChanges = () => saveChanges()
  return (
    <Paper 
        elevation={2}
        sx={{ 
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: '20px',
            height: '100vh',
        }}
    >
        {user.loggedIn && <>
        <Box 
            sx={{
                display: 'flex',
                padding: '5px 10px',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap:'20px',
            }}
        > 
            <IconButton onClick={ () => navigate(-1) }>
                <ArrowBackRoundedIcon />
            </IconButton>
            <Typography variant='h6' component="h1" sx={{flex: 1}}>
                Settings
            </Typography>
            {isChanged ? 
                <IconButton onClick={ handleSaveChanges }>
                    <CheckRoundedIcon 
                        sx={{color:'#1976d2'}}
                    /> 
                </IconButton>
                : 
                <IconButton disabled>
                    <CheckRoundedIcon sx={{ color:'gray'  }}/>
                </IconButton> 
            }
        </Box>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px'
            }}
        >
            <FormControlLabel
            control={
                <Switch checked={user.settings.darkTheme} onChange={ handleChangeTheme } name="Dark theme" />
            }
            label="Dark theme"
            />
            <label htmlFor="upload-image">
                <Input accept='image/*' type="file" id='upload-image' onChange={e => setImageFile(e.target.files[0])}/>
                <Avatar sx={{ width: 100, height: 100, cursor: 'pointer' }} src={avatarUrl} />
            </label>
            <TextField label="user name" variant="outlined" value={ userName } onChange={ (e) => setUserName(e.target.value) }/>
            <TextField label="full name" variant="outlined" value={ fullName } onChange={ (e) => setFullName(e.target.value) }/>
            <TextField label="bio" variant="outlined" value={ bio } onChange={ (e) => setBio(e.target.value) }multiline/>

            <FormControlLabel
                sx={{
                    color: 'red',
                    'button': {
                        color: 'red'
                    }
                }}
                control={
                    <IconButton onClick={ handleOpenModal }>
                        <DeleteRoundedIcon />
                    </IconButton>
                }
                label="Delete account"
            >
            </FormControlLabel>
        </Box>
        </>}
    </Paper>
  )
}

export default Settings