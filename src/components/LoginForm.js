import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { getUserBy, logInUser, usersColRef } from '../firebase';
import { useDispatch } from 'react-redux';
import { query, where } from 'firebase/firestore';
import { setUser } from '../store/userSlice';
import { closeModal, setOption } from '../store/modalSlice';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const handleLogin = async () => {
        const userToken = await logInUser(email, password);
        if(userToken){
            // console.log(userToken)
            const q = query(usersColRef, where('uid','==',userToken.user.uid))
            const response = await getUserBy(q)
            // console.log(response[0])
            dispatch(setUser(response[0]))
            dispatch(closeModal())
        }
    }

    const handleSignup = () => {
        dispatch(closeModal())
        navigate('/signup')
    }
  return (
    <Box 
        component="form"
        sx={{
            width: "100%",
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: '10px'
        }}
    >
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="email-input">Email</InputLabel>
          <OutlinedInput
            id="email-input"
            label="Email"
            value={email}
            onChange={ e => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <OutlinedInput
            id="password-input"
            value={password}
            onChange={ e => setPassword(e.target.value)}
            type={ showPassword ? 'text' : 'password'}
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={ () => setShowPassword(!showPassword) }
                //   onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button variant='text' size='small' onClick={ handleSignup }>Create an account</Button>
        {email && password ? 
            <Button variant='outlined' onClick={handleLogin}>Login</Button> :
            <Button variant='outlined' disabled>Login</Button>
        }
    </Box>
  )
}

export default LoginForm