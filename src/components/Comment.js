import { Avatar, Box, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { timePassed } from '../utils';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { useDispatch } from 'react-redux';
import { openModal, setOption } from '../store/modalSlice';
import { useAuthor } from '../hooks/useAuthor';

function Comment({data, postId, commentId}) {
    const [author, setAuthor] = useState(null);
    const passedTime = timePassed(data);
    const [optionsButton, setOptionsButton] = useState(false);
    const dispatch = useDispatch()
    const getAuthor = useAuthor({userId: data.author}, setAuthor)
    
    useEffect( () => {
        getAuthor()
    }, [])

    const handleOpenModal = () => {
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
                        color: 'text.secondary'
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