import React, { createContext, useState, Dispatch, SetStateAction, FC, useEffect } from "react"

export const ModalContext = createContext<IContext>({
  state: {
    isOpen: false
  },
  actions: {
    openModal: () => {},
    closeModal: () => {}
  }
})

type Props = {
  children?: React.ReactNode
}

export interface IContextState {
  isOpen: boolean
}

export interface IContextActions {
  openModal: () => void
  closeModal: () => void
}

export interface IContext {
  state: IContextState
  actions: IContextActions
}

export const ModalProvider: FC<Props> = ({ children }) => {
  const [isOpen, setOpen] = useState(false)

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  useEffect(() => {
    console.log(isOpen)
  }, [isOpen])

  const contextObject: IContext = {
    state: { isOpen },
    actions: { openModal, closeModal }
  }
  return <ModalContext.Provider value={contextObject}>{children}</ModalContext.Provider>
}
