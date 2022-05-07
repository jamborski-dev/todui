import React, { useEffect } from "react"
import { Bell, Star, StarFill, ArrowDownUp, FileEarmark, Stopwatch } from "react-bootstrap-icons"

import { formatDate } from "../utils/helpers"

import { useTodoContext } from "../hooks/useTodoContext"
import { ButtonTool } from "./ButtonTool"
import { Checkbox } from "./Checkbox"
import { Todo } from "../types/Todo"

export const TodoList = () => {
  const {
    state: { currentFilter, filtered }
  } = useTodoContext()

  return (
    <section className="todo-list--pane">
      <header className="todo-list--header">
        <h3>{currentFilter ? currentFilter : "Overview"}</h3>
        <span>
          <ButtonTool className="right">
            <ArrowDownUp />
          </ButtonTool>
        </span>

        {/* TODO: add dropdown */}
      </header>
      <ul>
        {filtered.length === 0 ? (
          <EmptyList />
        ) : (
          filtered.map(todo => <TodoListItem key={todo._id} todo={todo} />)
        )}
      </ul>
    </section>
  )
}

interface Props {
  todo: Todo
}

const TodoListItem = ({ todo }: Props) => {
  const { _id, is_done, is_important, reminder, title, attachments } = { ...todo }
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

  return (
    <li
      className={`todo-list--item ${currentTodo && currentTodo._id === _id ? "is-selected" : ""}`}
      onClick={() => toggleTodo(_id)}
    >
      <Checkbox
        checked={is_done}
        onClick={e => handleMarkDone(e as React.MouseEvent<HTMLElement>, _id)}
      />
      <div className="todo-list--item-content">
        <h4>{title}</h4>
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
