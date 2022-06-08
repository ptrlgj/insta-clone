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
import { useFormik } from 'formik';

const Input = styled('input')({
    display: 'none'
})

const Form = styled('form')({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px 0', 
    gap: '10px',
    '& > *': {
        width: '50%'
    }
})
const Label = styled('label')({
    display: 'flex',
    justifyContent: 'center',
})

function CreateUser() {
    const navigate = useNavigate();
    const { uid } = useUser()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: 'password',
            confPass: '',
            showPassword: false,
            userName: '',
            fullName: '',
            bio: '',
        },
        onSubmit: () => {
            if(uid){
                createProfile()
            } else{
                createUser()
            }
        }
    })
    const [imageFile, setImageFile] = useState('');
    const imageUrl = useImageUrl(imageFile, v4())
    const createUser = useCreateUser(
        formik.values.email, 
        formik.values.password, 
        formik.values.confPass
    )
    const createProfile = useCreateProfile(
        formik.values.email, 
        formik.values.password, 
        imageUrl, 
        formik.values.userName, 
        formik.values.fullName, 
        formik.values.bio, 
        uid
    )


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
        <Form
            onSubmit={formik.handleSubmit}
        >
            {uid ? 
            <>
                <Label htmlFor="upload-image">
                    <Input 
                        accept='image/*' 
                        type="file" 
                        id='upload-image' 
                        onChange={ e => setImageFile(e.target.files[0]) }
                    />
                    <Avatar sx={{ width: 100, height: 100, cursor: 'pointer' }} src={imageUrl} />
                </Label>
                <TextField 
                    id="userName" 
                    label="Username" 
                    variant="outlined" 
                    type="text"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    required
                />
                <TextField 
                    id="fullName" 
                    label="Fullname" 
                    variant="outlined" 
                    type="text"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    required
                />
                <TextField
                    id="bio"
                    label="Bio"
                    variant="outlined"
                    type="text"
                    multiline
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                />
                <Button type="submit">Save profile</Button>
            </>
            :
            <>
                <TextField 
                    id="email" 
                    label="Email" 
                    variant="outlined" 
                    type='text'
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
                <TextField 
                    id="confPass" 
                    label="Confirm" 
                    variant="outlined" 
                    type="password"
                    value={formik.values.confPass}
                    onChange={formik.handleChange}
                    required
                />
                <Button type="submit">Create</Button>
            </>}
        </Form>
    </Paper>
  )
}

export default CreateUser