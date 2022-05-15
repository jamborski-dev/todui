import { Plus } from "react-bootstrap-icons"
import { useTodoContext } from "../hooks/useTodoContext"

export const ButtonAddTodo = ({ ...props }) => {
  const {
    actions: { addTodo }
  } = useTodoContext()

  return (
    <div className="btn--add-todo__wrapper">
      <button id="addTodo" className="btn--add-todo" onClick={() => addTodo()} {...props}>
        <Plus />
      </button>
      <label className="btn--add-todo__label" htmlFor="addTodo">
        Add New
      </label>
    </div>
  )
}
