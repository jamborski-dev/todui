import React from "react"

type Props = {
  children?: React.ReactNode
}

export const Logo = ({ children }: Props): React.ReactNode => {
  return <div className="app-logo">{children}</div>
}
