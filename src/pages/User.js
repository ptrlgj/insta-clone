import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import GridOnRoundedIcon from '@mui/icons-material/GridOnRounded';
import MusicVideoRoundedIcon from '@mui/icons-material/MusicVideoRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import { Avatar, Box, Typography, Button, Tabs, Tab, Paper} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import PhotoGrid from '../components/PhotoGrid';
import { getUser } from '../firebase';

// export const url = 'https://firestore.googleapis.com/v1/projects/insta-clone-7dc70/databases/(default)/documents/users';

function User() {

    const userName= useParams().user;
    const [panel, setPanel] = useState('1');
    const [loading, setLoading] = useState(true);
    const [noUser, setNoUser] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(()=>{
        const fetchUserData = async () =>{
            const response = await getUser(userName)
            if(response.length > 0){
                setUserData(response[0]);
                setLoading(false)
            }else{
                setLoading(false)
                setNoUser(true)
                return
            }
        }
        fetchUserData()
    }, [userName])
  return (
    <Paper 
        elevation={2}
        sx={{ 
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            paddingBottom: '20px'

        }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px 20px',
            alignItems: 'center',
            gap:'20px',
        }}>
            <ArrowBackRoundedIcon />
            <Typography variant='h6' sx={{
                flex: '1'
            }}>{userName}</Typography>
            <MoreVertRoundedIcon />
        </Box>
        {!loading && !noUser && <>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            // gap:'20px',
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
                <Typography variant='h6'>{userData.followers}</Typography>
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
            <Button variant="contained" sx={{flex: '1'}}>Follow</Button>
            <Button variant="outlined" sx={{flex: '1'}}>Message</Button>
            <Button variant="outlined" sx={{minWidth: '36.5px', padding: '0'}}><ExpandMoreRoundedIcon /></Button>
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
            <TabPanel value="1" sx={{padding: '0', display: 'flex', justifyContent:'center'}}>
                {userData && <PhotoGrid user={userData}/>}
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
        </>}
        {noUser && 
        <Box sx={{height: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', gap: '40px'}}>
            <Typography variant='h3'>(x . x)</Typography>
            <Typography variant='h3'>404</Typography>
            <Typography variant='h4'>No user with this name</Typography>
        </Box>}
    </Paper>
  )
}

export default User