import React from "react"

type ButtonProps = {
  children?: React.ReactNode
  className?: string
  onClick?: (e?: React.MouseEvent<HTMLElement>, id?: string) => void
}

export const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  const cls = `btn btn-primary ${className}`
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
