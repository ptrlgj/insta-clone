import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getImageUrl } from '../firebase';
import { showAlert } from '../store/alertSlice';

export function useImageUrl(imageFile, imageId) {
    const [imageUrl, setImageUrl] = useState('');
    const dispatch = useDispatch()
    useEffect( () => {
        if(imageFile) {
            getImageUrl( imageFile, imageId )
                .then(res => {
                    setImageUrl(res)
                })
                .catch(res => dispatch(showAlert({type: 'error', message: res.message})))
            }
        }, [imageFile])
    return imageUrl
    }