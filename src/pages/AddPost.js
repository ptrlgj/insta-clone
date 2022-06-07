import React, { useEffect, useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Box, Button, TextField, Typography, Paper, IconButton } from '@mui/material';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { addPost, updateDocument, getImageUrl, getSingleDoc } from '../firebase';
import { v4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { getActiveUser } from '../store/userSlice';
import { showAlert } from '../store/alertSlice';
import { setPosts } from '../store/postsSlice';
import { useUser } from '../hooks/useUser';
import { usePosts } from '../hooks/usePosts';
import { useImageUrl } from '../hooks/useImageUrl';

const Input = styled('input')({
    display: 'none',
  });

const Img = styled('img')({
    maxWidth:'100%',
    maxHeight:'100%',
 
  });


function AddPost() {

    const [imageFile, setImageFile] = useState(null);
    const [imageId, setImageId] = useState(v4());
    const imageUrl = useImageUrl(imageFile, imageId)
    const [desc, setDesc] = useState('')
    const user = useUser()
    const { posts } = usePosts()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = async () => {
        try {
            const createdPost = await addPost(imageId, user.id, imageUrl, desc);
            await updateDocument('users', user.id, { posts: [...user.posts, createdPost.id] })
            dispatch(getActiveUser(user.id))
            dispatch(showAlert({type: 'success', message: 'New post has been succesfully added'}))
            const createdPostData = await getSingleDoc('posts', createdPost.id)
            dispatch(setPosts([createdPostData, ...posts]))
        } catch (error) {
            dispatch(showAlert({type: 'error', message: error.message}))
        }
        navigate('/')
    }

    const handleChooseImage = (e)=>{
        setImageFile(e.target.files[0])
    }

  return (
    <Paper sx={{paddingBottom: '20px', height: '100vh', display: 'flex', flexDirection: 'column', gap: '30px'}}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding:"5px 5px",
            'button' : {
                color : 'text.primary'
            }
        }}>
            <IconButton onClick={ () => navigate('/')}>
                    <CloseRoundedIcon />
            </IconButton>
            <Typography variant="h6" sx={{flex: '1'}}>New post</Typography>
            {imageUrl ? 
                <IconButton onClick={handleClick}>
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
                alignItems: 'center', 
                justifyContent: 'center',
                objectFit: 'cover'
            }}
        >
            {imageUrl ? 
                <Img src={imageUrl} alt=''/> 
                : 
                <Typography variant='h5' component='p'>Select image</Typography> 
            }
        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',}}>
            <label htmlFor="contained-button-file">
                {!imageFile &&<Input 
                    accept="image/*" 
                    id="contained-button-file" 
                    multiple type="file" 
                    onChange={ handleChooseImage }
                />}
                <Button variant={imageFile ? "disabled" : "contained"} component="span">
                {imageFile ? "Selected" : "Select file"}
                </Button>
            </label>
        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            }}
        >
            <TextField
                id="outlined-textarea"
                label="Description"
                placeholder=""
                multiline
                value={desc}
                onChange={ (e) => setDesc( e.target.value ) }
            />
        </Box>
    </Paper>
  )
}

export default AddPost