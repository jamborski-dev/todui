import React from "react"
import { useAppContext } from "../hooks/useAppContext"

type Props = {
  children?: React.ReactNode
}

export const AppGrid = ({ children }: Props) => {
  const {
    state: { theme }
  } = useAppContext()

  return <main className={`app-grid ${theme}`}>{children}</main>
}
