import {
  Stopwatch,
  ThreeDotsVertical,
  Star,
  StarFill,
  Bell,
  Plus,
  ArrowRepeat,
  Paperclip,
  Trash,
  Save,
  PenFill
} from "react-bootstrap-icons"
import { BsX } from "react-icons/bs"

import { TodoDetailsDefault } from "./TodoDetailsDefault"
import { EditableTextField } from "./EditableTextField"

import { Checkbox } from "./Checkbox"
import { useTodoContext } from "../hooks/useTodoContext"
import { useAppContext } from "../hooks/useAppContext"
import { ButtonTool } from "./ButtonTool"

import { formatDate } from "../utils/helpers"
import { useEffect, useState } from "react"
import { useCategoryContext } from "../hooks/useCategoryContext"
import { Category } from "../types/Category"

export const TodoDetails = () => {
  const [categoryName, setCategoryName] = useState<string | undefined>(undefined)
  const {
    state: { currentTodo },
    actions: { markImportant, markDone, removeTodo, saveTodo }
  } = useTodoContext()

  const {
    state: { editMode },
    actions: { toggleEditMode }
  } = useAppContext()

  if (!currentTodo) return <TodoDetailsDefault />

  const { _id, title, is_done, is_important, notes, reminder, step_list, category_id } = currentTodo

  return (
    <section className="todo-details--pane">
      <Checkbox
        outterClass="todo-details--checkbox"
        checked={is_done}
        onClick={() => markDone(_id)}
      />
      <header className="todo-details--header">
        <div className="todo-details--category">
          <label htmlFor="category-name" className="category--label">
            Category
          </label>
          {editMode ? (
            <CategorySelect current={typeof category_id === "object" ? category_id._id : null} />
          ) : (
            <CategoryBadge
              color={typeof category_id === "object" ? category_id.color : null}
              label={typeof category_id === "object" ? category_id.label : null}
            />
          )}
        </div>
        <div className="todo-details--header-tools">
          {editMode && (
            <ButtonTool onClick={() => saveTodo()}>
              <Save />
            </ButtonTool>
          )}
          <ButtonTool onClick={() => removeTodo(_id)}>
            <Trash />
          </ButtonTool>
          <ButtonTool onClick={() => toggleEditMode()}>
            {!editMode ? <PenFill /> : <BsX />}
          </ButtonTool>
          <ButtonTool onClick={() => markImportant(_id)}>
            {is_important ? <StarFill /> : <Star />}
          </ButtonTool>
        </div>
      </header>
      <div className="todo-details--body">
        <div className="todo-details--title">
          <EditableTextField keyName={"title"} />
        </div>

        <div className="todo-meta">
          <span>
            <Stopwatch />
            <p>{formatDate.getDate(reminder)}</p>
          </span>
          <span>
            <Bell />
            <p>Remind me at {formatDate.getUKTime(reminder)}</p>
          </span>
        </div>

        <div className="todo-details--text-content">
          <EditableTextField inputType="textarea" keyName={"notes"} />
        </div>
        {step_list.length !== 0 ||
          (editMode && (
            <div className="todo-details--steps">
              <button className="btn--inline">
                <Plus /> Add step
              </button>
              <ul>
                {step_list.map((step, i) => (
                  <li key={i}>
                    <input type="checkbox" name={step} />
                    <label htmlFor={step}>{step}</label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        {editMode && (
          <button className="btn--inline">
            <ArrowRepeat /> Repeat
          </button>
        )}
      </div>
      {/* <footer className="todo-details--footer"></footer> */}
    </section>
  )
}

type CategorySelectProps = {
  current: string | null
}

const CategorySelect = ({ current }: CategorySelectProps) => {
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

interface CategoryBadgeProps {
  color?: string | null
  label?: string | null
}

const CategoryBadge = ({ color, label }: CategoryBadgeProps) => {
  return (
    <div className="category--badge" style={color ? { backgroundColor: color } : {}}>
      {label ? label : "no category"}
    </div>
  )
}
