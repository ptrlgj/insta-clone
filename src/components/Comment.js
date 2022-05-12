import { Avatar, Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getSingleDoc } from '../firebase'
import { timePassed } from '../utils';

function Comment({data}) {
    const [user, setUser] = useState(null);
    const [passedTime, setPassedTime] = useState('');


    useEffect( () => {
        const fetchUser = async () => {
            const userData = await getSingleDoc('users', data.author)
            setUser(userData)
        }
        fetchUser()
        setPassedTime(timePassed(data))

    }, [])
    return (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            gap: '10px',
        }}
    >
        {user && <>
            <Avatar src={user.image} alt={user.fullName}/>
            <Box
                sx={{
                    flex: '1',
                    display: 'flex',
                    flexWrap: 'wrap',
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
                    {user.userName}
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
            </Box>

        </>}
    </Box>
  )
}

export default Comment