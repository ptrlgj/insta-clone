import React from 'react'
import { Box, Button, Modal, Typography } from '@mui/material' 
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../store/modalSlice';
import { auth, deleteSingleDoc, deleteUserPosts, getSingleDoc, updateDocument } from '../firebase';
import { getActiveUser, logoutUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { deleteUser, signOut } from 'firebase/auth';
import { showAlert } from '../store/alertSlice';
import { setEditPost, setPosts } from '../store/postsSlice';
import { useUser } from '../hooks/useUser';
import { useDeletePost } from '../hooks/useDeletePost';
import { usePosts } from '../hooks/usePosts';
import { useModal } from '../hooks/useModal';
import { useDeleteComment } from '../hooks/useDeleteComment';
import { useLogOut } from '../hooks/useLogOut';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: 'none',
    borderRadius: '15px',
    boxShadow: 25,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
  };
const textStyle = { 
  width:'100%', 
  textAlign: 'center', 
  cursor:'pointer', 
  fontWeight: '450', 
  flex: '1', 
  padding: '10px 0',
  color: 'text.primary'
}
const textStyleRed = { 
  width:'100%', 
  textAlign: 'center', 
  cursor:'pointer', 
  fontWeight: '450', 
  flex: '1', 
  padding: '10px 0',
  color: 'red'
}
function ModalOptions() {
  const dispatch = useDispatch()
  const { isOpen, postId, userId, commentId } = useModal()
  const user = useUser()
  const { options:{postModal, commentModal, userModal, loginModal, deleteUserModal} } = useModal()
  const { posts, postPage } = usePosts()
  const deletePost = useDeletePost(user, posts, postId)
  const deleteComment = useDeleteComment(postId, commentId)
  const logOut = useLogOut()
  const deleteUser = useDeleteUser(user)
  const copyToClipboard = useCopyToClipboard(postModal, postPage, postId)
  const navigate = useNavigate();

    const handleClose = () => {
      dispatch(closeModal())
    }

    // posts

    const handleDeletePost = () => deletePost()
    
    const handleGoToPost = () => {
      navigate(`/post/${postId}`);
      dispatch(closeModal())
    }

    const handleEditPost = () => {
      dispatch(setEditPost(postId));
      dispatch(closeModal())
    }
    
    //comments

    const handleDeleteComment = () => deleteComment()

    // user

    const handleLogOut = () => logOut()
    
    const handleDeleteUser = () => deleteUser()

    //settings 

    const handleSettings = () =>  {
      navigate('/settings')
      dispatch(closeModal())
    } 


    //copy
    
    const handleCopyToClipboard = () => copyToClipboard() 

    //report 

    const handleReport = () => {
      dispatch(closeModal())
      dispatch(showAlert({type: 'info', message: 'Report has been submitted'}))
    }
  return (
    <Modal
        open={ isOpen }
        onClose={ handleClose }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
      <Box sx={ modalStyle }>

        {postModal && <>
          {!postPage && <>
          <Typography variant='subtitle1' id="modal-modal-description" sx={ textStyle } onClick={ handleGoToPost }>
            Go to post
          </Typography>
          </>}
          <hr color='gray' width='100%' />
          <Typography variant='subtitle1' id="modal-modal-description" sx={ textStyle } onClick= { handleCopyToClipboard }>
              Copy link
          </Typography>
          <hr color='gray' width='100%' />
          {userId === user.id ? <>
            <Typography variant='subtitle1' id="modal-modal-description" sx={ textStyleRed } color="red" onClick={ handleEditPost }>
                Edit
            </Typography>
            <hr color='gray' width='100%' />
            <Typography variant='subtitle1' id="modal-modal-description" sx={ textStyleRed } color="red" onClick={ handleDeletePost }>
                Delete
            </Typography>
          </> : 
          <>
            <Typography variant='subtitle1' id="modal-modal-description" sx={ textStyleRed } color="red" onClick={ handleReport }>
                Report
            </Typography>
          </>
          }
        </>}

        {commentModal && <>
          {userId === user.id ? <>
            <Typography variant='subtitle1' id="modal-modal-description" sx={ textStyleRed }  color="red" onClick={ handleDeleteComment}>
                Delete
            </Typography>
          </> : 
          <>
            <Typography variant='subtitle1' id="modal-modal-description" sx={ textStyleRed }  color="red" onClick={ handleReport }>
                Report
            </Typography>
          </>
          }
        </>}

        {userModal && <>
          <Typography variant='subtitle1' id="modal-modal-description" sx={ textStyle } onClick={ handleCopyToClipboard }>
            Copy link
          </Typography>
          <hr color='gray' width='100%' />
          {userId === user.id ? <>
            <Typography variant='subtitle1' id="modal-modal-description" sx={ textStyle } color="red" onClick={ handleSettings }>
                Settings
            </Typography>
            <hr color='gray' width='100%' />
            <Typography variant='subtitle1' id="modal-modal-description" sx={ textStyleRed } color="red"
              onClick={ handleLogOut }
            >
                Logout
            </Typography>
          </> : 
          <>
            <Typography variant='subtitle1' id="modal-modal-description" sx={ textStyleRed } color="red" onClick={ handleReport }>
                Report
            </Typography>
          </>
          }
        </>}

        {loginModal && <>
            <Typography variant='subtitle1' id="modal-modal-description" sx={{
              width:'100%', 
              textAlign: 'center', 
              fontWeight: '450', 
              flex: '1', 
              padding: '10px 0'
            }}>
                Log in
            </Typography>
            <LoginForm />
        </>}
      {deleteUserModal && 
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Typography 
            variant='subtitle1' 
            sx={textStyle}
          >
            Are you sure you want to delete this account with all its activity?
          </Typography>
          <Box sx={{display: 'flex', gap: '20px', paddingBottom: '10px'}}>
            <Button variant="outlined" onClick={ handleDeleteUser }>Yes</Button>
            <Button variant="contained" onClick={ () => dispatch(closeModal())}>No</Button>
          </Box>
        </Box>
      }
      </Box>
    </Modal>
  )
}

export default ModalOptions