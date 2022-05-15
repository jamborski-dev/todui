import React, { createContext, useState, Dispatch, SetStateAction } from "react"

export const AppContext = createContext<IContext>({
  state: {
    isLoading: false,
    error: "",
    editMode: false,
    theme: "dark"
  },
  actions: {
    setLoading: () => {},
    setError: () => {},
    setEditMode: () => {},
    toggleEditMode: () => {},
    switchTheme: () => {}
  }
})

type Props = {
  children?: React.ReactNode
}

export interface IContextState {
  isLoading: boolean
  error: string
  editMode: boolean
  theme: string
}

export interface IContextActions {
  setLoading: Dispatch<SetStateAction<boolean>>
  setError: Dispatch<SetStateAction<string>>
  setEditMode: Dispatch<SetStateAction<boolean>>
  toggleEditMode: () => void
  switchTheme: () => void
}

export interface IContext {
  state: IContextState
  actions: IContextActions
}

export const AppProvider = ({ children }: Props): React.ReactNode => {
  const [isLoading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [error, setError] = useState("")
  const [theme, setTheme] = useState("light")

  const toggleEditMode = () => setEditMode(!editMode)

  const switchTheme = () => {
    if (theme === "light") {
      setTheme("dark")
      return
    }
    if (theme === "dark") {
      setTheme("light")
      return
    }
  }

  const contextObject: IContext = {
    state: { isLoading, error, editMode, theme },
    actions: { setLoading, setError, toggleEditMode, setEditMode, switchTheme }
  }
  return <AppContext.Provider value={contextObject}>{children}</AppContext.Provider>
}
