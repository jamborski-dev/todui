import { useContext } from "react"
import { CategoryContext } from "../context/categoryContext"

export const useCategoryContext = () => useContext(CategoryContext)
