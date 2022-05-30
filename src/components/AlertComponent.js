import { Alert } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideAlert } from '../store/alertSlice'

const alertStyle = {
    position: 'fixed', 
    zIndex: 99, 
    top: '10px',
    width: {xs: '100vw', sm: '466px'},
    pointerEvents: 'none',
    opacity: '0.9'
}
function AlertComponent() {
    const { alertActive, type, message } = useSelector( state => state.alert )
    const dispatch = useDispatch()

    useEffect( () => {
        const countDown = setTimeout( () =>{
            if(alertActive){
                dispatch(hideAlert())
            }
        }, 5000)
        return () => clearTimeout(countDown)
    }, [alertActive])

  return (
    <>
        {alertActive && 
            <Alert severity={type} sx={ alertStyle }>
                {message}
            </Alert>
        }
    </>
  )
}

export default AlertComponent