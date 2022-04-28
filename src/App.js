import {Box, Container} from '@mui/material'
import NavBar from './components/NavBar';
import Post from './components/Post';
function App() {
  return (
    <Container sx={{
      background: 'skyblue',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Box sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '466px'
      }}>
        <Post />
        <Post />
        <Post />
        <NavBar />
      </Box>
    </Container>
  );
}

export default App;
