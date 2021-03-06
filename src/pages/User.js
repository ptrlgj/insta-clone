import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import GridOnRoundedIcon from '@mui/icons-material/GridOnRounded';
import MusicVideoRoundedIcon from '@mui/icons-material/MusicVideoRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import { Avatar, Box, Typography, Button, Tab, Paper, IconButton} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import PhotoGrid from '../components/PhotoGrid';
import { useDispatch } from 'react-redux';
import { openModal, setOption } from '../store/modalSlice';
import { useUser } from '../hooks/useUser';
import { useToggleFollowUser } from '../hooks/useToggleFollowUser';
import { useGetUser } from '../hooks/useGetUser';

function User() {

    const userName= useParams().user;
    const [panel, setPanel] = useState('1');
    const [loading, setLoading] = useState(true);
    const [noUser, setNoUser] = useState(false);
    const [userData, setUserData] = useState(null);
    const user = useUser()
    const [followed, setFollowed] = useState(null)
    const toggleFollow = useToggleFollowUser(user, userData, setFollowed)
    const getUser = useGetUser(user, userName, setLoading, setUserData, setFollowed, setNoUser)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(user.loggedIn) getUser()
    }, [userName, user.loggedIn])

    const handleOpenModal = () => {
        dispatch(setOption('userModal'));
        dispatch(openModal({id: '', userId: userData.id, commmentId: ''}));
    }

    const handleOpenSettings = () => {
        navigate('/settings')
    }

    const handleFollow = async () => {
        toggleFollow()
    }
  return (
    <Paper 
        elevation={2}
        sx={{ 
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: '20px',
            minHeight: '95vh'
        }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px 10px',
            alignItems: 'center',
            gap:'20px',
            'button' : {
                color : 'text.primary'
            }
        }}>
            <IconButton onClick={ () => navigate(-1) }>
                <ArrowBackRoundedIcon />
            </IconButton>
            <Typography variant='h6' sx={{
                flex: '1'
            }}>{userName}</Typography>
            <IconButton onClick={ handleOpenModal }>
                <MoreVertRoundedIcon />
            </IconButton>
        </Box>
        {!loading && !noUser && <>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '15px 20px',
        }}>
            <Avatar 
                alt={userData.fullName}
                src={userData.image}
                sx={{
                width: '90px',
                height: '90px',
            }}/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: '1'
            }}>
                <Typography variant='h6'>{userData.posts.length}</Typography>
                <Typography variant='body1'>Posts</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: '1'
            }}>
                <Typography variant='h6'>{userData.followersList.length}</Typography>
                <Typography variant='body1'>Followers</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: '1'
            }}>
                <Typography variant='h6'>{userData.followed.length}</Typography>
                <Typography variant='body1'>Followed</Typography>
            </Box>
        </Box>
        <Box sx={{
            display: 'flex',
            padding: '5px 20px',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <Typography variant='subtitle1' sx={{fontWeight: '600'}}>{userData.fullName}</Typography> 
            <Typography variant='body1' component='p'>{userData.bio}</Typography>
        </Box>
        <Box sx={{
            display: 'flex',
            padding: '5px 20px',
            gap: '10px'
        }}>
            {userData.id === user.id ? 
                <>
                    <Button variant="outlined" sx={{flex: '1'}} onClick={ handleOpenSettings }>Settings</Button>
                </>
                :
                <>
                    {followed ?
                    <Button variant="outlined" sx={{flex: '1'}} onClick={ handleFollow }>Followed</Button>
                    :
                    <Button variant="contained" sx={{flex: '1'}} onClick={ handleFollow }>Follow</Button>
                    }
                    <Button variant="outlined" sx={{flex: '1'}} disabled>Message</Button>
                </> 
            }
            <Button variant="outlined" sx={{minWidth: '36.5px', padding: '0'}} disabled><ExpandMoreRoundedIcon /></Button>
        </Box>
        <TabContext value={panel}>
            <TabList sx={{
                display: 'flex',
                padding: '5px 0',
            }}
                onChange={(e, newPanel)=> setPanel(newPanel)}
            >
                <Tab sx={{flex: '1'}}label={<GridOnRoundedIcon />} value='1'/>
                <Tab sx={{flex: '1'}}label={<MusicVideoRoundedIcon />} value='2'/>
                <Tab sx={{flex: '1'}}label={<AccountBoxRoundedIcon />} value='3'/>
            </TabList>
            <TabPanel value="1" sx={{ maxWidth: { xs: '100vw', sm: '466px'}, padding: '0', display: 'flex', justifyContent:'center'}}>
                {userData && <PhotoGrid user={userData}/>}
            </TabPanel>
            <TabPanel value="2"></TabPanel>
            <TabPanel value="3"></TabPanel>
        </TabContext>
        </>}
        {noUser && 
        <Box sx={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', gap: '40px'}}>
            <Typography variant='h3'>(x . x)</Typography>
            <Typography variant='h3'>404</Typography>
            <Typography variant='h4'>No user with this name</Typography>
        </Box>}
    </Paper>
  )
}

export default User