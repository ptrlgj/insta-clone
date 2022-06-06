import { useSelector } from "react-redux"

export function useAlert() {
    const alert = useSelector(state => state.alert)
    
    return alert
}
