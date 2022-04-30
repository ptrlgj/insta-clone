import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import GridOnRoundedIcon from '@mui/icons-material/GridOnRounded';
import MusicVideoRoundedIcon from '@mui/icons-material/MusicVideoRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import { Avatar, Box, Typography, Button, Tabs, Tab} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import PhotoGrid from '../components/PhotoGrid';
function User() {
    const [userId, setUserId] = useState(useParams().id);
    const [panel, setPanel] = useState('1')
  return (
    <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        background: 'white'
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
            }}>Name</Typography>
            <MoreVertRoundedIcon />
        </Box>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            // gap:'20px',
            padding: '15px 20px',
        }}>
            <Avatar 
                alt="elo" 
                src='/images/profile.png'
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
                <Typography variant='h6'>1223</Typography>
                <Typography variant='body1'>Posts</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: '1'
            }}>
                <Typography variant='h6'>123123</Typography>
                <Typography variant='body1'>Followers</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: '1'
            }}>
                <Typography variant='h6'>123</Typography>
                <Typography variant='body1'>Followed</Typography>
            </Box>
        </Box>
        <Box sx={{
            display: 'flex',
            padding: '5px 20px',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <Typography variant='subtitle1' sx={{fontWeight: '600'}}>full name</Typography> 
            <Typography variant='body1' component='p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, repellat.</Typography>
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
                padding: '5px 10px',
            }}
                onChange={(e, newPanel)=> setPanel(newPanel)}
            >
                <Tab sx={{flex: '1'}}label={<GridOnRoundedIcon />} value='1'/>
                <Tab sx={{flex: '1'}}label={<MusicVideoRoundedIcon />} value='2'/>
                <Tab sx={{flex: '1'}}label={<AccountBoxRoundedIcon />} value='3'/>
            </TabList>
            <TabPanel value="1" sx={{padding: '0', display: 'flex', justifyContent:'center'}}>
                <PhotoGrid />
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
    </Box>
  )
}

export default User