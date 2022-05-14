import { useTodoContext } from "../hooks/useTodoContext"
import { useCategoryContext } from "../hooks/useCategoryContext"

export const NavListPrimary = () => {
  const {
    actions: { toggleFilter }
  } = useTodoContext()

  const {
    state: { menuItems }
  } = useCategoryContext()

  return (
    <nav className="primary-nav">
      <ul className="nav--list">
        {menuItems.map(item => (
          <li className="nav--list-item" key={item.label} onClick={() => toggleFilter(item.label)}>
            <span>{item.icon ? item.icon : item.color ? "" : null}</span>
            <span>{item.label}</span>
            <span className={item.count ? (item.color ? item.color : "") : "empty"}>
              {item.count ? item.count : null}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export const NavListCategories = () => {
  const {
    actions: { toggleFilter }
  } = useTodoContext()

  const {
    state: { categories }
  } = useCategoryContext()

  return (
    <nav className="primary-nav">
      <ul className="nav--list">
        {categories.map(item => (
          <li className="nav--list-item" key={item.label} onClick={() => toggleFilter(item.label)}>
            <span className="color-icon" style={{ backgroundColor: item.color }}>
              {" "}
            </span>
            <span>{item.label}</span>
            <NavListCounter count={item.count} color={item.color} />
          </li>
        ))}
      </ul>
    </nav>
  )
}

type NavListCounterProps = {
  count: number | undefined
  color: string
}
const NavListCounter = ({ count, color }: NavListCounterProps) => (
  <span className={count ? (color ? color : "") : "empty"}>{count ? count : null}</span>
)
