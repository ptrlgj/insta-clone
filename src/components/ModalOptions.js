import React from 'react'
import { Box, Button, Modal, Typography } from '@mui/material' 
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../store/modalSlice';
import { auth, deleteSingleDoc, deleteUserPosts, getSingleDoc, updateDocument } from '../firebase';
import { getActiveUser, logoutUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { deleteUser, signOut } from 'firebase/auth';

const modalStyle = {
    width: '100%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
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
  padding: '10px 0'
}
function ModalOptions() {
  const dispatch = useDispatch()
  const { isOpen, postId, userId, commentId } = useSelector( state => state.modal)
  const user = useSelector( state => state.user)
  const { postModal, commentModal, userModal, loginModal, deleteUserModal } = useSelector( state => state.modal.options)
  const { postPage } = useSelector( state => state.posts) 
  const navigate = useNavigate();

    const handleClose = () => {
      dispatch(closeModal())
    }

    // posts

    const handleDeletePost = async () => {
      const deleted = await deleteSingleDoc('posts', postId);
      const updated = await updateDocument('users', user.id, {
         posts: [ ...user.posts.filter( post => post != postId)], 
        })
      dispatch(getActiveUser(user.id))
      dispatch(closeModal())
    }
    
    const handleGoToPost = () => {
      navigate(`/post/${postId}`);
      dispatch(closeModal())
    }
    
    //comments

    const handleDeleteComment = async () => {
      const post = await getSingleDoc('posts', postId);
      const updated = await updateDocument('posts', postId, {
        comments: [ ...post.comments.filter(comment => (`${comment.author}${comment.createdAt}` != commentId))]
      })
      dispatch(closeModal())
    }

    // user

    const handleLogOut = async () => {
      await signOut(auth)
      dispatch(closeModal())
      dispatch(logoutUser())
      navigate('/')
    }

    //settings 

    const handleSettings = () =>  {
      navigate('/settings')
      dispatch(closeModal())
    } 

    //delete user

    const handleDeleteUser = async () => {
      try {
        await deleteUser(auth.currentUser)
        await deleteSingleDoc('users', user.id)
        await deleteUserPosts(user.id)
      } catch (error) {
        console.log(error.message)
      }
      dispatch(closeModal())
      dispatch(logoutUser())
      navigate('/')
    }

    //copy
    
    const handleCopyToClipboard = () => {
      let link = window.location.href
      if(postModal){
        link = postPage ? link : `${link}post/${postId}`
      }
      navigator.clipboard.writeText(link)
      // console.log(link)
    }
  return (
    <Modal
        open={ isOpen }
        onClose={ handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
      <Box sx={ modalStyle }>

        {postModal && <>
        {userId === user.id ? <>
          <Typography variant='subtitle1' id="modal-modal-description" color="red" sx={ textStyle } onClick={ handleDeletePost }>
              Delete
          </Typography>
          <hr color='lightgray' width='100%' />
          <Typography variant='subtitle1' id="modal-modal-description" color="red" sx={ textStyle }>
              Edit
          </Typography>
        </> : 
        <>
          <Typography variant='subtitle1' id="modal-modal-description" color="red" sx={ textStyle }>
              Report
          </Typography>
        </>
        }
        {!postPage && <>
        <hr color='lightgray' width='100%' />
        <Typography variant='subtitle1' id="modal-modal-description" sx={ textStyle } onClick={ handleGoToPost }>
          Go to post
        </Typography>
        </>}
        <hr color='lightgray' width='100%' />
        <Typography variant='subtitle1' id="modal-modal-description" sx={ textStyle } onClick= { handleCopyToClipboard }>
            Copy link
        </Typography>
        </>}

        {commentModal && <>
          {userId === user.id ? <>
            <Typography variant='subtitle1' id="modal-modal-description" color="red" sx={ textStyle } onClick={ handleDeleteComment}>
                Delete
            </Typography>
          </> : 
          <>
            <Typography variant='subtitle1' id="modal-modal-description" color="red" sx={ textStyle }>
                Report
            </Typography>
          </>
          }
        </>}

        {userModal && <>
          <Typography variant='subtitle1' id="modal-modal-description" sx={ textStyle } onClick={ handleCopyToClipboard }>
            Copy link
          </Typography>
          <hr color='lightgray' width='100%' />
          {userId === user.id ? <>
            <Typography variant='subtitle1' id="modal-modal-description" color="red" sx={ textStyle } onClick={ handleSettings }>
                Settings
            </Typography>
            <hr color='lightgray' width='100%' />
            <Typography variant='subtitle1' id="modal-modal-description" color="red" sx={ textStyle }
              onClick={ handleLogOut }
            >
                Logout
            </Typography>
          </> : 
          <>
            <Typography variant='subtitle1' id="modal-modal-description" color="red" sx={ textStyle }>
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

            sx={{width:'100%', 
                textAlign: 'center', 
                fontWeight: '450', 
                flex: '1', 
                padding: '10px 0'
              }}
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