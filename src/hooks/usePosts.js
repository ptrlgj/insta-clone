import React from 'react'
import { useSelector } from 'react-redux'

export function usePosts() {
    const posts = useSelector(state => state.posts)
    return posts
}
