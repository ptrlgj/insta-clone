import {Box, Container} from '@mui/material'
import { useEffect, useState } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Post from './components/Post';
import {Routes, Route} from 'react-router-dom';
import User from './pages/User';
import AddPost from './pages/AddPost';
import { deleteUser, getUser, getUsers, storage, subscribeTo, db } from './firebase';
import { getDownloadURL, list, ref } from 'firebase/storage';
import Posts from './pages/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveUser } from './store/userSlice';
import { setNewPosts } from './store/postsSlice';
import { collection, onSnapshot } from 'firebase/firestore';
import Comments from './pages/Comments';
import PostPage from './pages/PostPage';
function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  // subscribeTo('posts');

  // const subscription = onSnapshot( collection(db, 'posts'), ( snapshot ) => {
  //   console.log(snapshot)
  //   const data = snapshot.docs.map(doc => doc.data())
  //   dispatch(setNewPosts(true))
  // })

  //later login formm
  useEffect( () => {
    dispatch(getActiveUser('MTfXXUFnty5Y6l3AaWJY'))
  }, [] )
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
          <Route path="/" element={<Posts /> }
          />
          <Route path='/:user' element={ <User /> } />
          <Route path='/add' element={ <AddPost /> } />
          <Route path='/comments/:id' element={ <Comments /> } />
          <Route path='/post/:id' element={ <PostPage /> } />
        </Routes>
        <NavBar />
      </Box>
    </Container>
  );
}

export default App;
