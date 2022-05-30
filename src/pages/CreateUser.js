import { Avatar, Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, styled, Typography, TextField } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { auth, createUserProfile, fetchLoggedUser, getImageUrl, signUpUser } from '../firebase';
import { v4 } from 'uuid';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { showAlert } from '../store/alertSlice';

const Input = styled('input')({
    display: 'none'
})

function CreateUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [uid, setUid] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPass, setConfPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [bio, setBio] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [imageId, setImageId] = useState(v4());
    const [imageUrl, setImageUrl] = useState('');

    const handleCreateUser = async () => {
        if(email && password === confPass){
            const data = await signUpUser(email, password);
            setUid(data.user.uid)
        }
    }

    const handleCreateProfile = async () => {
        if(imageUrl && userName){
            await createUserProfile( userName, fullName, bio, imageUrl, uid)
            await signInWithEmailAndPassword(auth, email, password)
            navigate(`/`)
            dispatch(showAlert({type: 'success', message: 'New user has been created and logged in'}))
            fetchLoggedUser(uid).then( res => dispatch(setUser(res)))
        }
    }
    useEffect( () => {
        if(imageFile) {
            getImageUrl( imageFile, imageId )
                .then(res => setImageUrl(res))
        }
    }, [imageFile] )

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
                // justifyContent: 'space-between',
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