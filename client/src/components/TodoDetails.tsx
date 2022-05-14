import { FC, useEffect, useState } from "react"
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

import { EditableTextField } from "./EditableTextField"

import { Checkbox } from "./Checkbox"
import { Modal } from "./Modal"
import { useTodoContext } from "../hooks/useTodoContext"
import { useAppContext } from "../hooks/useAppContext"
import { ButtonTool } from "./ButtonTool"

import { formatDate } from "../utils/helpers"
import { CategoryBadge } from "./CategoryBadge"
import { CategorySelect } from "./CategorySelect"
import { Todo } from "../types/Todo"
import { useModalContext } from "../hooks/useModalContext"

type TodoDetailsProps = {
  todo: Todo
}

export const TodoDetails: FC<TodoDetailsProps> = ({ todo }) => {
  const { _id, is_done, is_important, reminder, step_list, category_id } = todo
  const [color, setColor] = useState("")

  const {
    actions: { markImportant, markDone, removeTodo, saveTodo }
  } = useTodoContext()

  const {
    actions: { openModal, closeModal }
  } = useModalContext()

  const {
    state: { editMode },
    actions: { toggleEditMode }
  } = useAppContext()

  const confirmRemove = () => {
    removeTodo(_id)
    closeModal()
  }

  useEffect(() => {
    if (typeof category_id !== "object") {
      setColor("")
      return
    }

    setColor(category_id.color)
  }, [category_id])

  return (
    <section
      className="todo-details--pane"
      style={
        {
          "--color-category": color ? color : "var(--color-category-default)"
        } as React.CSSProperties
      }
    >
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
          <ButtonTool onClick={openModal}>
            <Trash />
          </ButtonTool>
          <Modal>
            Are you sure you want to delete this document?
            <div>
              <button onClick={() => confirmRemove()}>Confirm Delete</button>
              <button onClick={() => closeModal()}>Cancel</button>
            </div>
          </Modal>
          {/* TODO: undo changes on cancel / currently displayed note stays changed until switched */}
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
