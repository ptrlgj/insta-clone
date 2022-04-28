import {Container} from '@mui/material'
import Post from './components/Post';
function App() {
  return (
    <Container sx={{
      background: 'skyblue',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </Container>
  );
}

export default App;
