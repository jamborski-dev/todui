import { createContext, Dispatch, SetStateAction, ReactElement, useEffect, useState } from "react"
import { Category } from "../types/Category"
import { MenuItem } from "../types/MenuItem"
import { getConfig, handleResponse, handleFetchError } from "../utils/fetchUtils"
import { Grid3x3Gap, CalendarDate, Alarm, ListCheck, Star } from "react-bootstrap-icons"
import { useTodoContext } from "../hooks/useTodoContext"

const initialContext = {
  state: {
    categories: [],
    menuItems: []
  },
  actions: {
    setCategories: () => {}
  }
}

interface ICategoryContext {
  state: ICategoryContextState
  actions: ICategoryContextActions
}

interface ICategoryContextState {
  categories: Category[]
  menuItems: MenuItem[]
}

interface ICategoryContextActions {
  setCategories: Dispatch<SetStateAction<Category[] | []>>
}

type ContextProps = {
  children?: ReactElement
}

const MenuItemsInitial = [
  { label: "Overview", icon: <Grid3x3Gap />, color: "", count: 0 },
  { label: "Today", icon: <CalendarDate />, color: "", count: 0 },
  { label: "Done", icon: <ListCheck />, color: "", count: 0 },
  { label: "Important", icon: <Star />, color: "", count: 0 },
  { label: "Scheduled", icon: <Alarm />, color: "", count: 0 }
]

export const CategoryContext = createContext<ICategoryContext>(initialContext)

export const CategoryProvider = ({ children }: ContextProps) => {
  const {
    state: { todos }
  } = useTodoContext()

  const [categories, setCategories] = useState<Category[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MenuItemsInitial)

  const fetchCategories = () => {
    fetch("/api/category", getConfig)
      .then(res => handleResponse(res))
      .then(json => setCategories(json))
      .catch(err => handleFetchError(err))
  }

  const countCategories = () => {}

  useEffect(() => {
    fetchCategories()
  }, [])

  const contextObject = {
    state: { menuItems, categories },
    actions: { setCategories }
  }

  return <CategoryContext.Provider value={contextObject}>{children}</CategoryContext.Provider>
}
