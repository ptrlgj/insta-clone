import { useSelector } from 'react-redux'

export function useUser() {
    const user = useSelector(state => state.user)
    return user
}
