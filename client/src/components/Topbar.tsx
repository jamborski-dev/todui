import { FC, ReactNode } from "react"
import { BsFillSunFill, BsMoon } from "react-icons/bs"
import { useAppContext } from "../hooks/useAppContext"

export const Topbar = () => {
  return (
    <header className="topbar">
      <div className="search">search</div>
      <ThemeSwitch />
      <div className="user-menu">UM</div>
    </header>
  )
}

export const ThemeSwitch = () => {
  const {
    state: { theme },
    actions: { switchTheme }
  } = useAppContext()

  return (
    <div className="theme-switch" onClick={() => switchTheme()}>
      {theme === "dark" && <BsFillSunFill />}
      {theme === "light" && <BsMoon />}
    </div>
  )
}
