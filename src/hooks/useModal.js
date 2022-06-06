import { useSelector } from "react-redux"

export function useModal() {
    const modal = useSelector(state => state.modal)
    return modal
}
