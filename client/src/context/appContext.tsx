import React, { createContext, useState, Dispatch, SetStateAction } from "react"

export const AppContext = createContext<IContext>({
  state: {
    isLoading: false,
    error: "",
    editMode: false
  },
  actions: {
    setLoading: () => {},
    setError: () => {},
    setEditMode: () => {},
    toggleEditMode: () => {}
  }
})

type Props = {
  children?: React.ReactNode
}

export interface IContextState {
  isLoading: boolean
  error: string
  editMode: boolean
}

export interface IContextActions {
  setLoading: Dispatch<SetStateAction<boolean>>
  setError: Dispatch<SetStateAction<string>>
  setEditMode: Dispatch<SetStateAction<boolean>>
  toggleEditMode: () => void
}

export interface IContext {
  state: IContextState
  actions: IContextActions
}

export const AppProvider = ({ children }: Props): React.ReactNode => {
  const [isLoading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [error, setError] = useState("")

  const toggleEditMode = () => setEditMode(!editMode)

  const contextObject: IContext = {
    state: { isLoading, error, editMode },
    actions: { setLoading, setError, toggleEditMode, setEditMode }
  }
  return <AppContext.Provider value={contextObject}>{children}</AppContext.Provider>
}
