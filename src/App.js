import { Box, Container, createTheme, ThemeProvider } from '@mui/material'
import { useState } from 'react';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import User from './pages/User';
import AddPost from './pages/AddPost';
import Posts from './pages/Posts';
import Comments from './pages/Comments';
import PostPage from './pages/PostPage';
import ModalOptions from './components/ModalOptions';
import CreateUser from './pages/CreateUser';
import Settings from './pages/Settings';
import AlertComponent from './components/AlertComponent';
import { useUser } from './hooks/useUser';
import { useGetLoggedUserOnLoad } from './hooks/useGetLoggedUserOnLoad';

function App() {
  const [lastVisiblePost, setLastVisiblePost] = useState(null)
  const { settings } = useUser()

  const theme = createTheme({
    palette: {
      mode: `${ settings.darkTheme ? 'dark' : 'light'}`
    }
  })

  useGetLoggedUserOnLoad()
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
