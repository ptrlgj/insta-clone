import React from 'react'
import { Box, Modal, Typography } from '@mui/material' 
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../store/modalSlice';
import { deleteSingleDoc, updateDocument } from '../firebase';
import { getActiveUser } from '../store/userSlice';

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
    justifyContent: 'center'
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
    const { isOpen, postId } = useSelector( state => state.modal)
    const user = useSelector( state => state.user)
    const handleClose = () => {
      dispatch(closeModal())
    }
    const handleDelete = async (e) => {
      const deleted = await deleteSingleDoc('posts', postId);
      //global state user 
      const updated = await updateDocument('users', user.id, {
         posts: [ ...user.posts.filter( post => post != postId)], 
        //  likedPosts: [ ...user.likedPosts.filter( post => post != postId)]
        })
      dispatch(getActiveUser(user.id))
      dispatch(closeModal())
    }
  return (
    <Modal
        open={ isOpen }
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
    <Box sx={ modalStyle }>
        <Typography variant='subtitle1' id="modal-modal-description" color="red" sx={ textStyle } onClick={ handleDelete }>
            Delete
        </Typography>
        <hr color='lightgray' width='100%' />
        <Typography variant='subtitle1' id="modal-modal-description" color="red" sx={ textStyle }>
            Edit
        </Typography>
        <hr color='lightgray' width='100%' />
        <Typography variant='subtitle1' id="modal-modal-description" sx={ textStyle }>
            Go to post
        </Typography>
        <hr color='lightgray' width='100%' />
        <Typography variant='subtitle1' id="modal-modal-description" sx={ textStyle }>
            Copy link
        </Typography>
    </Box>
    </Modal>
  )
}

export default ModalOptions