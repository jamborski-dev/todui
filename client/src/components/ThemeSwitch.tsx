import { FC, ReactNode } from "react"
import { BsFillSunFill, BsMoon } from "react-icons/bs"
import { useAppContext } from "../hooks/useAppContext"

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
