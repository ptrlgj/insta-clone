import { Avatar, Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, styled, Typography, TextField } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { v4 } from 'uuid';
import { useUser } from '../hooks/useUser';
import { useCreateUser } from '../hooks/useCreateUser';
import { useCreateProfile } from '../hooks/useCreateProfile';
import { useImageUrl } from '../hooks/useImageUrl';

const Input = styled('input')({
    display: 'none'
})
function CreateUser() {
    const navigate = useNavigate();
    const { uid } = useUser()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPass, setConfPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [bio, setBio] = useState('');
    const [imageFile, setImageFile] = useState('');
    const imageId = v4();
    const imageUrl = useImageUrl(imageFile, imageId)
    const createUser = useCreateUser(email, password, confPass)
    const createProfile = useCreateProfile(email, password, imageUrl, userName, fullName, bio, uid)

    const handleCreateUser = () => createUser()

    const handleCreateProfile = () => createProfile()

  return (
    <Paper 
        elevation={2}
        sx={{ 
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            paddingBottom: '20px',
            height: '100vh',
            'button' : {
                color : 'text.primary'
            }
        }}
    >
        <Box 
            sx={{
                display: 'flex',
                padding: '5px 10px',
                alignItems: 'center',
                gap:'20px',
            }}
        > 
            <IconButton onClick={ () => navigate('/') }>
                <ArrowBackRoundedIcon />
            </IconButton>
            <Typography variant='h6' component="h1">
                Create user
            </Typography>
        </Box>
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '30px 0'
            }}
        >
            {uid ? 
            <>
                <label htmlFor="upload-image">
                    <Input accept='image/*' type="file" id='upload-image' onChange={e => setImageFile(e.target.files[0])}/>
                    <Avatar sx={{ width: 100, height: 100, cursor: 'pointer' }} src={imageUrl} />
                </label>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="userName-input">Username</InputLabel>
                    <OutlinedInput
                        id="userName-input"
                        label="userName"
                        required
                        value={userName}
                        onChange={ (e) => setUserName(e.target.value)}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="fullName-input">Fullname</InputLabel>
                    <OutlinedInput
                        id="fullName-input"
                        label="Fullname"
                        required
                        value={fullName}
                        onChange={ (e) => setFullName(e.target.value)}
                    />
                </FormControl>
                <TextField
                    id="outlined-textarea"
                    label="Bio"
                    placeholder="Bio"
                    multiline
                    value={bio}
                    onChange={ (e) => setBio(e.target.value)}
                />
                <Button onClick={ handleCreateProfile }>Save profile</Button>
            </>
            :
            <>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="email-input">Email</InputLabel>
                    <OutlinedInput
                        id="email-input"
                        label="Email"
                        required
                        value={email}
                        onChange={ (e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="password-input">Password</InputLabel>
                    <OutlinedInput
                        id="password-input"
                        required
                        type={ showPassword ? 'text' : 'password'}
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={ () => setShowPassword(!showPassword) }
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="confirm-input">Confirm</InputLabel>
                    <OutlinedInput
                        id="confirm-input"
                        required
                        label="Password"
                        type='password'
                        value={confPass}
                        onChange={ (e) => setConfPass(e.target.value) }
                    />
                </FormControl>
                <Button onClick={ handleCreateUser }>Create</Button>
            </>}
        </Box>
    </Paper>
  )
}

export default CreateUser