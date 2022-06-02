import {Box, Container, createTheme, ThemeProvider} from '@mui/material'
import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import {Routes, Route, useNavigate} from 'react-router-dom';
import User from './pages/User';
import AddPost from './pages/AddPost';
import { auth, usersColRef, getUserBy } from './firebase';
import Posts from './pages/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { changeValue, setUser } from './store/userSlice';
import { query, where } from 'firebase/firestore';
import Comments from './pages/Comments';
import PostPage from './pages/PostPage';
import ModalOptions from './components/ModalOptions';
import { onAuthStateChanged } from 'firebase/auth';
import CreateUser from './pages/CreateUser';
import Settings from './pages/Settings';
import AlertComponent from './components/AlertComponent';

function App() {
  const dispatch = useDispatch();
  const [uid, setUid] = useState(null);
  const [lastVisiblePost, setLastVisiblePost] = useState(null)
  const { settings } = useSelector( state => state.user )
  useEffect( () => {
    const fetchLoggedUser = async () => {
      const q = query(usersColRef, where("uid", "==", uid));
      const response = await getUserBy(q)
      if(uid && response[0]) dispatch(setUser(response[0]))
      else if(uid) dispatch(changeValue({uid}))
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

  const theme = createTheme({
    palette: {
      mode: `${ settings.darkTheme ? 'dark' : 'light'}`
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100vw', sm: '466px'},
          paddingBottom: '46px',
        }}>
          <ModalOptions />
          <AlertComponent />
          <Routes>
            <Route path="/" element={<Posts lastVisible={lastVisiblePost} setLastVisible={setLastVisiblePost}/> } />
            <Route path='/:user' element={ <User /> } />
            <Route path='/add' element={ <AddPost /> } />
            <Route path='/comments/:id' element={ <Comments /> } />
            <Route path='/post/:id' element={ <PostPage /> } />
            <Route path='/signup' element={ <CreateUser />} />
            <Route path='/settings' element={ <Settings />} />
          </Routes>
          <NavBar />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
