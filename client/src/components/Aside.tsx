import { menuItemsPrimary, menuItemsSecondary } from "../data/__mock-data"
import { Nav } from "./Nav"
import { ButtonAddTodo } from "./ButtonAddTodo"

export const Aside = () => {
  return (
    <aside className="aside">
      <h1 className="app-logo">TODUI</h1>
      <Nav menuItems={menuItemsPrimary} />
      <Nav menuItems={menuItemsSecondary} />
      <ButtonAddTodo />
    </aside>
  )
}
