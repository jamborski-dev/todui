import { useTodoContext } from "../hooks/useTodoContext"
import { useCategoryContext } from "../hooks/useCategoryContext"
import { Plus } from "react-bootstrap-icons"
import { capitalize, generateHSL } from "../utils/helpers"
import { useEffect, useState } from "react"
import { BsCheck2 } from "react-icons/bs"

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
            <span className="nav--list-item__icon">
              {item.icon ? item.icon : item.color ? "" : null}
            </span>
            <span className="nav--list-item__label">{item.label}</span>
            <span
              className={`nav--list-item__count ${
                item.count ? (item.color ? item.color : "") : "empty"
              }`}
            >
              {item.count ? item.count : null}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export const NavListCategories = () => {
  const [showAddCategory, setShowAddCategory] = useState(false)
  const toggleInput = () => setShowAddCategory(prev => !prev)

  const {
    actions: { toggleFilter }
  } = useTodoContext()

  const {
    state: { categories }
  } = useCategoryContext()

  return (
    <nav className="secondary-nav">
      <ul className="nav--list">
        {categories.map(item => (
          <li className="nav--list-item" key={item.label} onClick={() => toggleFilter(item.label)}>
            <span
              className="nav--list-item__icon color-icon"
              style={{ backgroundColor: item.color }}
            >
              {" "}
            </span>
            <span className="nav--list-item__label">{capitalize(item.label)}</span>
            <NavListCounter count={item.count} color={item.color} />
          </li>
        ))}
        {showAddCategory && (
          <li className="nav--list-item no-hover">
            <CateogryInput />
          </li>
        )}
        <li className="nav--list-item button" onClick={() => toggleInput()}>
          <div className="btn--icon">
            <Plus />
          </div>
          <button className="btn btn--add-category">
            {showAddCategory ? "Cancel" : "Add Category"}
          </button>
        </li>
      </ul>
    </nav>
  )
}

type NavListCounterProps = {
  count: number | undefined
  color: string
}
const NavListCounter = ({ count, color }: NavListCounterProps) => (
  <span className={`nav--list-item__count ${count ? (color ? color : "") : "empty"}`}>
    {count ? count : null}
  </span>
)

const CateogryInput = () => {
  const [color, setColor] = useState("")
  const saveCateogry = () => {}

  useEffect(() => {
    setColor(generateHSL())
  }, [])

  return (
    <>
      <span className="nav--list-item__icon color-icon" style={{ backgroundColor: color }}>
        {" "}
      </span>
      <span className="nav--list-item__category-input">
        <input className="category-input" type="text" name="categoryName" id="cateogryName" />
        <span className="nav--list-item__count accept" onClick={() => saveCateogry()}>
          <BsCheck2 />
        </span>
      </span>
    </>
  )
}
