import { NavListPrimary, NavListCategories } from "./NavList"
import { ButtonAddTodo } from "./ButtonAddTodo"

export const Aside = () => {
  return (
    <aside className="aside">
      <h1 className="app-logo">TODUI</h1>
      <NavListPrimary />
      <NavListCategories />
      <ButtonAddTodo />
    </aside>
  )
}
