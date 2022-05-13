import React, { useEffect, useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Box, Button, TextField, Typography, Paper, IconButton } from '@mui/material';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { storage, addPost, getUser, updateDocument } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveUser } from '../store/userSlice';

const Input = styled('input')({
    display: 'none',
  });

const Img = styled('img')({
    maxWidth:'100%',
    maxHeight:'100%',
 
  });


function AddPost() {

    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [imageId, setImageId] = useState(v4());
    // const [user, setUser] = useState(null);
    const [desc, setDesc] = useState('')
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const uploadImage = () => {
        if(!imageFile) return;
        const imageRef = ref(storage, `images/${imageId}`)
        return uploadBytes(imageRef, imageFile)
    }

    const getImageUrl = async () => {
        const imageListRef = ref(storage, `images/${imageId}`);
        uploadImage()
          .then(()=>{
          getDownloadURL(imageListRef)
            .then(url => {
                setImageUrl(url)
                console.log(url)
            })
        })
    }

    // const fetchUser = async () => {
    //     const user = await getUser('piopiopio');
    //     // console.log(user)
    //     setUser(user[0])
    // }

    const handleClick = async () => {
        const newPost = await addPost(imageId, user.id, imageUrl, desc);
        // console.log(user.id)
        await updateDocument('users', user.id, { posts: [...user.posts, newPost.id] })
        dispatch(getActiveUser(user.id))
        navigate('/')
    }
    
    // useEffect( () => {
    //     fetchUser()
    // }, [] );

    useEffect(()=>{
        if(imageFile) {
            getImageUrl()
        }
    },[imageFile]);

  return (
    <Paper sx={{paddingBottom: '20px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Box sx={{
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding:"5px 5px",
            'button' : {
                color : 'black'
            }
        }}>
            <IconButton>
                    <CloseRoundedIcon onClick={ () => navigate('/')}/>
            </IconButton>
            <Typography variant="h6" sx={{flex: '1'}}>New post</Typography>
            {imageUrl ? 
                <IconButton>
                    <CheckRoundedIcon 
                        onClick={handleClick} 
                        sx={{color:'#1976d2', cursor: 'pointer'}}
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
                backgroundColor: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flex: '1',
                objectFit: 'cover'
            }}
        >
            {imageUrl ? 
                <Img src={imageUrl} alt=''/> 
                : 
                <Typography variant='h5' component='p'>Select image</Typography> 
            }
        </Box>
        <Box sx={{backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',}}>
            <label htmlFor="contained-button-file">
                {!imageFile &&<Input 
                    accept="image/*" 
                    id="contained-button-file" 
                    multiple type="file" 
                    onChange={(e)=>{
                        setImageFile(e.target.files[0])
                    }}
                />}
                <Button variant={imageFile ? "disabled" : "contained"} component="span">
                {imageFile ? "Selected" : "Select file"}
                </Button>
            </label>
        </Box>
        <Box sx={{
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: '1'
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