import React, { useEffect, useState } from "react"
import { Bell, Star, StarFill, ArrowDownUp, FileEarmark, Stopwatch } from "react-bootstrap-icons"

import { formatDate } from "../utils/helpers"

import { useTodoContext } from "../hooks/useTodoContext"
import { ButtonTool } from "./ButtonTool"
import { Checkbox } from "./Checkbox"
import { Todo } from "../types/Todo"

export const TodoList = () => {
  const {
    state: { currentFilter, todos }
  } = useTodoContext()

  return (
    <section className="todo-list--pane">
      <header className="todo-list--header">
        <h3 className="header">{currentFilter ? currentFilter : "Overview"}</h3>
        <span>
          <ButtonTool className="right">
            <ArrowDownUp />
          </ButtonTool>
        </span>

        {/* TODO: add dropdown */}
      </header>
      <ul>
        {todos.length === 0 ? (
          <EmptyList />
        ) : (
          todos.map(todo => <TodoListItem key={todo._id} todo={todo} />)
        )}
      </ul>
    </section>
  )
}

interface Props {
  todo: Todo
}

const TodoListItem = ({ todo }: Props) => {
  const { _id, is_done, is_important, reminder, title, attachments, category_id } = { ...todo }
  const [color, setColor] = useState("")

  const {
    state: { currentTodo },
    actions: { toggleTodo, markDone, markImportant }
  } = useTodoContext()

  const handleMarkImportant = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.stopPropagation()
    markImportant(id)
  }

  const handleMarkDone = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.stopPropagation()
    markDone(id)
  }

  useEffect(() => {
    if (typeof category_id !== "object") {
      setColor("")
      return
    }

    setColor(category_id.color)
  }, [category_id])

  return (
    <li
      className={`todo-list--item ${currentTodo && currentTodo._id === _id ? "is-selected" : ""}`}
      onClick={() => toggleTodo(_id)}
      style={
        {
          "--color-category": color ? color : "var(--color-category-default)"
        } as React.CSSProperties
      }
    >
      <Checkbox
        checked={is_done}
        onClick={e => handleMarkDone(e as React.MouseEvent<HTMLElement>, _id)}
      />
      <div className="todo-list--item-content">
        <h4 className="header">{title}</h4>
        <div className="todo-meta">
          {reminder && (
            <span>
              <Stopwatch />
              <span>{formatDate.getDate(reminder)}</span>
            </span>
          )}
          {attachments && (
            <span>
              <FileEarmark />
            </span>
          )}
          {reminder && (
            <span>
              <Bell />
            </span>
          )}
        </div>
      </div>
      <ButtonTool onClick={e => handleMarkImportant(e as React.MouseEvent<HTMLElement>, _id)}>
        {is_important ? <StarFill /> : <Star />}
      </ButtonTool>
    </li>
  )
}

const EmptyList = () => (
  <div className="todo-list--empty">
    <p>There are no todos to display...</p>
  </div>
)
