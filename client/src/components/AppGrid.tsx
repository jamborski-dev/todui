import React from "react"

type Props = {
  children?: React.ReactNode
}

export const AppGrid = ({ children }: Props) => {
  return <main className="app-grid">{children}</main>
}

export const TopBar = ({ children }: Props) => {
  return <header className="topbar">{children}</header>
}
