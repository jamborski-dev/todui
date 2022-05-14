import { useContext } from "react"
import { ModalContext } from "../context/modalContext"

export const useModalContext = () => useContext(ModalContext)
