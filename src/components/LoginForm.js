import { Button, InputAdornment, styled, TextField } from '@mui/material';
import React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { closeModal } from '../store/modalSlice';
import { useNavigate } from 'react-router-dom';
import { useLogInUser } from '../hooks/useLogInUser';
import { useLogInUserGetData } from '../hooks/useLogInUserGetData';
import { useFormik } from 'formik'

const Form = styled('form')({
  width: "60%",
  display: "flex",
  gap: "10px",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: '10px',
  '& > *': {
    width:'100%'
  }
})

const Input = styled('input')({
  display: 'none',
  paddingRight: '0px'
})

const Label = styled('label')({
  display: 'flex',
  justifyContent: 'center',
})

function LoginForm() {

  const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
        showPassword: false,
      },
      onSubmit: () => logInUserGetData()
    })
    
  const logInUser = useLogInUser(formik.values.email, formik.values.password);
  const logInUserGetData = useLogInUserGetData(logInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = () => {
      dispatch(closeModal())
      navigate('/signup')
  }
  return (
    <Form
      onSubmit={formik.handleSubmit}
    >
      <TextField 
        id="email" 
        label="Email" 
        variant="outlined" 
        value={formik.values.email}
        onChange={formik.handleChange}
        required
      />
      <TextField 
        id="password" 
        label="Password" 
        variant="outlined" 
        type={formik.values.showPassword ? 'text' : 'password'}
        value={formik.values.password}
        onChange={formik.handleChange}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end"
            >
              <Label htmlFor="showPassword">
                <Input
                  type="checkbox"
                  id="showPassword"
                  value={formik.values.showPassword}
                  onChange={formik.handleChange}
                /> 
                {formik.values.showPassword ? <Visibility/> : <VisibilityOff />}
              </Label>
            </InputAdornment>
          ),
        }}
      />
      <Button variant='text' size='small' onClick={ handleSignup }>Create an account</Button>
      {formik.values.email && formik.values.password ? 
        <Button variant='outlined' type='submit'>Login</Button> :
        <Button variant='outlined' disabled>Login</Button>
      }
    </Form>
  )
}

export default LoginForm