import {Box, Container} from '@mui/material'
import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import {Routes, Route} from 'react-router-dom';
import User from './pages/User';
import AddPost from './pages/AddPost';
import { auth, usersColRef, getUserBy } from './firebase';
import Posts from './pages/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/userSlice';
import { query, where } from 'firebase/firestore';
import Comments from './pages/Comments';
import PostPage from './pages/PostPage';
import ModalOptions from './components/ModalOptions';
import { onAuthStateChanged } from 'firebase/auth';
function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [uid, setUid] = useState(null)

  useEffect( () => {
    const fetchLoggedUser = async () => {
      console.log(uid)
      const q = query(usersColRef, where("uid", "==", uid));
      const response = await getUserBy(q)
      dispatch(setUser(response[0]))
    }
    if(uid){
      fetchLoggedUser()
    }
  }, [uid] )

  onAuthStateChanged(auth, async (currentUser) => {
    if(currentUser){
      setUid(currentUser.uid)
    }
  })

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
        <ModalOptions />
        <Routes>
          <Route path="/" element={<Posts /> } />
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
