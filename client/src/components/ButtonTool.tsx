import React from "react"

type ButtonToolProps = {
  children?: React.ReactNode
  className?: string
  onClick?: (e?: React.MouseEvent<HTMLElement>, id?: string) => void
}

export const ButtonTool: React.FC<ButtonToolProps> = ({ children, className = "", ...props }) => {
  const cls = `btn ${className}`
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
