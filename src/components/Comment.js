import { Avatar, Box, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getSingleDoc } from '../firebase'
import { timePassed } from '../utils';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { useDispatch } from 'react-redux';
import { openModal, setOption } from '../store/modalSlice';

function Comment({data, postId, commentId}) {
    const [author, setAuthor] = useState(null);
    const [passedTime, setPassedTime] = useState('');
    const [optionsButton, setOptionsButton] = useState(false);
    const dispatch = useDispatch()

    useEffect( () => {
        const fetchUser = async () => {
            const userData = await getSingleDoc('users', data.author)
            setAuthor(userData)
        }
        fetchUser()
        setPassedTime(timePassed(data))

    }, [])

    const handleOpenModal = () => {
        // console.log(data)
        dispatch(openModal({id: postId, userId: data.author, commentId: commentId}))
        dispatch(setOption('commentModal'))
    }
    return (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            gap: '10px',
        }}
        onMouseEnter={ () => setOptionsButton(true)}
        onMouseLeave={ () => setOptionsButton(false)}
    >
        {author && <>
            <Avatar src={author.image} alt={author.fullName}/>
            <Box
                sx={{
                    flex: '1',
                    display: 'flex',
                    flexWrap: 'wrap',
                    position: 'relative',
                }}
            >
                <Typography 
                    variant='subtitle2' 
                    sx={{ 
                        fontWeight: '400', 
                        width: '100%'
                    }}
                    component="p"
                >
                    <Typography 
                        variant="subtitle2" 
                        sx={{ fontWeight: 'bold', marginRight: '3px'}} 
                        component="span"
                    >
                        <Link to={`/${author.userName}`}>
                            {author.userName}
                        </Link>
                    </Typography>
                    {data.comment}
                </Typography>
                <Typography 
                    variant='caption' 
                    sx={{
                        color: 'rgba(0,0,0,0.7)'
                    }}
                >
                    {passedTime}
                </Typography>
                {optionsButton && 
                    <IconButton onClick={ handleOpenModal } sx={{position: 'absolute', bottom: 0, right: 0}}>
                        <MoreHorizRoundedIcon fontSize='small' />
                    </IconButton> 
                }
            </Box>

        </>}
    </Box>
  )
}

export default Comment