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
import { useEffect } from "react"

export const TodoDetails = () => {
  const {
    state: { currentTodo },
    actions: { markImportant, markDone, removeTodo, saveTodo }
  } = useTodoContext()

  const {
    state: { editMode },
    actions: { toggleEditMode }
  } = useAppContext()

  if (!currentTodo) return null

  const { _id, title, is_done, is_important, notes, reminder, step_list } = currentTodo

  return (
    <>
      {currentTodo._id ? (
        <section className="todo-details--pane">
          <Checkbox checked={is_done} onClick={() => markDone(_id)} />
          <div className="todo-details--body">
            <header className="todo-details--header">
              <div className="todo-details--title">
                <EditableTextField keyName={"title"} />
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
          <footer className="todo-details--footer"></footer>
        </section>
      ) : (
        <TodoDetailsDefault />
      )}
    </>
  )
}
