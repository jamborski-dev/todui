import { ThemeSwitch } from "./ThemeSwitch"

export const Topbar = () => {
  return (
    <header className="topbar">
      <div className="search">search</div>
      <ThemeSwitch />
      <div className="user-menu">UM</div>
    </header>
  )
}
