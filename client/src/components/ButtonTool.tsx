import React from "react"

type Props = {
  children?: React.ReactNode
  className?: string
  onClick?: (e?: React.MouseEvent<HTMLElement>, id?: string) => void
}

export const ButtonTool = ({ children, className = "", ...props }: Props): React.ReactElement => {
  const cls = `btn ${className}`
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
