import { createContext, Dispatch, SetStateAction, ReactElement, useEffect, useState } from "react"
import { Category } from "../types/Category"
import { MenuItem } from "../types/MenuItem"
import { getConfig, handleResponse, handleFetchError } from "../utils/fetchUtils"
import { Grid3x3Gap, CalendarDate, Alarm, ListCheck, Star } from "react-bootstrap-icons"

const initialContext = {
  state: {
    categories: [],
    menuItems: [],
    shouldRefetch: false
  },
  actions: {
    setCategories: () => {},
    setShouldRefetch: () => {}
  }
}

interface ICategoryContext {
  state: ICategoryContextState
  actions: ICategoryContextActions
}

interface ICategoryContextState {
  categories: Category[]
  menuItems: MenuItem[]
  shouldRefetch: boolean
}

interface ICategoryContextActions {
  setCategories: Dispatch<SetStateAction<Category[]>>
  setShouldRefetch: Dispatch<SetStateAction<boolean>>
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
  const [categories, setCategories] = useState<Category[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MenuItemsInitial)
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false)

  const fetchCategories = () => {
    fetch("/api/category", getConfig)
      .then(res => handleResponse(res))
      .then(json => {
        console.log(json)
        setCategories(json)
      })
      .catch(err => handleFetchError(err))
  }

  // TODO: implement local count for primary menu (done, scheduled etc.)
  // const countCategories = () => {}

  // initial data fetch
  useEffect(() => {
    fetchCategories()
  }, [])

  // refetch on count change
  useEffect(() => {
    if (!shouldRefetch) return
    fetchCategories()
    setShouldRefetch(false)
  }, [shouldRefetch])

  const contextObject = {
    state: { menuItems, categories, shouldRefetch },
    actions: { setCategories, setShouldRefetch }
  }

  return <CategoryContext.Provider value={contextObject}>{children}</CategoryContext.Provider>
}
