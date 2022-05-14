import { FC } from "react"
import { useCategoryContext } from "../hooks/useCategoryContext"
import { useTodoContext } from "../hooks/useTodoContext"
import { Category } from "../types/Category"

type CategorySelectProps = {
  current: string | null
}

export const CategorySelect: FC<CategorySelectProps> = ({ current }) => {
  const {
    state: { categories }
  } = useCategoryContext()

  const {
    actions: { setCurrentTodo }
  } = useTodoContext()

  const handleCategoryChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget
    let cat = categories.find(item => item._id === value)
    setCurrentTodo(prev => {
      if (prev) return { ...prev, category_id: cat as Category }
    })
  }

  return (
    <select
      onChange={e => handleCategoryChange(e)}
      name="category-name"
      defaultValue={current ? current : ""}
      className="category--select"
    >
      <option
        value={""}
        // selected={!current}
      >
        no category
      </option>
      {categories.map((item, i) => (
        <option
          key={i}
          value={item._id}
          // selected={current === item._id}
        >
          {item.label}
        </option>
      ))}
    </select>
  )
}
