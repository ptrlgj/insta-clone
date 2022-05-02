import {Box, Container} from '@mui/material'
import { useEffect, useState } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Post from './components/Post';
import data from './data.json';
import {Routes, Route} from 'react-router-dom';
import User from './pages/User';
import AddPost from './pages/AddPost';
import { deleteUser, getUsers, storage } from './firebase';
import { getDownloadURL, list, ref } from 'firebase/storage';
function App() {
  const [posts, setPosts] = useState(data.pictures);

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '466px',
        paddingBottom: '46px',
      }}>
        <Routes>
          <Route path="/" element={
            <> 
              <Header />
              {posts.map(post=><Post key={post.id} {...post}/>)}
            </>
            }
          />
          <Route path='/:user' element={ <User />} />
          <Route path='/add' element={ <AddPost />} />
        </Routes>
        <NavBar />
      </Box>
    </Container>
  );
}

export default App;
