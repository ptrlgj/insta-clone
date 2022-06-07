import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { auth, getUserBy, usersColRef } from '../firebase';
import { useDispatch } from 'react-redux';
import { query, where } from 'firebase/firestore';
import { setUser } from '../store/userSlice';
import { closeModal } from '../store/modalSlice';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { showAlert } from '../store/alertSlice';

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logInUser = async (email, pass) => {
      try {
        const user = await signInWithEmailAndPassword(
            auth,
            email,
            pass
        )
        dispatch(showAlert({type: 'success', message: 'User logged in successfully'}))
        return user
      } catch (error) {
        dispatch(showAlert({type: 'error', message: error.message}))
      }
    }
    
    const handleLogin = async () => {
      try {
        const userToken = await logInUser(email, password);
        if(userToken){
            const q = query(usersColRef, where('uid','==',userToken.user.uid))
            const response = await getUserBy(q)
            dispatch(setUser(response[0]))
            dispatch(closeModal())
        }
      } catch (error) {
        dispatch(showAlert({type: 'error', message: error.message}))
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